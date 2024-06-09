// Define the questions and answers
// 
const baseUrl = "http://localhost:3000"; 


const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the capital of Spain?",
        options: ["Madrid", "Lisbon", "Rome", "Paris"],
        correct: 0
    },
    {
        question: "What is the capital of Italy?",
        options: ["Rome", "Venice", "Florence", "Milan"],
        correct: 0
    },
    {
        question: "What is the capital of Germany?",
        options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
        correct: 0
    }
];

// Function to load the quiz
function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = ''; 
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || [];

    questions.forEach((question, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h3>${questionIndex + 1}. ${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <label>
                        <input type="radio" name="question${questionIndex}" value="${index}" ${savedProgress[questionIndex] == index ? 'checked' : ''}>
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizForm.appendChild(questionElement);
    });
}


function saveProgress() {
    const progress = [];
    questions.forEach((question, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        if (selectedOption) {
            progress[questionIndex] = parseInt(selectedOption.value);
        }
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Function to calculate score
function calculateScore() {
    let score = 0;
    const progress = JSON.parse(sessionStorage.getItem('progress')) || [];
    progress.forEach((selectedOption, questionIndex) => {
        if (selectedOption === questions[questionIndex].correct) {
            score++;
        }
    });
    return score;
}

// Execute actions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-btn');
    const scoreDisplay = document.getElementById('score-display');

    loadQuiz();

    document.getElementById('quiz-form').addEventListener('change', saveProgress);

    submitButton.addEventListener('click', () => {
        const score = calculateScore();
        localStorage.setItem('score', score);
        scoreDisplay.innerText = `Your score is ${score} out of 5.`;
    });

    const storedScore = localStorage.getItem('score');
    if (storedScore !== null) {
        scoreDisplay.innerText = `Your score is ${storedScore} out of 5.`;
    }
});


if (typeof cy !== 'undefined') {
    describe("Quiz Application", () => {
        it("Should display quiz questions and check functionality", () => {
            cy.visit(baseUrl + "/main.html");

            
            cy.wait(1000); 

           
            cy.get("form#quiz-form").children("div").should("have.length", 5);

            
            cy.get("form#quiz-form > div").each(($ele, index) => {
                expect($ele.text().split("?")[0] + "?").to.equal(questions[index].question);
                cy.wrap($ele).within(() => {
                    cy.get("input").each((input, i) => {
                        expect(input.attr("value")).to.equal(questions[index].options[i]);
                    });
                });
            });

            
            cy.get("button#submit-btn");

            
            cy.get("p#score-display").should("be.empty");
        });
    });
}
