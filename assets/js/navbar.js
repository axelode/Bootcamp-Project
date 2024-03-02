class Navbar {
    constructor(btnOne, btnTwo, btnThree, btnFour) {
        this.btnOne = btnOne
        this.btnTwo = btnTwo
        this.btnThree = btnThree
        this.btnFour = btnFour
    }

    render() {
        document.getElementById("nav").innerHTML = `
            <div class="container-fluid">
                <a class="navbar-brand me-5" href="#">
                    <img src="./assets/icons/brandred.png" alt="" width="50px">
                </a>

                <button class="navbar-toggler p-0 border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link fw-bold" href="index.html">Home</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link fw-bold" href="addProject.html">Add Project</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <a href="contactMe.html">
                            <button class="btn btn-dark fw-bold">Contact Me</button>
                        </a>
                    </div>
                </div>
            </div>
        `
    }
}

const navBar = new Navbar("Home", "Project", "Testimonials", "Contact")

navBar.render()

// handle hamburger
// let hamburgerIcon = document.getElementById("hamburger-icon")
// let xIcon = document.getElementById("x-icon")
// let hamburgerPopUp = document.getElementById("hamburger-popup")

// xIcon.style.display = "none"

// let isShow = true

// function handleHamburger() {
//     if(isShow == true) {
//         hamburgerIcon.style.display = "none"
//         xIcon.style.display = "block"
//         hamburgerPopUp.style.display = "block"
//         isShow = false
//     }else if(isShow == false) {
//         hamburgerIcon.style.display = "block"
//         xIcon.style.display = "none"
//         hamburgerPopUp.style.display = "none"
//         isShow = true
//     }
// }