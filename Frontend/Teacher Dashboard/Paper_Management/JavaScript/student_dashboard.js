// Array to store papers
let papers = [];

// Function to add a new paper
function addPaper() {
    let paperName = document.getElementById("paperName").value.trim();
    if (paperName === "") {
        alert("Please enter a paper name.");
        return;
    }

    let newPaper = {
        name: paperName,
        questionNumber: 0
    };

    papers.push(newPaper);
    updatePaperTable();
    document.getElementById("paperName").value = ""; // Clear input field
}

// Function to update the paper table
function updatePaperTable(filteredPapers = null) {
    let tableBody = document.getElementById("paperTable");
    tableBody.innerHTML = "";

    (filteredPapers || papers).forEach((paper, index) => {
        let row = tableBody.insertRow();
        
        row.insertCell(0).textContent = paper.name;
        row.insertCell(1).textContent = paper.questionNumber;

        // Operations
        let operationCell = row.insertCell(2);
        let addQuestionBtn = document.createElement("button");
        addQuestionBtn.textContent = "Add Question";
        addQuestionBtn.className = "operation-btn add-btn";
        addQuestionBtn.onclick = () => goToQuestionManagement(paper.name);

        let modifyBtn = document.createElement("button");
        modifyBtn.textContent = "Modify";
        modifyBtn.className = "operation-btn modify-btn";
        modifyBtn.onclick = () => goToQuestionModifier(paper.name);

        operationCell.appendChild(addQuestionBtn);
        operationCell.appendChild(modifyBtn);
    });
}

// Function to redirect to Paper Question Management
function goToQuestionManagement(paperName) {
    window.location.href = `question_management.html?paper=${encodeURIComponent(paperName)}`;
}

// Function to redirect to Paper Question Modifier
function goToQuestionModifier(paperName) {
    window.location.href = `question_modifier.html?paper=${encodeURIComponent(paperName)}`;
}

// Function to search for a paper
function searchPaper() {
    let searchValue = document.getElementById("searchPaper").value.toLowerCase();
    let filteredPapers = papers.filter(paper => paper.name.toLowerCase().includes(searchValue));
    updatePaperTable(filteredPapers);
}
