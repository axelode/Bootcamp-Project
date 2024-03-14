// express
const express = require("express")

// sequelize
const { Sequelize, QueryTypes } = require("sequelize")
const connection = require("./src/config/connection.json")
const sequelizeConfig = new Sequelize(connection.development)

// session
const session = require("express-session")

// encryption
const bcrypt = require("bcrypt")

// flash messages
const flash = require("express-flash")

// multer
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
}) 
const upload = multer({ storage: storage })

const app = express()
const port = 5500

// app set
app.set("view engine", "hbs")
app.set("views", "src/views")

// app use
app.use("/assets", express.static("src/assets"))
app.use("/uploads", express.static("src/uploads"))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: "inisecretkey",
    })
)

// app get
app.get("/", home)
app.get("/addProject", addProject)
app.get("/testimonials", testimonial)
app.get("/contactMe", contactMe)
app.get("/register", register)
app.get("/login", login)
app.get("/projectDetail/:id", projectDetail)
app.get("/editProject/:id", editProject)
app.get("/delete-project/:id", handleDeleteProject)
app.get("/logout", handleLogout)

// app post
app.post("/addProject", upload.single("image"), handleAddProject)
app.post("/contactMe", handleContactMe)
app.post("/register", handleRegister)
app.post("/login", handleLogin)
app.post("/editProject/:id", upload.single("image"), handleEditProject)

// ########## GET FUNCTION ##########
async function home(req, res) {
    try {
        const QueryNameBeforeLogin = `
            SELECT * FROM tb_users
            INNER JOIN tb_projects ON tb_users.id=tb_projects.author_id
            ORDER BY tb_projects.id DESC
        `

        const QueryNameAfterLogin = `
            SELECT * FROM tb_users
            INNER JOIN tb_projects ON tb_users.id=tb_projects.author_id
            WHERE tb_users.id=${req.session.userId}
            ORDER BY tb_projects.id DESC
        `

        if(!req.session.isLogin == true) {
            const dataProjects = await sequelizeConfig.query(QueryNameBeforeLogin, { type: QueryTypes.SELECT })
    
            const obj = dataProjects.map((data) => {
                return {
                    ...data,
                    isLogin: req.session.isLogin
                }
            })

            res.render("index", { allData: obj, isLogin: req.session.isLogin, user: req.session.user })

        }else {
            const dataProjects = await sequelizeConfig.query(QueryNameAfterLogin, { type: QueryTypes.SELECT })
    
            const obj = dataProjects.map((data) => {
                return {
                    ...data,
                    isLogin: req.session.isLogin
                }
            })

            res.render("index", { allData: obj, isLogin: req.session.isLogin, user: req.session.user })
        }

    } catch(error) {
        console.log(error)
    }
}

function addProject(req, res) {
    res.render("addProject", { isLogin: req.session.isLogin, user: req.session.user })
}

function testimonial(req, res) {
    res.render("testimonials", { isLogin: req.session.isLogin, user: req.session.user })
}

function contactMe(req, res)  {
    res.render("contactMe", { isLogin: req.session.isLogin, user: req.session.user })
}

async function projectDetail(req, res) {
    try {
        const id = req.params.id
        
        const QueryName = `
            SELECT * FROM tb_projects
            INNER JOIN tb_users ON tb_users.id=tb_projects.author_id
            WHERE tb_projects.id=${id}
        `

        const obj  = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })
    
        // icon
        const dataIcons = []
        
        if(obj[0].js == "on") {
            dataIcons.push(`
                <div class="d-flex align-items-center gap-2">
                    <img src="/assets/icons/js.svg" alt="" width="20px">
                    <span>Javascript</span>
                </div>
            `)
        }
        
        if(obj[0].react == "on") {
            dataIcons.push(`
                <div class="d-flex align-items-center gap-2">
                    <img src="/assets/icons/react.svg" alt="" width="20px">
                    <span>React Js</span>
                </div>
            `)
        }
        
        if(obj[0].next =="on") {
            dataIcons.push(`
                <div class="d-flex align-items-center gap-2">
                    <img src="/assets/icons/next.svg" alt="" width="20px">
                    <span>Next Js</span>
                </div>
            `)
        }
        
        if(obj[0].node == "on") {
            dataIcons.push(`
                <div class="d-flex align-items-center gap-2">
                    <img src="/assets/icons/node.svg" alt="" width="20px">
                    <span>Node Js</span>
                </div>
            `)
        }

        // set start date & end date
        const startDateData = obj[0].start_date
        const endDateData = obj[0].end_date

        // formating start date
        let startYear = startDateData.getFullYear()
        let startMonth = startDateData.getMonth()+1
        let startDate = startDateData.getDate()

        let startMonthString = ""
        let startDateString = ""
        
        if(startMonth <= 9) {
            startMonthString = "0"+startMonth 
        }else {
            startMonthString = startMonth
        }

        if(startDate <= 9) {
            startDateString = "0"+startDate
        }else {
            startDateString = startDate
        }
        
        let newStartDateFormat = startYear + "/" + startMonthString + "/" + startDateString
        
        // formating end date
        let endYear = endDateData.getFullYear()
        let endMonth = endDateData.getMonth()+1
        let endDate = endDateData.getDate()

        let endMonthString = ""
        let endDateString = ""

        if(endMonth <= 9) {
            endMonthString = "0"+endMonth 
        }else {
            endMonthString = endMonth
        }

        if(endDate <= 9) {
            endDateString = "0"+endDate
        }else {
            endDateString = endDate
        }        

        let newEndDateFormat = endYear + "/" + endMonthString + "/" + endDateString

        res.render("projectDetail", { dataSelected: obj[0], newStartDateFormat, newEndDateFormat, dataIcons, isLogin: req.session.isLogin, user: req.session.user })

    } catch(error) {
        console.log(error)
    }
}

async function editProject(req, res){
    try {
        const id = req.params.id
        
        const QueryName = `SELECT * FROM tb_projects WHERE id=${id}`

        const obj = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })
    
        // icon
        let jsChecked = ""
        let reactChecked = ""
        let nextChecked = ""
        let nodeChecked = ""
    
        if(obj[0].js == "on") {
            jsChecked = "checked"
        }
        
        if(obj[0].react == "on") {
            reactChecked = "checked"
        }
        
        if(obj[0].next == "on") {
            nextChecked = "checked"
        }
        
        if(obj[0].node == "on") {
            nodeChecked = "checked"
        }

        // set start date & end date
        const startDateData = obj[0].start_date
        const endDateData = obj[0].end_date
        
        // start date
        let startYear = startDateData.getFullYear()
        let startMonth = startDateData.getMonth()+1
        let startDate = startDateData.getDate()

        let startMonthString = ""
        let startDateString = ""
        
        if(startMonth <= 9) {
            startMonthString = "0"+startMonth 
        }else {
            startMonthString = startMonth
        }

        if(startDate <= 9) {
            startDateString = "0"+startDate
        }else {
            startDateString = startDate
        }
        
        let newStartDateFormat = startYear + "-" + startMonthString + "-" + startDateString
        
        // end date
        let endYear = endDateData.getFullYear()
        let endMonth = endDateData.getMonth()+1
        let endDate = endDateData.getDate()

        let endMonthString = ""
        let endDateString = ""

        if(endMonth <= 9) {
            endMonthString = "0"+endMonth 
        }else {
            endMonthString = endMonth
        }

        if(endDate <= 9) {
            endDateString = "0"+endDate
        }else {
            endDateString = endDate
        }        

        let newEndDateFormat = endYear + "-" + endMonthString + "-" + endDateString
            
        res.render("editProject", { dataSelected: obj[0], newStartDateFormat, newEndDateFormat, jsChecked, reactChecked, nextChecked, nodeChecked, id, isLogin: req.session.isLogin, user: req.session.user })

    } catch(error) {
        console.log(error)
    }
}

function register(req, res) {
    res.render("register")
}

function login(req, res) {
    res.render("login")
}

// ########## POST FUNCTION ##########
function handleContactMe(req, res) {
    const { name, email, phoneNumber, subject, message } = req.body

    const emailDestination = "endangtriyanacareer@gmail.com"

    const url = `mailto:${emailDestination}?subject=${subject}&body=Name : ${name}%0D%0AEmail : ${email}%0D%0APhone Number : ${phoneNumber}%0D%0A${message}`

    res.redirect(url)
}

async function handleAddProject(req, res) {
    try {
        const { projectName, startDate, endDate, description, js, react, next, node } = req.body
        
        const image = req.file.filename

        const authorId = req.session.userId

        // date
        const startDateString = new Date(startDate)
        const endDateString = new Date(endDate)
        let distanceTime = endDateString - startDateString
    
        let milisecond = 1000
        let secondInHour = 3600
        let hourInDay = 24
    
        let calculateDate = Math.floor(
            distanceTime / (milisecond * secondInHour * hourInDay)
        )
    
        let calculateMonth = Math.floor(calculateDate / 30)
        let calculateYear = Math.ceil(calculateMonth / 12)
    
        let duration = ""
    
        if(calculateDate < 30) {
            duration = calculateDate + " Days"
        }else if(calculateDate >= 30 && calculateDate < 365) {
            duration = calculateMonth + " Months" 
        }else if(calculateDate >= 365) {
            duration = calculateYear + " Years"
        }
        
        // icon
        const icons = []

        if(js == "on") {
            icons.push("js")
        }

        if(react == "on") {
            icons.push("react")
        }

        if(next == "on") {
            icons.push("next")
        }

        if(node == "on") {
            icons.push("node")
        }

        const technologies = `${icons.join(", ")}`

        const QueryName = `
            INSERT INTO tb_projects (
                project_name, start_date, end_date, description, duration, js, react, next, node, technologies, image, author_id, "createdAt", "updatedAt"
            )
                VALUES (
                    '${projectName}', '${startDate}', '${endDate}', '${description}', '${duration}', '${js}', '${react}', '${next}', '${node}', '{${technologies}}', '${image}', '${authorId}', 'now()', 'now()'
                )
        `

        await sequelizeConfig.query(QueryName, { type: QueryTypes.INSERT })

        res.redirect("/")

    } catch(error) {
        console.log(error)
    }
}

async function handleEditProject(req, res) {
    try {
        const id = req.params.id
    
        const { projectName, startDate, endDate, description, js, react, next, node } = req.body

        // icon
        const icons = []

        if(js == "on") {
            icons.push("js")
        }

        if(react == "on") {
            icons.push("react")
        }

        if(next == "on") {
            icons.push("next")
        }

        if(node == "on") {
            icons.push("node")
        }

        const technologies = `${icons.join(", ")}`

        // date
        let startDateString = new Date(startDate)
        let endDateString = new Date(endDate)
        let distanceTime = endDateString - startDateString
    
        let milisecond = 1000
        let secondInHour = 3600
        let hourInDay = 24
    
        let calculateDate = Math.floor(
            distanceTime / (milisecond * secondInHour * hourInDay)
        )
    
        let calculateMonth = Math.floor(calculateDate / 30)
        let calculateYear = Math.ceil(calculateMonth / 12)
    
        let duration = ""
    
        if(calculateDate < 30) {
            duration = calculateDate + " Days"
        }else if(calculateDate >= 30 && calculateDate < 365) {
            duration = calculateMonth + " Months" 
        }else if(calculateDate >= 365) {
            duration = calculateYear + " Years"
        }
        
        let multerImage = ""

        if(!req.file) {
            const QueryNameNotImage = `UPDATE tb_projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}', duration='${duration}', js='${js}', react='${react}', next='${next}', node='${node}', technologies='{${technologies}}', "updatedAt"='now()' WHERE id=${id}`

            await sequelizeConfig.query(QueryNameNotImage, { type: QueryTypes.UPDATE })

            res.redirect("/")
            
        }else {
            multerImage = req.file.filename

            const QueryNameIsImage = `UPDATE tb_projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}', duration='${duration}', js='${js}', react='${react}', next='${next}', node='${node}', technologies='{${technologies}}', image='${multerImage}', "updatedAt"='now()' WHERE id=${id}`

            await sequelizeConfig.query(QueryNameIsImage, { type: QueryTypes.UPDATE })
            
            res.redirect("/")
        }

    } catch(error) {
        console.log(error)
    }
}

async function handleDeleteProject(req, res) {
    try {
        const id = req.params.id

        const QueryName = `DELETE FROM tb_projects WHERE id=${id}`

        await sequelizeConfig.query(QueryName, { type: QueryTypes.DELETE })
    
        res.redirect("/")

    } catch(error) {
        console.log(error)
    }
}

function handleRegister(req, res) {
    try {
        const { name, email, password, confirm_password } = req.body
    
        if(password == confirm_password) {
            bcrypt.hash(confirm_password, 10, async function(err, hasedPassword) {
                const QueryName = `
                    INSERT INTO tb_users (
                        name, email, password, "createdAt", "updatedAt"
                    )
                        VALUES (
                            '${name}', '${email}', '${hasedPassword}', 'now()', 'now()'
                        )
                `

                if(err) {
                    res.redirect("/register")
                }else {
                    await sequelizeConfig.query(QueryName, { type: QueryTypes.INSERT })
                    
                    res.redirect("/login")
                }
            })

        }else {
            req.flash("danger", "Password tidak cocok!")
            res.redirect("/register")
        }

    } catch(error) {
        console.log(error)
    }
}

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body

        const QueryName = `SELECT * FROM tb_users WHERE email='${email}'`

        const checkEmail = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

        if(!checkEmail.length) {
            req.flash("danger", "Email tidak ditemukan!")
            return res.redirect("/login")
        }
        
        await bcrypt.compare(
            password,
            checkEmail[0].password,
            function(err, result) {
                if(!result) {
                    req.flash("danger", "Password salah!")
                    return res.redirect("/login")
                }else {
                    req.session.isLogin = true
                    req.session.user = checkEmail[0].name
                    req.session.userId = checkEmail[0].id
                    return res.redirect("/")
                }
            }
        )

    } catch(error) {
        console.log(error)
    }
}

function handleLogout(req, res) {
    req.session.isLogin = false

    res.redirect("/")
}

// listen
app.listen(port, () => {
    console.log(`Successfully running on port ${port}`)
})