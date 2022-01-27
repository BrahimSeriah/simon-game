var blueSound = new Audio("sounds/blue.mp3");
var greenSound = new Audio("sounds/green.mp3");
var redSound = new Audio("sounds/red.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var gameStarted = false;
var playerTurn = false
var soundsSequence;
var i = 0;

$(document).on("keydown", gameStart);
$("[type = button]").on("click", clickHandler);

function gameStart() {
    if (!gameStarted) {
        gameStarted = true;
        soundsSequence = [];
        soundsSequence.push(generateSoundSequence());
        $("h1").text("Level " + soundsSequence.length);
        playerTurn = true;
    }
}

function clickHandler() {
    var index = parseInt(this.getAttribute("data-id"));
    if (playerTurn) {
        if (index === soundsSequence[i]) {
            playSound(index);
            i++;
            if (i === soundsSequence.length) {
                setTimeout(function () {
                    playerTurn = false;
                    soundsSequence.push(generateSoundSequence());
                    $("h1").text("Level " + soundsSequence.length);
                    i = 0;
                    playerTurn = true;
                }, 700);
            }
        }
        else {
            wrongSound.play();
            $("h1").text("Wrong! try again, level reached : " + soundsSequence.length);

            gameStarted = false;
            playerTurn = false
        }
    }
}

function generateSoundSequence() {
    randomSequence = Math.floor(Math.random() * 4);
    playSound(randomSequence);
    return randomSequence;
}

function playSound(index) {
    switch (index) {
        case 0:
            buttonAnimation(0);
            greenSound.play();
            break;
        case 1:
            buttonAnimation(1);
            redSound.play();
            break;
        case 2:
            buttonAnimation(2);
            yellowSound.play();
            break;
        case 3:
            buttonAnimation(3);
            blueSound.play();
            break;
        default:
            break;
    }
}

function buttonAnimation(index) {
    $("[data-id=" + index + "]").toggleClass("pressed");
    setTimeout(function () {
        $("[data-id=" + index + "]").toggleClass("pressed");
    }, 150);
}