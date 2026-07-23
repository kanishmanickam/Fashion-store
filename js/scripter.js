const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    registerBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
    registerBtn.style.backgroundColor = "#21264D";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

function validateLogin() {
    const username = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;

    if (username === "" || password === "") {
        alert("Please fill in both fields.");
        return false;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters long.");
        return false;
    }

    return true;
}

function validateRegister() {
    const username = document.querySelector("#register-username").value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Add a basic email validation if needed
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters long.");
        return false;
    }

    return true;
}

document.querySelector("#loginForm").addEventListener("submit", (event) => {
    if (!validateLogin()) {
        event.preventDefault();
    } else {
       
        setTimeout(() => {
            location.href = "index.html";
        }, 50);
    }
});

document.querySelector("#registerForm").addEventListener("submit", (event) => {
    if (!validateRegister()) {
        event.preventDefault();
    } else {

        setTimeout(() => {
            location.href = "index.html";
        }, 50);
    }
});
