// handle add blog
let dataBlogs = [
    {
        dataId: 1,
        projectName: "Dumbways App 2024",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "01-01-2024",
        endDate: "31-01-2024",
        duration: "1 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>"]
    },
    {
        dataId: 2,
        projectName: "Dumbways Web App 2024",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "01-02-2024",
        endDate: "31-03-2024",
        duration: "2 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/react.svg' width='25px'/>"]
    },
    {
        dataId: 3,
        projectName: "Dumbways Web 2024",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        startDate: "01-01-2024",
        endDate: "31-03-2024",
        duration: "3 Months",
        description: "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download.",
        icons: ["<image src='./assets/icons/js.svg' width='25px'/>", "<image src='./assets/icons/next.svg' width='25px'/>", "<image src='./assets/icons/node.svg' width='25px'/>"]
    },
    {
        dataId: 4,
        projectName: "Dumbways LMS 2024",
        poster: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
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
            <div class="card mb-4 shadow p-3" style="width: 400px;">
                <div class="mb-3 overflow-hidden rounded" >
                    <img
                        src="${dataBlogs[index].poster}"
                        class="card-img-top"
                        alt="Poster"
                    />
                </div>
                <div class="card-body p-0">
                    <h5 class="card-title">Dumbways App 2024</h5>
                    <p>Durasi : ${dataBlogs[index].duration}</p>
                    <p class="card-text" style="text-align: justify;">${dataBlogs[index].description}</p>

                    <div id="tech-icon" class="d-flex gap-2 mb-3">
                        ${dataBlogs[index].icons.join(" ")}
                    </div>

                    <div class="d-flex gap-3">
                        <button class="btn btn-dark" style="width: 50%;">Edit</button>
                        <button class="btn btn-dark" style="width: 50%;">Delete</button>
                    </div>
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

    if(projectName == "") {
        return alert("Please type project name!")
    }else if(startDateString == "") {
        return alert("Please input start date!")
    }else if(endDateString == "") {
        return alert("Please input end date!")
    }else if(description === "") {
        return alert("Please type description!")
    }else if(js.checked == false && next.checked == false && react.checked == false && node.checked == false) {
        return alert("Please select technologies!")
    }

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

    // mengosongkan inputan
    document.getElementById("project-name").value = ""
    document.getElementById("start-date").value = ""
    document.getElementById("end-date").value = ""
    document.getElementById("description").value = ""

    // mengosongkan checkbox
    js.checked = false
    next.checked = false
    react.checked = false
    node.checked = false
}

// fungsi untuk merender blog
function renderBlog() {
    document.getElementById("blog-box").innerHTML = ""

    for(let index = 0; index < dataBlogs.length; index++) {        
        document.getElementById("blog-box").innerHTML += `
            <div class="card mb-4 shadow p-3" style="width: 400px;">
                <div class="mb-3 overflow-hidden rounded" >
                    <img
                        src="${dataBlogs[index].poster}"
                        class="card-img-top"
                        alt="Poster"
                    />
                </div>
                <div class="card-body p-0">
                    <h5 class="card-title">Dumbways App 2024</h5>
                    <p>Durasi : ${dataBlogs[index].duration}</p>
                    <p class="card-text" style="text-align: justify;">${dataBlogs[index].description}</p>

                    <div id="tech-icon" class="d-flex gap-2 mb-3">
                        ${dataBlogs[index].icons.join(" ")}
                    </div>

                    <div class="d-flex justify-content-between">
                        <button class="btn btn-dark" style="width: 170px;">Edit</button>
                        <button class="btn btn-dark" style="width: 170px;">Delete</button>
                    </div>
                </div>
            </div>
        `
    }
}

// handle popup
// let mainPage = document.getElementById("main-page")
// let popUpPage = document.getElementById("popup-page")

// function handlePopUp() {
//     mainPage.style.display = "none"
//     popUpPage.style.display = "block"
// }

// // handle close popup
// function closePopUp() {
//     mainPage.style.display = "block"
//     popUpPage.style.display = "none"
// }