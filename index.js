// import express
const express = require("express")

// sequelize
const { Sequelize, QueryTypes } = require("sequelize")

// connection
const connection = require("./src/config/connection.json")

// config
const sequelizeConfig = new Sequelize(connection.development)

// app & port
const app = express()
const port = 5000

// set hbs view engine
app.set("view engine", "hbs")
app.set("views", "src/views")

// set static assets
app.use("/assets", express.static("src/assets"))

// body parser
app.use(express.urlencoded({ extended: false }))

// home routing
app.get("/", home)

// add project routing
app.get("/addProject", addProject)
app.post("/addProject", handleAddProject)

// testimonial routing
app.get("/testimonials", testimonial)

// contact me routing
app.get("/contactMe", contactMe)
app.post("/contactMe", handleContactMe)

// project detail routing
app.get("/projectDetail/:id", projectDetail)

// edit project routing
app.get("/editProject/:id", editProject)

// edit project
app.post("/editProject/:id", handleEditProject)

// delete project
app.get("/delete-project/:id", handleDeleteProject)


// ########## FUNCTION ##########

// home routing function
async function home(req, res) {
    try {
        const QueryName = "SELECT * FROM tb_projects ORDER BY id DESC"
        const dataProjects = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })

        const obj = dataProjects.map((data) => {
            return {
                ...data
            }
        })
        
        res.render("index", { allData: obj })

    } catch(error) {
        console.log(error)
    }
}

// add project routing function
function addProject(req, res) {
    res.render("addProject")
}

// testimonial routing function
function testimonial (req, res) {
    res.render("testimonials")
}

// contact me routing function
function contactMe (req, res)  {
    res.render("contactMe")
}

// project detail routing function
async function projectDetail(req, res) {
    try {
        const id = req.params.id
        
        const QueryName = `SELECT * FROM tb_projects WHERE id=${id}`

        const obj = await sequelizeConfig.query(QueryName, { type: QueryTypes.SELECT })
    
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

        res.render("projectDetail", { dataSelected: obj[0], newStartDateFormat, newEndDateFormat, dataIcons })

    } catch(error) {
        console.log(error)
    }
}

// edit project routing function
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
            
        res.render("editProject", { dataSelected: obj[0], newStartDateFormat, newEndDateFormat, jsChecked, reactChecked, nextChecked, nodeChecked, id })

    } catch(error) {
        console.log(error)
    }
}

// contact me function
function handleContactMe(req, res) {
    const { name, email, phoneNumber, subject, message } = req.body

    const emailDestination = "endangtriyanacareer@gmail.com"

    const url = `mailto:${emailDestination}?subject=${subject}&body=Name : ${name}%0D%0AEmail : ${email}%0D%0APhone Number : ${phoneNumber}%0D%0A${message}`

    res.redirect(url)
}

// add project function
async function handleAddProject (req, res) {
    try {
        const { projectName, startDate, endDate, description, js, react, next, node } = req.body
        
        const image = "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600"

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
            icons.push("js.svg")
        }

        if(react == "on") {
            icons.push("react.svg")
        }

        if(next == "on") {
            icons.push("next.svg")
        }

        if(node == "on") {
            icons.push("node.svg")
        }

        const technologies = `${icons.join(", ")}`

        const QueryName = `
            INSERT INTO tb_projects (
                project_name, start_date, end_date, description, duration, js, react, next, node, technologies, image, "createdAt", "updatedAt"
            )
                VALUES (
                    '${projectName}', '${startDate}', '${endDate}', '${description}', '${duration}', '${js}', '${react}', '${next}', '${node}', '{${technologies}}', '${image}', 'now()', 'now()'
                )
        `

        await sequelizeConfig.query(QueryName, { type: QueryTypes.INSERT })

        res.redirect("/")

    } catch(error) {
        console.log(error)
    }
}

// edit project function
async function handleEditProject(req, res) {
    try {
        const id = req.params.id
    
        const { projectName, startDate, endDate, description, js, react, next, node } = req.body
    
        // icon
        const icons = []

        if(js == "on") {
            icons.push("js.svg")
        }

        if(react == "on") {
            icons.push("react.svg")
        }

        if(next == "on") {
            icons.push("next.svg")
        }

        if(node == "on") {
            icons.push("node.svg")
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

        const QueryName = `UPDATE tb_projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}', duration='${duration}', js='${js}', react='${react}', next='${next}', node='${node}', technologies='{${technologies}}', "updatedAt"='now()' WHERE id=${id}`
    
        await sequelizeConfig.query(QueryName, { type: QueryTypes.UPDATE })

        res.redirect("/")

    } catch(error) {
        console.log(error)
    }
}

// delete project function
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

// listen
app.listen(port, () => {
    console.log(`Successfully running on port ${port}`)
})