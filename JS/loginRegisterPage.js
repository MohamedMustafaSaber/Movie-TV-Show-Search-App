let userNameInput = document.getElementById("signUpUserName");
let userEmailInput = document.getElementById("signUpEmail");
let userPasswordInput = document.getElementById("signUpPassword");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let wrongMsg = document.getElementById("wrongMsg");
let loginBtn = document.getElementById("loginBtn");
let signUpButton = document.getElementById("signUpButton");
let accountExistMsg = document.getElementById("checkExist");

let username = localStorage.getItem("sessionUserName");
let userInfo = JSON.parse(localStorage.getItem("users")) || [];

function signUp() {
    if (!userNameInput.value.trim() || !userEmailInput.value.trim() || !userPasswordInput.value.trim()) {
        document.getElementById("checkInput").classList.add("visible");
    } else {
        document.getElementById("checkInput").classList.remove("visible");
        const nameValid = userNameValidation();
        const emailValid = userEmailValidation();
        const passValid = userPasswordValidation();
        const exists = isExist();
        if (nameValid && emailValid && passValid) {
            if (exists) {
                document.getElementById("checkExist").classList.add("visible");
            }else{
                document.getElementById("checkExist").classList.remove("visible");
                let user = {
                    name: userNameInput.value,
                    email: userEmailInput.value,
                    password: userPasswordInput.value
                };
                userInfo.push(user);
                localStorage.setItem("users", JSON.stringify(userInfo));
                window.location.href = "/loginPage.html";    
            }
            
        }
    }
    
}

function login() {
    if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
        document.getElementById("checkInput").classList.add("visible");
    }
    else{
        document.getElementById("checkInput").classList.remove("visible");
        document.getElementById("wrongMsg").classList.remove("visible");
        if (userInfo.length === 0) {
            document.getElementById("wrongMsg").classList.add("visible");
        } else {
            for (let i = 0; i < userInfo.length; i++) {
                if (
                    loginEmail.value.toLowerCase() === userInfo[i].email.toLowerCase() &&
                    loginPassword.value === userInfo[i].password
                ) {
                    localStorage.setItem("sessionUserName", userInfo[i].name);
                    return;
                }else{
                    document.getElementById("wrongMsg").classList.add("visible");
                } 
            }
        }
    }
}

function applyValidationStyles(input, alert, isValid) {
    if (isValid) {
        input.classList.add("valid");
        input.classList.remove("invalid");
        alert.classList.add("hidden");
        alert.classList.remove("visible");
    } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        alert.classList.remove("hidden");
        alert.classList.add("visible");
    }
}

function userNameValidation() {
    let nameAlert = document.getElementById("nameAlert");
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

    if (regex.test(userNameInput.value.trim())) {
        applyValidationStyles(userNameInput, nameAlert, true);
        return true;
    } else {
        applyValidationStyles(userNameInput, nameAlert, false);
        return false;
    }
}

function userEmailValidation() {
    let emailAlert = document.getElementById("emailAlert");
    let regex = /^([a-zA-Z0-9_.\-]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(userEmailInput.value.trim())) {
        applyValidationStyles(userEmailInput, emailAlert, true);
        accountExistMsg.classList.add("hidden");
        return true;
    } else {
        applyValidationStyles(userEmailInput, emailAlert, false);
        return false;
    }
}

function userPasswordValidation() {
    let passAlert = document.getElementById("passAlert");
    let regex = /^.{5,15}$/;

    if (regex.test(userPasswordInput.value)) {
        applyValidationStyles(userPasswordInput, passAlert, true);
        return true;
    } else {
        applyValidationStyles(userPasswordInput, passAlert, false);
        return false;
    }
}

function isExist() {
    for (let i = 0; i < userInfo.length; i++) {
        if (
            userInfo[i].name.toLowerCase() === userNameInput.value.toLowerCase() ||
            userInfo[i].email.toLowerCase() === userEmailInput.value.toLowerCase()
        ) {
            accountExistMsg.classList.remove("hidden");
            [userNameInput, userEmailInput, userPasswordInput].forEach(el => el.classList.remove("valid"));
            return true;
        }
    }
    return false;
}



function displayUsername() {
    let welcomeEl = document.getElementById("welcomeUsername");
    if (welcomeEl && username) {
        welcomeEl.textContent = "Welcome " + username;
    }
}

function logout() {
    localStorage.removeItem("sessionUserName");
}


