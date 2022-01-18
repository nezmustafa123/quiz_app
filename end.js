const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore"); //update score text with final score
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  //username input eventlistener
  //keyup event listener
  //   console.log(username.value);
  saveScoreBtn.disabled = !username.value; //disable button if nothing in the username input
});

saveHighScore = (e) => {
  console.log("Clicked the save button!");
  e.preventDefault();
};
