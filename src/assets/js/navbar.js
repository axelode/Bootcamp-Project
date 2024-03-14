// function renderNav(btnOne, btnTwo, btnThree, btnFour, btnFive) {
//     const templateSatu = `
//         <div class="container-fluid z-index-100">
//             <a class="navbar-brand me-5" href="#">
//                 <img src="/assets/icons/brandred.png" alt="" width="50px">
//             </a>

//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>

//             <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/">${btnOne}</a>
//                     </li>

//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/addProject">${btnTwo}</a>
//                     </li>
                    
//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/testimonials">${btnThree}</a>
//                     </li>
//                 </ul>
//                 <div class="d-flex gap-3">
//                     <a href="/contactMe">
//                         <button class="btn btn-dark fw-bold">${btnFour}</button>
//                     </a>
                    
//                     <a href="/register">
//                         <button class="btn btn-dark fw-bold">${btnFive}</button>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     `
    
//     const templateDua = `
//         <div class="container-fluid z-index-100">
//             <a class="navbar-brand me-5" href="#">
//                 <img src="/assets/icons/brandred.png" alt="" width="50px">
//             </a>

//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>

//             <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/">${btnOne}</a>
//                     </li>

//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/addProject">${btnTwo}</a>
//                     </li>
                    
//                     <li class="nav-item">
//                         <a class="nav-link fw-bold" href="/testimonials">${btnThree}</a>
//                     </li>
//                 </ul>
//                 <div class="d-flex align-items-center gap-3">
//                     <a href="/contactMe">
//                         <button class="btn btn-dark fw-bold">${btnFour}</button>
//                     </a>
                    
//                     {{#if isLogin}}
//                         <div class="position-relative">
//                             <button class="btn p-0" onclick="handlePopup()">
//                                 <img src="/assets/icons/profile.svg" width="50px" />
//                             </button>

//                             <div id="pop-up" class="position-absolute p-2 gap-2 end-0 rounded-bottom shadow bg-white" style="top: 60px">
//                                 <div class="d-grid justify-content-center" style="width: 150px;">
//                                     <p>Jhon Doe</p>
//                                     <a href="/" class="text-decoration-none fw-bold">LOGOUT</a>
//                                 </div>
//                             </div>
//                         </div>
//                         {{else}}
//                         <a href="/register">
//                             <button class="btn btn-dark fw-bold">${btnFive}</button>
//                         </a>
//                     {{/if}}
//                 </div>
//             </div>
//         </div>
//     `

//     document.getElementById("nav").innerHTML = templateDua
// }

// renderNav("Home", "Add Project", "Testimonials", "Contact Me", "Register")


let popUp = document.getElementById("pop-up")
let isPopUp = false

popUp.style.display = "none"

function handlePopup() {
    if(isPopUp == false) {
        popUp.style.display = "block"
        isPopUp = true
    }else {
        popUp.style.display = "none"
        isPopUp = false
    }
}