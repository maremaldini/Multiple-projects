"use strict"

var numberButtons = document.querySelectorAll('[data-number]'); // all numbers buttons 1 - 9, 0 and .
var operationButtons = document.querySelectorAll('[data-operation]'); // all operations buttons + - * /
var allClearButton = document.querySelector('[data-all-clear]'); // clear all button
var equalsButton = document.querySelector('[data-equals]'); // equals button = 
var deleteButton = document.querySelector('[data-delete]'); // delete last char button

var reverseSignButton = document.querySelector('[data-reverse]') // reverse sign button

var errorMessage = document.querySelector('.message'); // error message container

var sqrtButton = document.querySelector('[data-sqrt]'); // square root button
var nthSqrtButton = document.querySelector('[data-nth-sqrt]'); // nth root button
var factorialButton = document.querySelector('[data-factorial]'); // factorial button
var powerButton = document.querySelector('[data-power]'); // raise to power on n button

var currentNumber = document.querySelector(".current-number"); // the currently introduced number container
var previousNumber = document.querySelector(".previous-number"); // the previously introduced number container

class Calculator { 
    constructor (currentNumber, previousNumber, operation){
        this.currentNumber = currentNumber;
        this.previousNumber = previousNumber;
        this.operation=operation;
        this.allClear(); // clear all as soon as the calculator starts
    }

    allClear(){ // function to clear all
        currentNumber.innerHTML = '';
        previousNumber.innerHTML = '';
        this.operation = '';
        ClearMessage(); // clear the message container
    }

    delete(){ // function to delete the last char of the current number value
        if(currentNumber.innerHTML === "NaN" || "Infinity") {
            ErrorMessage('Clear all before continuing!');
            return;
        }

        currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
    }

    reverseSign(){ // function to reverse the sign of the current number
        if(currentNumber.innerHTML === '' || currentNumber.innerHTML === 'NaN' || currentNumber.innerHTML === 'Infinity') { 
            // exit the function if there is no number
            ErrorMessage('No number has been introduced!');
            return;
        }

        currentNumber.innerHTML = -parseFloat(currentNumber.innerHTML); // reverse the sign of the number
    }

    chooseOperation(newOperation){ // function when operation button is clicked 
        if(currentNumber.innerHTML === '') return; // if there is no current number introduced, exit the function

        if(previousNumber.innerHTML === 'NaN' || currentNumber.innerHTML === 'NaN' || currentNumber.innerHTML === 'Infinity'){
            ErrorMessage('Clear all before continuing!');
            return;
        } // if any of the numbers is NaN, show message to user to clear all in order to cotinue

        if(previousNumber.innerHTML !== '' && this.operation !== 'POW'){ 
            this.equals();
        } // if there is a previous number and a new operation is choosen
        // first compute it, and then store the new operation

        this.operation = newOperation; // store the operation in a local variable
        
        let text = currentNumber.innerHTML; // store the number from the current number container into a local variable

        if(text.charAt(0)==='.'){ // if the current numbers starts with . then the number will become 0.
            text = "0" + currentNumber.innerHTML;
        }

        previousNumber.innerHTML = text + " " + this.operation; // print in the previous number container 
        // the current number and the operation
        currentNumber.innerHTML = ''; // resert the curent number container's value
    }

    equals(){
        if(currentNumber.innerHTML === '' || previousNumber.innerHTML === '' || this.operation === '') return;
        // if current number, previous number or operation is missing, exit the function
        ClearMessage();
        let computation; // local variable to store the result of the computation

        switch (this.operation){ // all the operation cases
            case "+": // for addition
                computation = parseFloat(previousNumber.innerHTML) + parseFloat(currentNumber.innerHTML);
                this.updateDisplay(computation);
                break;
            case "-": // for substraction
                computation = parseFloat(previousNumber.innerHTML) - parseFloat(currentNumber.innerHTML);
                this.updateDisplay(computation);
                break;
            case "x": // for multiplication
                computation = parseFloat(previousNumber.innerHTML) * parseFloat(currentNumber.innerHTML);
                this.updateDisplay(computation);
                break; 
            case "÷": // for divisiom
                if(currentNumber.innerHTML === '0') { // division by 0 is not allowed
                    ErrorMessage("Division by 0 is undefined!");
                    return;
                }
                computation = parseFloat(previousNumber.innerHTML) / parseFloat(currentNumber.innerHTML);
                this.updateDisplay(computation);
                break;
            case "POW": // raise to the power of the current number
                computation = Math.pow(parseFloat(previousNumber.innerHTML), parseFloat(currentNumber.innerHTML));
                this.updateDisplay(computation);
                break;
            case 'nth SQRT': // the current's number root of the previos number
                if(currentNumber.innerHTML === '0') return;
                computation = Math.pow(parseFloat(previousNumber.innerHTML), 1 / parseFloat(currentNumber.innerHTML));
                this.updateDisplay(computation);
                break;
            default: // default scenarion in the case of an error
                ErrorMessage('No operation has been selected!');
                return;    
        }
    }

    appendNumber(number){ // function to append a new character (single number) to the current number container's value
        if(currentNumber.innerHTML.includes('.') && number===".") {
            ErrorMessage('The number cannot have 2 dots!');
            return;
        } // if the number contains a . and another . is given to be introduced, exit the function

        if(currentNumber.innerHTML === '0' && number === '0') {
            ErrorMessage('The number cannot start with 2 zeros!');
            return;
        } // if the number is exactly 0 and another 0 is given to be introduced, exit the function

        if(currentNumber.innerHTML === 'NaN' || previousNumber.innerHTML === 'NaN' || currentNumber.innerHTML === 'Infinity') {
            errorMessage('Not a number returned!');
            return;
        } // cannot append a number if any of the container is NaN

        if(currentNumber.innerHTML === '0' && number !== '0' && number !== '.') {
            currentNumber.innerHTML = number;
        }

        else {
            currentNumber.innerHTML += number; // add the number to the screen
        }
    }

    updateDisplay(result){ // update the display with the result value

        if(result.toString().includes('.') && result.toString().length < 20){ // if the number has no longer length than 20 chars
            // ex: factorial numbers like 23! are huge, but they do not have decimals
            var integerPart = result.toString().split('.')[0]; // slice the result, the integer part
            var decimalPart = result.toString().split('.')[1].slice(0,5); // the first 5 chars of the decimal parts

            if(decimalPart === '0000'){ // if the number is an integer, print only its integer value
                result = integerPart;
            }

            else {
                result = integerPart + '.' + decimalPart; // else print the number with 5 decimals
            }
        }

        currentNumber.innerHTML = result; // display the result
        previousNumber.innerHTML = ''; // reset the previous number container
    }

    sqrt(){ // square root function
        if(currentNumber.innerHTML === ''){
            ErrorMessage('No number has been introduced!');
            return;
        }
        if(previousNumber.innerHTML !== '') {
            ErrorMessage('Square root function is only posible after all computations have been made.')
            return;
        }
        // if the current number is missing or there is a previous number, exit the function

        if(currentNumber.innerHTML < 0) {
            ErrorMessage('Square roots are only available for positive numbers!');
            return;
        }

        if(currentNumber.innerHTML === '0') {
            ErrorMessage('Square roots of 0 is 0.');
            return;
        }
        
        this.updateDisplay(Math.sqrt(parseFloat(currentNumber.innerHTML)));
        // call the update display function to display the result of the square root of the curent number
    }

    power(){ 
        if(currentNumber.innerHTML === '') {
            ErrorMessage('No number has been introduced!');
            return;
        }
        if(currentNumber.innerHTML === '0') {
            ErrorMessage('Cannot raise 0 to any power!');
            return;
        }
        
        this.chooseOperation('POW');
    }

    nthSqrt(){
        if(currentNumber.innerHTML === '') {
            ErrorMessage('No number has been introduced!');
            return;
        }
        if(currentNumber.innerHTML === '0') {
            ErrorMessage('Cannot calculate any index of root 0!');
            return;
        }

        this.chooseOperation('nth SQRT');
    }

    factorial() {
        if(currentNumber.innerHTML === ''){ 
            ErrorMessage('No number has been introduced!');
            return;
        }

        if(previousNumber.innerHTML !== '') {
            ErrorMessage('Factorial function is only posible after all computations have been made.');
            return;
        }

        if(!Number.isInteger(parseFloat(currentNumber.innerHTML))) {
            ErrorMessage('Factorial function is only for integer values.');
            return;
        }

        if(currentNumber.innerHTML < 0) {
            ErrorMessage('Factorial function is not valid for negative values.');
            return;
        }

        if(currentNumber.innerHTML === '0') { // 0! is 1
            this.updateDisplay('1');
        }

        var lengthOfNumber = parseFloat(currentNumber.innerHTML); // initial value

        var result = currentNumber.innerHTML; // to store the result of the computation

        while (lengthOfNumber > 1) { // while the number is bigger than 1
            result = parseFloat(result) * (lengthOfNumber -1); // multiply with the following descendant until it reaches 1
            lengthOfNumber--; // decrement the multypling factor until is 1
        }

        this.updateDisplay(result);
    }
}

const calculator = new Calculator(currentNumber, previousNumber, ''); // create an instance of the calculator   

numberButtons.forEach(function (button) {
  button.addEventListener('click', function() {
    calculator.appendNumber(button.innerHTML);
  });
}); // add a function to each button with its inner HTML value, for numbers

operationButtons.forEach(function (button) {
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerHTML);
    });
}); // add a function to each button with its inner HTML value, for operations

allClearButton.addEventListener('click', function(){
    calculator.allClear();
}); // add function to the button to connect to the clear all function from the calculator class

equalsButton.addEventListener('click', function(){
    calculator.equals();
}); // add function to the button to connect to the equal function from the calculator class

sqrtButton.addEventListener('click', function(){
    calculator.sqrt();
}); // add function to the button to connect to the square root function from the calculator class

deleteButton.addEventListener('click', function(){
    calculator.delete();
}); // add function to the button to connect to the delete function from the calculator class

factorialButton.addEventListener('click', function(){
    calculator.factorial();
})

reverseSignButton.addEventListener('click', function(){
    calculator.reverseSign();
})

powerButton.addEventListener('click', function(){
    calculator.power();
})

nthSqrtButton.addEventListener('click', function(){
    calculator.nthSqrt();
})

function ErrorMessage(errorText) {
        errorMessage.innerHTML = errorText;
        errorMessage.style.display = "flex";
        errorMessage.style.justifyContent = "center";
        errorMessage.style.alignItems = "center";
        errorMessage.style.textAlign = "center";
} // show the error message container

function ClearMessage(){
    errorMessage.style.display = "none";
} // delete the error message container