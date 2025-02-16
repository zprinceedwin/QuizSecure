document.addEventListener("DOMContentLoaded", function () {
    const totalQuestions = 30;
    const correctAnswers = 20; // Example correct answers count

    // Simulated Question Data (Replace with real quiz data)
    const questionData = [
        {
            question: "1. What is 2+2?",
            choices: ["2", "3", "4", "5"],
            userAnswer: "4",
            correctAnswer: "4"
        },
        {
            question: "2. What is the capital of France?",
            choices: ["Berlin", "London", "Paris", "Rome"],
            userAnswer: "London",
            correctAnswer: "Paris"
        }
    ];

    // Update Progress Bar
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    let scorePercentage = (correctAnswers / totalQuestions) * 100;
    progressFill.style.width = `${scorePercentage}%`;
    progressText.innerText = `${correctAnswers} out of ${totalQuestions}`;

    // Load Question Summary
    const questionSummary = document.getElementById("question-summary");
    questionData.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("question-container");

        // Question Title
        let questionTitle = document.createElement("p");
        questionTitle.classList.add("question-title");
        questionTitle.innerText = item.question;
        div.appendChild(questionTitle);

        // Choices List
        let choicesList = document.createElement("ul");
        choicesList.classList.add("choices-list");

        item.choices.forEach(choice => {
            let choiceItem = document.createElement("li");
            choiceItem.innerText = choice;

            // Mark user’s answer
            if (choice === item.userAnswer) {
                if (choice === item.correctAnswer) {
                    choiceItem.classList.add("correct-answer");
                    choiceItem.innerHTML += " ✅"; // Correct Answer
                } else {
                    choiceItem.classList.add("wrong-answer");
                    choiceItem.innerHTML += " ❌"; // Wrong Answer
                }
            }

            // Highlight correct answer if user got it wrong
            if (choice === item.correctAnswer && item.userAnswer !== item.correctAnswer) {
                choiceItem.classList.add("highlight-correct");
            }

            choicesList.appendChild(choiceItem);
        });

        div.appendChild(choicesList);
        questionSummary.appendChild(div);
    });
});
