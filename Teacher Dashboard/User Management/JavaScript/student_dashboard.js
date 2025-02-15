// Array to store users
let users = [];

// Function to add a new user
function addUser() {
    let userName = document.getElementById("userName").value.trim();
    let userRole = document.getElementById("userRole").value;

    if (userName === "") {
        alert("Please enter a username.");
        return;
    }

    let newUser = {
        role: userRole,
        username: userName,
        studentName: "", // Editable field
        status: "Idle"
    };

    users.push(newUser);
    updateTable();
    document.getElementById("userName").value = ""; // Clear input field
}

// Function to modify an existing user
function modifyUser() {
    let userName = document.getElementById("userName").value.trim();

    let user = users.find(u => u.username === userName);
    if (!user) {
        alert("User not found!");
        return;
    }

    let newRole = prompt("Enter new role (student/co-teacher):", user.role);
    if (newRole) user.role = newRole;

    updateTable();
}

// Function to update the table with users
function updateTable() {
    let tableBody = document.getElementById("userTable");
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        let row = tableBody.insertRow();

        row.insertCell(0).textContent = user.role;
        row.insertCell(1).textContent = user.username;

        // Student Name (Editable)
        let studentNameCell = row.insertCell(2);
        let input = document.createElement("input");
        input.type = "text";
        input.value = user.studentName;
        input.className = "student-name-input";
        input.addEventListener("input", () => updateStudentName(index, input.value));
        studentNameCell.appendChild(input);

        // User Status
        row.insertCell(3).textContent = user.status;
    });
}

// Function to update the Student Name in the array
function updateStudentName(index, newName) {
    users[index].studentName = newName;
}
