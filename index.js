import express from "express"
const app = express()
const port = 5500

// set hbs view engine
app.set("view engine", "hbs")
app.set("views", "src/views")

// set static assets
app.use("/assets", express.static("src/assets"))

// body parser
app.use(express.urlencoded({ extended: false }))

// index routing
app.get("/", home)
app.get("/delete-project/:id", handleDeleteProject)

// add project routing
app.get("/addProject", addProject)
app.post("/addProject", handleAddProject)

// testimonial routing
app.get("/testimonials", testimonial)

// contact me routing
app.get("/contactMe", contactMe)
app.post("/contactMe", handleContactMe)

// project detail
app.get("/projectDetail/:id", projectDetail)

// edit project
app.get("/editProject/:id", editProject)
app.post("/editProject/:id", handleEditProject)

// data
let allData = [
    {
        projectName: "Dumbways App 2022",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "2022-01-01",
        endDate: "2022-01-31",
        duration: "1 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        js:  "on",
        react: "",
        next: "",
        node: "on",
        icons: ['<img src="/assets/icons/js.svg" width="25px" />', '<img src="/assets/icons/node.svg" width="25px" />']
    },
    {
        projectName: "Dumbways App 2023",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        duration: "7 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        js:  "on",
        react: "",
        next: "on",
        node: "on",
        icons: ['<img src="/assets/icons/js.svg" width="25px" />', '<img src="/assets/icons/next.svg" width="25px" />', '<img src="/assets/icons/node.svg" width="25px" />']
    },
    {
        projectName: "Dumbways App 2024",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        duration: "3 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        js:  "on",
        react: "on",
        next: "",
        node: "on",
        icons: ['<img src="/assets/icons/js.svg" width="25px" />', '<img src="/assets/icons/react.svg" width="25px" />', '<img src="/assets/icons/node.svg" width="25px" />']
    },
]

// routing function

// home routing function
function home(req, res) {
    res.render("index", { allData })
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

// handle project function
function handleAddProject (req, res) {
    const { projectName, startDate, endDate, description, js, react, next, node } = req.body
    
    const icons = []
    
    if(js == "on") {
        icons.push('<img src="/assets/icons/js.svg" width="25px" />')
    } if(react == "on") {
        icons.push('<img src="/assets/icons/react.svg" width="25px" />')
    } if(next =="on") {
        icons.push('<img src="/assets/icons/next.svg" width="25px" />')
    } if(node == "on") {
        icons.push('<img src="/assets/icons/node.svg" width="25px" />')
    }

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

    allData.push({ projectName, startDate, endDate, description, js, react, next, node, icons, duration })

    res.redirect("/")
}

function handleDeleteProject(req, res) {
    const { id } = req.params

    allData.splice(id, 1)

    res.redirect("/")
}

function projectDetail(req, res) {
    const id = req.params.id

    const dataSelected = allData[id]

    const dataIcons = []
    
    if(dataSelected.js == "on") {
        dataIcons.push(`
            <div class="d-flex align-items-center gap-2">
                <img src="/assets/icons/js.svg" alt="" width="20px">
                <span>Javascript</span>
            </div>
        `)
    }
    
    if(dataSelected.react == "on") {
        dataIcons.push(`
            <div class="d-flex align-items-center gap-2">
                <img src="/assets/icons/react.svg" alt="" width="20px">
                <span>React Js</span>
            </div>
        `)
    }
    
    if(dataSelected.next =="on") {
        dataIcons.push(`
            <div class="d-flex align-items-center gap-2">
                <img src="/assets/icons/next.svg" alt="" width="20px">
                <span>Next Js</span>
            </div>
        `)
    }
    
    if(dataSelected.node == "on") {
        dataIcons.push(`
            <div class="d-flex align-items-center gap-2">
                <img src="/assets/icons/node.svg" alt="" width="20px">
                <span>Node Js</span>
            </div>
        `)
    }

    res.render("projectDetail", { id, dataSelected, dataIcons })
}

function handleContactMe(req, res) {
    const { name, email, phoneNumber, subject, message } = req.body

    const emailDestination = "endangtriyanacareer@gmail.com"

    const url = `mailto:${emailDestination}?subject=${subject}&body=Name : ${name}%0D%0AEmail : ${email}%0D%0APhone Number : ${phoneNumber}%0D%0A${message}`

    res.redirect(url)
}

function editProject(req, res){
    const id = req.params.id
    const dataSelected = allData[id]

    let jsChecked = ""
    let reactChecked = ""
    let nextChecked = ""
    let nodeChecked = ""

    if(dataSelected.js == "on") {
        jsChecked = "checked"
    }
    
    if(dataSelected.react == "on") {
        reactChecked = "checked"
    }
    
    if(dataSelected.next == "on") {
        nextChecked = "checked"
    }
    
    if(dataSelected.node == "on") {
        nodeChecked = "checked"
    }

    res.render("editProject", { dataSelected, jsChecked, reactChecked, nextChecked, nodeChecked, id })
}

function handleEditProject(req, res) {
    const id = req.params.id

    const { projectName, startDate, endDate, description, js, react, next, node } = req.body

    const icons = []
    
    if(js == "on") {
        icons.push('<img src="/assets/icons/js.svg" width="25px" />')
    } if(react == "on") {
        icons.push('<img src="/assets/icons/react.svg" width="25px" />')
    } if(next =="on") {
        icons.push('<img src="/assets/icons/next.svg" width="25px" />')
    } if(node == "on") {
        icons.push('<img src="/assets/icons/node.svg" width="25px" />')
    }

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

    allData.splice(id, 1, { projectName, startDate, endDate, description, js, react, next, node, duration, icons })

    res.redirect("/")
}

// listen
app.listen(port, () => {
    console.log(`Successfully running on port ${port}`)
})