console.log("Hello world from game");
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0; //what question user is on
let availableQuestions = []; //copy full question set

let questions = [];
//pull questions from file
fetch("https://opentdb.com/api.php?amount=10&category=9")
  .then((res) => {
    //http response
    console.log(res);
    return res.json(); //get body and return json
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      //return and chuck formatted question into questions array
      const formattedQuestion = {
        question: loadedQuestion.question,
      };
      //declate variable inside the loop have to do it for each question
      const answerChoices = [...loadedQuestion.incorrect_answers];
      console.log(formattedQuestion);
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1; //random index 0-3
      console.log(formattedQuestion.answer);
      answerChoices.splice(
        formattedQuestion.answer - 1, //sero based inde
        0, //dont remove
        loadedQuestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice; //create new property choice1, choice2 etc
      });
      console.log(formattedQuestion);
      return formattedQuestion;
    });
    //show game and hide loader
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

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
    //when ending game save the score to access in the end screen
    localStorage.setItem("mostRecentScore", score);
    //max questions can change
    return window.location.assign("/end.html");
  }
  questionCounter++; //increment question by one
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; //set questiontext
  //whenever increment question update progress bar set width property
  console.log(questionCounter / MAX_QUESTIONS);
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  //get random question index
  const questionIndex = Math.floor(Math.random() * availableQuestions.length); //when one question used will be one less
  currentQuestion = availableQuestions[questionIndex]; //get available questions array with index set it to current questions
  question.innerHTML = currentQuestion.question; //get the question property in object
  //get choices of answer
  choices.forEach((choice) => {
    const number = choice.dataset["number"]; //get number data attrribute
    choice.innerText = currentQuestion["choice" + number]; //out of current question object get spefici choice property depending on number from dataset property
  });

  availableQuestions.splice(questionIndex, 1); //get the available questions array splice out the question answered used splice start at questionindex and take out one
  // console.log(availableQuestions);
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
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num; //mutate score variable outside
  scoreText.innerText = score;
};
