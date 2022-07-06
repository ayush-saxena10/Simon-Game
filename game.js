let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
function nextSequence(){
  userClickedPattern = [];
  let randomChosenColor = buttonColors[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColor);
  let selectedButton = $("#"+randomChosenColor);
  selectedButton.fadeOut(100).fadeIn(100);
  let audio = new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
  level++;
  $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userClickedPattern[userClickedPattern.length-1]);
  animatePress(userClickedPattern[userClickedPattern.length-1]);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(()=>{
    $("#"+currentColor).removeClass("pressed");
  }, 100)
}

$(document).keydown(()=>{
  if (level===0){
    nextSequence();
  }
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(()=>nextSequence(), 1000);
    }
  }
  else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout($("body").removeClass("game-over"), 1000);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver (){
  level = 0;
  gamePattern = [];
}
