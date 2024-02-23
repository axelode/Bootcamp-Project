class Navbar {
    constructor(btnOne, btnTwo, btnThree, btnFour) {
        this.btnOne = btnOne
        this.btnTwo = btnTwo
        this.btnThree = btnThree
        this.btnFour = btnFour
    }

    render() {
        document.getElementById("nav").innerHTML = `
            <div class="nav-left">
                <img
                    src="./assets/icons/brandred.png"
                    alt="logo"
                    width="50px"
                />
                <div class="default-btn">
                    <ul>
                        <li><a href="index.html">${this.btnOne}</a></li>
                        <li><a href="myProject.html">${this.btnTwo}</a></li>
                        <li><a href="testimonials.html">${this.btnThree}</a></li>
                    </ul>
                </div>
            </div>

            <div class="nav-right default-btn">
                <a href="contactMe.html">
                    <button class="button-contact-me none">${this.btnFour}</button>
                </a>
            </div>

            <div class="nav-right hamburger-bar" onclick="handleHamburger()">
            <img
                src="./assets/icons/menu.svg"
                alt=""
                id="hamburger-icon"
                width="30px"
            >
            <img
                src="./assets/icons/x.svg"
                alt=""
                id="x-icon"
                width="30px"
            >
        </div>
        `

        document.getElementById("hamburger-popup").innerHTML = `
            <ul>
                <li><a href="index.html">${this.btnOne}</a></li>
                <li><a href="myProject.html">${this.btnTwo}</a></li>
                <li><a href="testimonials.html">${this.btnThree}</a></li>
                <li><a href="contactMe.html">${this.btnFour}</a></li>
            </ul>
        `
    }
}

const navBar = new Navbar("Home", "Project", "Testimonials", "Contact")

navBar.render()

// handle hamburger
let hamburgerIcon = document.getElementById("hamburger-icon")
let xIcon = document.getElementById("x-icon")
let hamburgerPopUp = document.getElementById("hamburger-popup")

xIcon.style.display = "none"

let isShow = true

function handleHamburger() {
    if(isShow == true) {
        hamburgerIcon.style.display = "none"
        xIcon.style.display = "block"
        hamburgerPopUp.style.display = "block"
        isShow = false
    }else if(isShow == false) {
        hamburgerIcon.style.display = "block"
        xIcon.style.display = "none"
        hamburgerPopUp.style.display = "none"
        isShow = true
    }
}