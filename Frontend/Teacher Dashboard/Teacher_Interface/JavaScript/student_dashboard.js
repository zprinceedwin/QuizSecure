document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
    const navLinks = document.querySelectorAll(".nav-link");
    const logButtons = document.querySelectorAll(".log-btn");
    const logContainer = document.getElementById("log-container");
    const studentList = document.getElementById("student-list");
    const detailedLog = document.getElementById("detailed-log");
    const actionLogList = document.getElementById("action-log-list");
    const startTime = document.getElementById("start-time");

    // Sample log data (Replace with actual data from backend)
    const studentLogs = {
        "math-quiz": [
            { name: "John Doe", actions: ["Started Quiz - 10:00 AM", "Answered Q1 - 10:05 AM", "Finished - 10:30 AM"], startTime: "10:00 AM" },
            { name: "Jane Smith", actions: ["Started Quiz - 10:10 AM", "Answered Q1 - 10:12 AM", "Finished - 10:40 AM"], startTime: "10:10 AM" }
        ],
        "science-exam": [
            { name: "Alice Brown", actions: ["Started Exam - 2:00 PM", "Answered Q1 - 2:05 PM", "Finished - 2:45 PM"], startTime: "2:00 PM" },
            { name: "Bob White", actions: ["Started Exam - 2:15 PM", "Answered Q1 - 2:20 PM", "Finished - 2:50 PM"], startTime: "2:15 PM" }
        ]
    };

    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.style.display = "none");

            this.classList.add("active");
            document.getElementById(this.dataset.tab).style.display = "block";
        });
    });

    // Navbar highlighting active link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Set default tab to "Active Quizzes" on page load
    document.querySelector(".tab.active").click();

    // View Logs Button Click
    logButtons.forEach(button => {
        button.addEventListener("click", function () {
            const paperId = this.dataset.paper;
            const students = studentLogs[paperId] || [];

            // Show Log Container
            logContainer.classList.remove("hidden");
            studentList.innerHTML = ""; // Clear previous list

            // Populate student names
            students.forEach(student => {
                const listItem = document.createElement("li");
                listItem.textContent = student.name;
                listItem.classList.add("student-name");
                listItem.dataset.startTime = student.startTime;
                listItem.dataset.actions = JSON.stringify(student.actions);
                studentList.appendChild(listItem);
            });
        });
    });

    // Click on Student Name to View Detailed Logs
    studentList.addEventListener("click", function (event) {
        if (event.target.classList.contains("student-name")) {
            const start = event.target.dataset.startTime;
            const actions = JSON.parse(event.target.dataset.actions);

            // Show Detailed Log
            detailedLog.classList.remove("hidden");
            startTime.textContent = start;
            actionLogList.innerHTML = ""; // Clear previous logs

            // Populate action logs
            actions.forEach(action => {
                const listItem = document.createElement("li");
                listItem.textContent = action;
                actionLogList.appendChild(listItem);
            });
        }
    });
});
