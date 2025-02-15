function updateLoginUI() {
    let role = document.getElementById("login-role").value;
    let studentCodeContainer = document.getElementById("student-code-container");

    if (role === "student") {
        studentCodeContainer.style.display = "block";
    } else {
        studentCodeContainer.style.display = "none";
    }
}

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let role = document.getElementById("login-role").value;
    let studentCode = document.getElementById("student-code").value;

    // Ensure Student Code is provided if role is student
    if (role === "student" && studentCode === "") {
        alert("Student code is required!");
        return;
    }

    // Mock authentication (Replace with real backend authentication)
    if (username === "student" && password === "1234" && role === "student") {
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userType", "student");

        alert("Login successful!");
        window.location.href = "../../Student Dashboard/student_interface/HTML/student_dashboard.html";

    } else if (username === "professor" && password === "admin1234" && role === "professor") {
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userType", "professor");

        alert("Login successful!");
        window.location.href = "../../Teacher Dashboard/Teacher_Interface/HTML/student_dashboard.html";

    } else if (username === "admin" && password === "adminpass" && role === "admin") {
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userType", "admin");

        alert("Admin Login successful!");
        window.location.href = "../../Admin Dashboard/HTML/admin_dashboard.html";

    } else {
        alert("Invalid credentials! Please try again.");
    }
}
