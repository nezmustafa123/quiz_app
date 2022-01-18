const username = document.getElementById("username");
const saveScoreBtn = document.getElementsByID("saveScoreBtn");

username.addEventListener("keyup", () => {
  //keyup event listener
  //   console.log(username.value);
  saveScoreBtn.disabled = !username.value; //disable button if nothing in the username input
});

saveHighScore = (e) => {
  console.log("Clicked the save button!");
  e.preventDefault();
};
