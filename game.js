console.log("Hello world from game");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0; //what question user is on
let availableQuestions = []; //copy full question set

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

//start game function

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //spread operator to opy questions array into available questions
  console.log(availableQuestions);
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    //max questions can change
    return window.location.assign("/end.html");
  }
  questionCounter++; //increment question by one
  //get random question index
  const questionIndex = Math.floor(Math.random() * availableQuestions.length); //when one question used will be one less
  currentQuestion = availableQuestions[questionIndex]; //get available questions array with index set it to current questions
  question.innerHTML = currentQuestion.question; //get the question property in object
  //get choices of answer
  choices.forEach((choice) => {
    const number = choice.dataset["number"]; //get number data attrribute
    choice.innerText = currentQuestion["choice" + number]; //out of current question object get spefici choice property depending on number from dataset property
  });

  availableQuestions.splice(questionIndex, 1); //get the available questions array splice out the question used start at questionindex and take out one
  console.log(availableQuestions);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    //load new question
    getNewQuestion();
  });
});
startGame();