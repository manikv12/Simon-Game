var gamePattern = [];
var userClickedPattern =[];
var buttonColors = ["red","blue","green","yellow"];
var gameStart = false;
var level = 0;

// Check for keyboard press only works for when game is started
$(document).keypress(function (){
    if (!gameStart){
        $('.page-title').html('');
        nextSequence();
        $('#level-title').text('Level '+level);
        gameStart = true;
    }
});

//Check for the button press
$('.btn').click(function(){
    // Check which button got clicked
    var userChosenColor = $(this).attr('id');
    // Add chosen color to array
    userClickedPattern.push(userChosenColor);
    //Play sound on button click
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    //Once next sequnce is triggered reset the userClickedPattern to an empty array
    userClickedPattern =[];

    level++;
    $('#level-title').text('Level '+level);
    var randomNumber = Math.floor(Math.random()*3) + 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var selectedButton = $("#"+randomChosenColor)
    // Fading effect on chosen button
    selectedButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
}


// Play Sound Function
function playSound(name) {
    // Play audio related to chosen color
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// Animate button on click
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    } else {
        playSound('wrong');
        $('body').addClass('game-over')
        $('#level-title').html('Game Over, Press Any Key to Restart')
        setTimeout(function(){
            $('body').removeClass('game-over')
        },200)
        startOver();
    }

}

//Restart the Game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}
