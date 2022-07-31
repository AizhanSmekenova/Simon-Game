let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
const playSound = (name) => {
  new Audio("sounds/" + name + ".mp3").play();
}

const animatePress = (currentColor) => {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
const nextSequence = () => {
  userClickedPattern =[];
  level++;
$("#level-title").text("level " + level);
  const randomNumber = Math.round(Math.random()*3);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
const startOver = () => {
  level = 0;
  gamePattern =[];
  gameStarted = false;
}
const checkAnswer = (currentLevel) => {
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success");
if(gamePattern.length === userClickedPattern.length)
{ setTimeout(function () {
  nextSequence();
}, 1000);

}}  else {
  console.log("wrong");
playSound("wrong");
$("body").addClass("game-over");
setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
$(document).keydown(() => {
startOver();
})
}

}



$(document).keydown(() => {
  if(!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

//nextSequence();
$(".btn").click((e) => {
  const userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(level);
  checkAnswer(userClickedPattern.length -1);

})
