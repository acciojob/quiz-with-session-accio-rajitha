//your JS code here.
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the smallest unit of life?",
        options: ["Atom", "Molecule", "Cell", "Organ"],
        answer: "Cell"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    function loadQuiz() {
        let progress = JSON.parse(sessionStorage.getItem("progress")) || [];
        quizContainer.innerHTML = "";
        questions.forEach((q, index) => {
            let questionElem = document.createElement("div");
            questionElem.classList.add("question");
            questionElem.innerHTML = `<h3>${q.question}</h3>`;
            
            let optionsList = document.createElement("ul");
            optionsList.classList.add("options");
            q.options.forEach(option => {
                let optionItem = document.createElement("li");
                optionItem.classList.add("option");
                
                let optionLabel = document.createElement("label");
                let optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question${index}`;
                optionInput.value = option;
                
                if (progress[index] === option) {
                    optionInput.checked = true;
                }

                optionLabel.appendChild(optionInput);
                optionLabel.append(option);
                optionItem.appendChild(optionLabel);
                optionsList.appendChild(optionItem);
            });

            questionElem.appendChild(optionsList);
            quizContainer.appendChild(questionElem);
        });
    }

    function saveProgress() {
        let progress = [];
        questions.forEach((q, index) => {
            let selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                progress[index] = selectedOption.value;
            }
        });
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    function calculateScore() {
        let progress = JSON.parse(sessionStorage.getItem("progress")) || [];
        let score = 0;
        questions.forEach((q, index) => {
            if (progress[index] === q.answer) {
                score++;
            }
        });
        localStorage.setItem("score", score);
        return score;
    }

    loadQuiz();

    quizContainer.addEventListener("change", saveProgress);

    submitButton.addEventListener("click", () => {
        let score = calculateScore();
        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
    });

    let storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        scoreDisplay.textContent = `Your score is ${storedScore} out of ${questions.length}`;
    }
});
