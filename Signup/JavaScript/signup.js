function signup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let confirmPassword = document.getElementById("signup-confirm-password").value;
    let role = document.getElementById("signup-role").value;

    if (username === "" || password === "" || confirmPassword === "" || role === "") {
        alert("All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Signup successful!");
    window.location.href = "login.html";
}

    function goToLogin() {
        window.location.href = "../../Login/HTML/login.html";
    }

