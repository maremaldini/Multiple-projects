var numberToGuess = Math.trunc(Math.random() * 100) + 1
var inputNumber
var highscore = 0
var score = 100


// math.randim 0 - 0.99 0 99  / / 1 100

var squareContainer = document.querySelector('.square')
var messageContainer = document.querySelector('.message')
var scoreContainer = document.querySelector('.score')
var highscoreContainer = document.querySelector('.highscore')
var guessContainer = document.querySelector('.guess-container')

var checkButton = document.querySelector('.check-button')
var againButton = document.querySelector('.again-button')

console.log(numberToGuess)


checkButton.addEventListener('click', function(){
    inputNumber = document.querySelector('.input-number').value

    if(inputNumber != numberToGuess){
        messageContainer.innerHTML = inputNumber > numberToGuess ? "📈 Too high!" : "📉 Too low!"
        score--
        scoreContainer.innerHTML = "Score: " + score
    }

    else {
        messageContainer.innerHTML = "🥳 Congratulations!"
        checkButton.style.visibility = "hidden"
        guessContainer.style.background = "green"
        squareContainer.innerHTML = numberToGuess   

        if(Number(score) > Number(highscore)){
            console.log(score, typeof score)
            console.log(highscore, typeof highscore)
            highscoreContainer.innerHTML = "Highscore: " + score
        }
    }
})

againButton.addEventListener('click', function(){
    score = 100;
    scoreContainer.innerHTML = "✅ Score: " + score
    messageContainer.innerHTML = "❗️ Start guessing..."
    checkButton.style.visibility = "visible"
    guessContainer.style.background = "rgba(0,255,255,0.3)"
    numberToGuess = Math.trunc(Math.random() * 100) + 1
    squareContainer.innerHTML = "?"
    document.querySelector('.input-number').value = 50
})