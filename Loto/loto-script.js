var luckyNumbersRange 
var possibleNumbersRange 
var submitButton = document.querySelector('.submit')

submitButton.addEventListener('click', () => {
    luckyNumbersRange = document.querySelector('#lucky-range').value
    possibleNumbersRange = document.querySelector('#possible-range').value

    if(Number(luckyNumbersRange) > Number(possibleNumbersRange)){
        document.querySelector('.error').style.display = "block"
    }

    else {
        document.querySelector('.error').style.display = "none"
        document.querySelector('.result').innerHTML = "";

        var numbers = GetLuckyNumbers(luckyNumbersRange, possibleNumbersRange)

        for(var i=0;i<luckyNumbersRange;i++){
            var circle = document.createElement("div")
            circle.classList.add("circle");
            circle.style.background = GetRandomColor()
            document.querySelector('.result').appendChild(circle)
        }

        var divs = document.querySelectorAll('.circle')

        for(var i=0;i<luckyNumbersRange;i++){
            divs[i].innerHTML = numbers[i]
        }
    }
})

function GetLuckyNumbers(lucky, possible){
    var luckyNumbers = new Array()
    var randomNumber

    for(var i=1; i<=lucky ;i++){
        randomNumber = Math.trunc(Math.random() * possible) + 1

        while(luckyNumbers.includes(randomNumber)){
            randomNumber = Math.trunc(Math.random() * possible) + 1
        }

        luckyNumbers.push(randomNumber)
    }

    return luckyNumbers
}

function GetRandomColor(){
    var colors = new Array()
    while (colors.length < 100) {
        do {
            var color = Math.floor((Math.random()*1000000)+1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    
    var random = Math.trunc(Math.random() * colors.length) 

    return(colors[random])
}