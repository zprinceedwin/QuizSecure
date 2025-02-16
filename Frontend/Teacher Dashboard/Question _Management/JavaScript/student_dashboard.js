document.addEventListener("DOMContentLoaded", function () {
    const multipleChoiceTab = document.getElementById("multipleChoiceTab");
    const fillInTheBlankTab = document.getElementById("fillInTheBlankTab");
    const questionBox = document.querySelector(".question-box");

    multipleChoiceTab.addEventListener("click", function () {
        multipleChoiceTab.classList.add("active");
        fillInTheBlankTab.classList.remove("active");
        questionBox.innerHTML = `
            <input type="text" id="mcQuestionInput" placeholder="Type question here">
            <div id="answerOptions">
                <div class="answer-option">
                    <input type="text" placeholder="Type Answer Option here">
                    <input type="radio" name="correctAnswer">
                    <button class="remove-option">✖</button>
                </div>
                <div class="answer-option">
                    <input type="text" placeholder="Type Answer Option here">
                    <input type="radio" name="correctAnswer">
                    <button class="remove-option">✖</button>
                </div>
            </div>
            <button id="addOption">Add Answer Option</button>
        `;
        setupOptionEvents();
    });

    fillInTheBlankTab.addEventListener("click", function () {
        fillInTheBlankTab.classList.add("active");
        multipleChoiceTab.classList.remove("active");
        questionBox.innerHTML = `
            <input type="text" id="fitbQuestionInput" placeholder="Type the fill-in-the-blank question here">
            <p>Use underscores (_) to indicate blanks.</p>
            
            <label>Correct Answer:</label>
            <input type="text" id="fitbAnswerInput" placeholder="Type correct answer here">

            <div class="toggle-container">
                <label class="switch">
                    <input type="checkbox" id="ignoreAccentToggle">
                    <span class="slider"></span>
                </label>
                <span>Ignore accent marks</span>
            </div>
        `;
    });

    function setupOptionEvents() {
        document.getElementById("addOption").addEventListener("click", function () {
            const answerOptions = document.getElementById("answerOptions");
            const newOption = document.createElement("div");
            newOption.classList.add("answer-option");
            newOption.innerHTML = `
                <input type="text" placeholder="Type Answer Option here">
                <input type="radio" name="correctAnswer">
                <button class="remove-option">✖</button>
            `;
            answerOptions.appendChild(newOption);
            setupRemoveEvents();
        });

        setupRemoveEvents();
    }

    function setupRemoveEvents() {
        document.querySelectorAll(".remove-option").forEach(button => {
            button.addEventListener("click", function () {
                this.parentElement.remove();
            });
        });
    }

    setupOptionEvents();
});
