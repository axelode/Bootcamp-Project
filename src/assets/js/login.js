let password = document.getElementById("password")

let showIcon = document.getElementById("show-icon")
let hideIcon = document.getElementById("hide-icon")

showIcon.style.display = "none"

let isShow = false

function handlePassword() {
    if(isShow == false) {
        showIcon.style.display = "block"
        hideIcon.style.display = "none"
        password.type = "text"
        isShow = true
    }else {
        showIcon.style.display = "none"
        hideIcon.style.display = "block"
        password.type = "password"
        isShow = false
    }
}