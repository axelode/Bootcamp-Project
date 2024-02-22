let hamburgerIcon = document.getElementById("hamburger-icon")
let xIcon = document.getElementById("x-icon")
let hamburgerPopUp = document.getElementById("hamburger-popup")

xIcon.style.display = "none"

let isShow = true

function handleHamburger() {
    if(isShow === true) {
        hamburgerIcon.style.display = "none"
        xIcon.style.display = "block"
        hamburgerPopUp.style.display = "block"
        isShow = false
    }else if(isShow === false) {
        hamburgerIcon.style.display = "block"
        xIcon.style.display = "none"
        hamburgerPopUp.style.display = "none"
        isShow = true
    }
}