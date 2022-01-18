const username = document.getElementById("username");
username.addEventListener("keyup", () => {
  //keyup event listener
  console.log(username.value);
});

saveHighScore = (e) => {
  console.log("Clicked the save button!");
  e.preventDefault();
};
