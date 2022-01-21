const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //if no highscores in localstorage then get empty array
console.log(highScores);

highScoresList.innerHTML = highScores
  .map((score) => {
    //returns array of strings
    //map through highscores and add an li for each

    return `<li class="high-score">${score.name}-${score.score}</li>`;
  })
  .join(""); //join string
