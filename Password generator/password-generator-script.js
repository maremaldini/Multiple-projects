//Global variables
var numbers = "0123456789"
var lowerCase = "abcdefghjklmnopqrstuvwxyz"
var upperCase = "ABCDEFGHJKLMNOPQRSTUVWXYZ"
var symbols = "<>?,./:'[]{}-=_+!@#$%^&*()"
var passwordLength
var button = document.getElementById("button")
var password = ''
var range = document.getElementById("range")
var lowerCaseChecked = document.getElementById("lower").checked
var upperCaseChecked = document.getElementById("upper").checked
var numbersChecked = document.getElementById("number").checked
var symbolsChecked = document.getElementById("symbol").checked
var copy = document.getElementById("buttonCopy")

//Events
range.addEventListener('change', function () {
    var rangeValue = range.value;
    document.getElementById('length').innerHTML = rangeValue
})
copy.addEventListener('click', copyPassword)

//Get random value from all string types
function getRandom(value) {
    var valueLength = value.length
    var random = Math.floor(Math.random() * valueLength)
    return (value[random])
}

//Main function to generate random password
button.addEventListener('click', function () {
    document.querySelector('#textarea').style.color = 'black'

    passwordLength = document.querySelector('#range').value
    lowerCaseChecked = document.querySelector('#lower').checked
    upperCaseChecked = document.querySelector('#upper').checked
    numbersChecked = document.querySelector('#number').checked
    symbolsChecked = document.querySelector('#symbol').checked

    if (lowerCaseChecked || upperCaseChecked || numbersChecked || symbolsChecked) {
        while (password.length +1 <= passwordLength) {
            var passwordLengthKey = Math.floor(Math.random() * 4)

            if (passwordLengthKey % 4 == 0 && numbersChecked) {
                password += getRandom(numbers)
            }
            if (passwordLengthKey % 4 == 1 && lowerCaseChecked) {
                password += getRandom(lowerCase)
            }
            if (passwordLengthKey % 4 == 2 && upperCaseChecked) {
                password += getRandom(upperCase)
            }
            if (passwordLengthKey % 4 == 3 && symbolsChecked) {
                password += getRandom(symbols)
            }
            else {
            document.querySelector('#textarea').innerHTML = 'ERROR'
        }
        }
        document.getElementById('textarea').innerHTML = password
        password = ''
    }
    else {
        document.querySelector("#textarea").style.color = 'red'
        document.querySelector("#textarea").innerHTML = 'Select data type!'
}
})


//Copy password to clickboard
function copyPassword() {
    var copy_text = document.querySelector('#textarea').innerHTML
    var range = document.createRange()
    range.selectNode(copy_text)
    window.getSelection().addRange(range)
    document.execCommand('copy')
}