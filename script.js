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
 
const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');
 
// Display the quiz questions and choices
 
function renderQuestions() {
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
      const userAnswer = sessionStorage.getItem(`question-${i}`);
      if (userAnswer === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
 
//Event listener for radio buttons
questionsElement.addEventListener('change', function(event) {
	if (event.target.type === 'radio') {
    const questionIndex = parseInt(event.target.name.split('-')[1]);
    const selectedOption = event.target.value;
    sessionStorage.setItem(`question-${questionIndex}`, selectedOption);
  }
});
 
// Event listener for submit button
submitButton.addEventListener('click', function() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const userAnswer = sessionStorage.getItem(`question-${i}`);
    if (userAnswer === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
});
 
renderQuestions();
