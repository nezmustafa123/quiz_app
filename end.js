const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore"); //update score text with final score
const mostRecentScore = localStorage.getItem("mostRecentScore");

//have to convert array into json string before setting the item
const highScores = JSON.parse(localStorage.getItem("highscores")) || []; //set highscores the first time
// console.log(JSON.parse(localStorage.getItem("highscores")));
const MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  //username input eventlistener
  //keyup event listener
  //   console.log(username.value);
  saveScoreBtn.disabled = !username.value; //disable button if nothing in the username input
});

saveHighScore = (e) => {
  //called in hyml
  console.log("Clicked the save button!");
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value,
  }; //what want to add to array
  highScores.push(score);
  highScores.sort((a, b) => {
    return b.score - a.score; //if b score, (second) is higher than first (a) return b score
  });
  highScores.splice(5); //splice aeverything after index 5
  //update highscores and strinfiy into json
  localStorage.setItem("highSocres", JSON.stringify(highScores));
  window.location.assign("/");
  console.log(highScores);
};
