//your JS code here.

// Array to store user's answers
let userAnswers = new Array(questions.length).fill(null);

// Retrieve user's answers from session storage if available
const storedAnswers = JSON.parse(sessionStorage.getItem('userAnswers'));
if (storedAnswers) {
  userAnswers = storedAnswers;
}

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener('change', function(event) {
        userAnswers[i] = event.target.value;
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Calculate the user's score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Display the user's score
function displayScore() {
  const scoreElement = document.getElementById('score');
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
}

// Display questions and choices
renderQuestions();

// Event listener for submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', displayScore);

// Define questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Do not change code below this line
// This code will just display the questions to the screen
