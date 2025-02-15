document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser");
    let userType = sessionStorage.getItem("userType");

    if (!loggedInUser || userType !== "student") {
        alert("Access Denied! Please log in as a Student.");
        window.location.href = "../../../Login/HTML/login.html"; // Redirect to login
    }

    // Redirect to Login page when Exit is clicked
    document.getElementById("exitBtn").addEventListener("click", function () {
        sessionStorage.clear(); // Clear session data
        window.location.href = "../../../Login/HTML/login.html";
    });

    // Redirect to Dashboard when clicking "Student Dashboard"
    document.getElementById("dashboardBtn").addEventListener("click", function () {
        window.location.href = "student_dashboard.html";
    });

    // Mock Data for Uploaded Quizzes
    let quizzes = [
        { title: "Math Quiz 1", startTime: "Feb 15, 2025 - 10:00 AM", endTime: "Feb 15, 2025 - 12:00 PM" },
        { title: "Science Quiz", startTime: "Feb 20, 2025 - 2:00 PM", endTime: "Feb 20, 2025 - 4:00 PM" }
    ];

    // Load Quizzes into the Dashboard
    let quizList = document.getElementById("quizList");
    quizzes.forEach(quiz => {
        let quizItem = document.createElement("div");
        quizItem.classList.add("quiz-item");
        quizItem.innerHTML = `<strong>${quiz.title}</strong><br>
                              Start: ${quiz.startTime} <br>
                              End: ${quiz.endTime}`;
        quizItem.addEventListener("click", function () {
            sessionStorage.setItem("selectedQuiz", quiz.title); // Store selected quiz
            window.location.href = "../../disclaimer_page/HTML/student_dashboard.html"; // Redirect to disclaimer page
        });
        quizList.appendChild(quizItem);
    });
});
