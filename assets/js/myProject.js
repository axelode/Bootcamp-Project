// handle add blog
let dataBlogs = [
    {
        dataId: 1,
        projectName: "Dumbways App 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "01-01-2024",
        endDate: "31-01-2024",
        duration: "1 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>"]
    },
    {
        dataId: 2,
        projectName: "Dumbways Web App 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "01-02-2024",
        endDate: "31-03-2024",
        duration: "2 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/react.svg' width='25px'/>"]
    },
    {
        dataId: 3,
        projectName: "Dumbways Web 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "01-01-2024",
        endDate: "31-03-2024",
        duration: "3 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>", "<image src='./assets/icons/node.svg' width='25px'/>"]
    },
    {
        dataId: 4,
        projectName: "Dumbways LMS 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "01-05-2024",
        endDate: "31-01-2025",
        duration: "9 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/react.svg' width='25px'/>", "<image src='./assets/icons/node.svg' width='25px'/>"]
    }
]

let dataId = 4

// untuk menampilkan jika ada data dalam dataBlogs 
if(dataBlogs.length) {
    for(let index = 0; index < dataBlogs.length; index++) {      
        document.getElementById("blog-box").innerHTML += `
            <div data-id="${dataBlogs[index].dataId}" class="card" onclick="handlePopUp()">
                <div class="blog-image">
                    <img
                        src="${dataBlogs[index].poster}"
                        alt="Poster Image"
                        width="400px"
                    />
                </div>
                <div class="blog-title">
                    <h1>${dataBlogs[index].projectName}</h1>
                    <p>Durasi : ${dataBlogs[index].duration}</p>
                </div>
                <p class="blog-description">${dataBlogs[index].description}</p>
                <div id="tech-icon" class="technologies-icon">
                    ${dataBlogs[index].icons.join(' ')}
                </div>
                <div class="button">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        `
    }
}

// fungsi untuk menambahkan blog
function addBlog() {
    let projectName = document.getElementById("project-name").value
    let startDateString = document.getElementById("start-date").value
    let endDateString = document.getElementById("end-date").value
    let description = document.getElementById("description").value
    // let image = document.getElementById("image").value

    // checkbox icon
    let js = document.getElementById("js")
    let next = document.getElementById("next")
    let react = document.getElementById("react")
    let node = document.getElementById("node")

    // date
    let startDate = new Date(startDateString)
    let endDate = new Date(endDateString)
    let distanceTime = endDate - startDate

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
    let icons = []

    if(js.checked) {
        icons.push("<image src='./assets/icons/js.svg' width='20px'/>")
    }
    if(next.checked) {
        icons.push("<image src='./assets/icons/next.svg' width='20px'/>")
    }
    if(react.checked) {
        icons.push("<image src='./assets/icons/react.svg' width='20px'/>")
    }
    if(node.checked) {
        icons.push("<image src='./assets/icons/node.svg' width='20px'/>")
    }

    dataId++

    let blog = {
        dataId,
        projectName,
        startDateString,
        endDateString,
        duration,
        description,
        icons
    }

    // untuk push data dari blog ke dataBlogs
    dataBlogs.push(blog)
    
    renderBlog()
}

// fungsi untuk merender blog
function renderBlog() {
    document.getElementById("blog-box").innerHTML = ""

    for(let index = 0; index < dataBlogs.length; index++) {        
        document.getElementById("blog-box").innerHTML += `
            <div id="${dataBlogs[index].dataId}" class="card" onclick="handlePopUp()">
                <div class="blog-image">
                    <img
                        src="https://technext.github.io/hostza/img/about/2.png"
                        alt="Poster Image"
                        width="400px"
                    />
                </div>
                <div class="blog-title">
                    <h1>${dataBlogs[index].projectName}</h1>
                    <p>Durasi : ${dataBlogs[index].duration}</p>
                </div>
                <p class="blog-description">${dataBlogs[index].description}</p>
                <div id="tech-icon" class="technologies-icon">
                    ${dataBlogs[index].icons.join(' ')}
                </div>
                <div class="button">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        `
    }
}

// handle popup
let mainPage = document.getElementById("main-page")
let popUpPage = document.getElementById("popup-page")

function handlePopUp() {
    mainPage.style.display = "none"
    popUpPage.style.display = "block"
}

// handle close popup
function closePopUp() {
    mainPage.style.display = "block"
    popUpPage.style.display = "none"
}