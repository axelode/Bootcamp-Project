function getMessage() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phoneNumber = document.getElementById("phone-number").value
    let subject = document.getElementById("subject").value
    let message = document.getElementById("message").value

    const emailDestination = "endangtriyanacareer@gmail.com"

    if(name == "") {
        return alert("Please type your name!")
    }else if(email == "") {
        return alert("Please type your email!")
    }else if(phoneNumber == "") {
        return alert("Please type your phone number!")
    }else if(subject === "") {
        return alert("Please select the subject!")
    }else if(message == "") {
        return alert("Please type your message!")
    }

    const data = {
        name,
        email,
        phoneNumber,
        subject,
        message
    }

    let a = document.createElement("a")
    a.href = `mailto:${emailDestination}?subject=${subject}&body=Name : ${name}%0D%0AEmail : ${email}%0D%0APhone Number : ${phoneNumber}%0D%0A${message}`
    a.click()

    console.log(data)
}