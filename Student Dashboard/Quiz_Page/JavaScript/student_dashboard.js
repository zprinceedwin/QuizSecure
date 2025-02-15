document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = 1;
    const totalQuestions = 3;
    const nextButton = document.getElementById("nextButton");
    const questionText = document.getElementById("question-text");
    const faceStatus = document.getElementById("face-status");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let faceDetected = true; // Assume face is visible at start
    let quizPaused = false; // Track if quiz is paused
    let tabSwitchingAllowed = false; // Prevent false tab-switching alerts

    function nextQuestionHandler() {
        if (quizPaused) return; // Prevent navigation if quiz is paused

        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            questionText.textContent = `Question No. ${currentQuestion}`;
            if (currentQuestion === totalQuestions) {
                nextButton.textContent = "Submit";
                nextButton.removeEventListener("click", nextQuestionHandler);
                nextButton.addEventListener("click", function () {
                    window.location.href = "../../ViewGrades/HTML/student_dashboard.html";
                });
            }
        }
    }

    nextButton.addEventListener("click", nextQuestionHandler);

    // Prevent Copying & Text Selection
    document.addEventListener("copy", (event) => {
        event.preventDefault();
        alert("Copying is not allowed!");
    });

    document.querySelector("#question-text").setAttribute("onmousedown", "return false");
    document.querySelector("#choices").setAttribute("onmousedown", "return false");

    // Prevent ALT+TAB Cheating (Only When Face is Detected)
    window.addEventListener("blur", function () {
        if (faceDetected && !tabSwitchingAllowed) {
            alert("Switching tabs is not allowed during the quiz!");
            pauseQuiz(); // Pause quiz instead of reloading
        }
    });

    // Pause Quiz Function
    function pauseQuiz() {
        quizPaused = true;
        faceStatus.innerHTML = "⏸️ Quiz Paused - No Face Detected";
        faceStatus.style.color = "orange";
        nextButton.disabled = true; // Prevent clicking "Next"
    }

    // Resume Quiz Function
    function resumeQuiz() {
        quizPaused = false;
        faceStatus.innerHTML = "✔️ Face Detected - Quiz Resumed";
        faceStatus.style.color = "green";
        nextButton.disabled = false;
    }

    // Face Detection Setup
    let faceMesh;
    let camera;
    let detectionTimeout = null;

    async function startFaceDetection() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.style.display = "block";
            canvas.style.display = "block";
        } catch (error) {
            faceStatus.innerHTML = "❌ Camera Access Denied";
            faceStatus.style.color = "red";
            console.error("Camera error:", error);
            return;
        }

        faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        faceMesh.onResults((results) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                if (quizPaused) {
                    resumeQuiz(); // Resume when face is detected again
                }
                faceDetected = true;
                for (const landmarks of results.multiFaceLandmarks) {
                    drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, { color: "#00FF00", lineWidth: 1 });
                }
            } else {
                if (!quizPaused) {
                    pauseQuiz(); // Pause if face is missing
                }
                faceDetected = false;
            }
        });

        camera = new Camera(video, {
            onFrame: async () => {
                try {
                    await faceMesh.send({ image: video });
                } catch (error) {
                    console.error("FaceMesh Processing Error:", error);
                }
            },
            width: 640,
            height: 480,
        });

        camera.start();
    }

    startFaceDetection();
});
