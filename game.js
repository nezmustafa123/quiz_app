console.log("Hello world from game");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

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
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "What is the world’s largest land mammal?",
    choice1: "Giraffe",
    choice2: "Hippo",
    choice3: "Rhino",
    choice4: "Elephant",
    answer: 4,
  },
  {
    question: "The first atom bomb was dropped on which Japanese city?",
    choice1: "Hiroshima",
    choice2: "Nagasaki",
    choice3: "Tokyo",
    choice4: "Osaka",
    answer: 1,
  },
  {
    question: "What does a Geiger Counter measure?",
    choice1: "Coordinates",
    choice2: "Radiation",
    choice3: "Water Pressure",
    choice4: "Current",
    answer: 2,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

//start game function

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //spread operator to copy questions array into available questions
  // console.log(availableQuestions);
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
    //max questions can change
    return window.location.assign("/end.html");
  }
  questionCounter++; //increment question by one
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`; //set questiontext
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
    const selectedChoice = e.target; //get selected question
    const selectedAnswer = selectedChoice.dataset["number"]; //get selected question number
    //const classToApply = "incorrect"; //default class to apply
    // if (selectedAnswer === currentQuestion.answer) {
    //   //if is correct then apply the correct class
    //   classToApply = "correct";
    // }
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //create class to apply variable use double equals current questions answer is a string
    // console.log(selectedAnswer === currentQuestion.answer);
    // console.log(classToApply);

    if (classToApply === "correct") {
      //if class to apply is correct
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply); //apply the class depending on the selectedanswer
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      //load new question
      getNewQuestion();
      //load new question
    }, 6000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
