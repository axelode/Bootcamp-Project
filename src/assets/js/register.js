let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm-password")

let showIcon = document.getElementById("show-icon")
let hideIcon = document.getElementById("hide-icon")

let showConfirmIcon = document.getElementById("show-confirm-icon")
let hideConfirmIcon = document.getElementById("hide-confirm-icon")

showIcon.style.display = "none"
showConfirmIcon.style.display = "none"

let isShow = false
let isShowConfirm = false

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

function handleConfirmPassword() {
    if(isShowConfirm == false) {
        showConfirmIcon.style.display = "block"
        hideConfirmIcon.style.display = "none"
        confirmPassword.type = "text"
        isShowConfirm = true
    }else {
        showConfirmIcon.style.display = "none"
        hideConfirmIcon.style.display = "block"
        confirmPassword.type = "password"
        isShowConfirm = false
    }
}

