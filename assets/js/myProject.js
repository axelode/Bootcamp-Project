// handle add blog
let dataBlogs = [
    {
        dataId: 1,
        projectName: "Dumbways App 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "12 Jan 2024",
        endDate: "12 Feb 2024",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>"]
    },
    {
        dataId: 2,
        projectName: "Dumbways Web App 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "12 Jan 2024",
        endDate: "12 Feb 2024",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/react.svg' width='25px'/>"]
    },
    {
        dataId: 3,
        projectName: "Dumbways Web 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "12 Jan 2024",
        endDate: "12 Feb 2024",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>", "<image src='./assets/icons/node.svg' width='25px'/>"]
    },
    {
        dataId: 4,
        projectName: "Dumbways LMS 2024",
        poster: "https://technext.github.io/hostza/img/about/2.png",
        startDate: "12 Jan 2024",
        endDate: "12 Feb 2024",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/react.svg' width='25px'/>", "<image src='./assets/icons/node.svg' width='25px'/>"]
    }
]

let dataId = 4

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
                    <p>Durasi : -</p>
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

function addBlog() {
    let projectName = document.getElementById("project-name").value
    let startDate = document.getElementById("start-date").value
    let endDate = document.getElementById("end-date").value
    let description = document.getElementById("description").value
    // let image = document.getElementById("image").value

    let js = document.getElementById("js")
    let next = document.getElementById("next")
    let react = document.getElementById("react")
    let node = document.getElementById("node")

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
        startDate,
        endDate,
        description,
        icons
    }

    dataBlogs.push(blog)
    
    renderBlog()
}

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
                    <p>Durasi : -</p>
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