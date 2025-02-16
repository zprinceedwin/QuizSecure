document.addEventListener("DOMContentLoaded", function () {
    const acceptCheckbox = document.getElementById("acceptCheckbox");
    const nextButton = document.getElementById("nextButton");

    document.getElementById("exitBtn").addEventListener("click", function () {
        sessionStorage.clear(); // Clear session data
        window.location.href = "../../../Login/HTML/login.html";
    });

    // Redirect to Dashboard when clicking "Student Dashboard"
    document.getElementById("dashboardBtn").addEventListener("click", function () {
        window.location.href = "../../student_interface/HTML/student_dashboard.html";
    });


    acceptCheckbox.addEventListener("change", function () {
        if (acceptCheckbox.checked) {
            nextButton.classList.add("enabled");
            nextButton.removeAttribute("disabled");
        } else {
            nextButton.classList.remove("enabled");
            nextButton.setAttribute("disabled", "true");
        }
    });

    nextButton.addEventListener("click", function () {
        if (acceptCheckbox.checked) {
            window.location.href = "../../Face_Scan/HTML/student_dashboard.html"; // Replace with actual next page URL
        }
    });
});
