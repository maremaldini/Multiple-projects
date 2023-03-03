"use strict"

var sumbit = document.querySelector('.submit');
var results = document.querySelector('.results');
var amount = document.querySelector('.amount-text');

sumbit.addEventListener('click', function(){
    var valuee = amount.value

    var e = document.querySelector('#money-type')
    var select = e.value;

    Currency(select, valuee);
})

function Currency(select, value){
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    if(parseFloat(value) <= 0 || isNaN(parseFloat(value)+1) || !value.isNumber()) {
        results.innerHTML = "Please provide a valid value!";
        results.style.color = "red";
        results.style.textAlign = "center";
        return;
    }

    results.style.color = "black";
    results.style.textAlign = "initial";

    var dolar, euro, lire, forint, lei;

    switch (select){
        case "lions":
            dolar = value * 0.22;
            euro = value * 0.204445496;
            lire = value * 0.18;
            forint = value * 79.09;

            results.innerHTML = '<pre>      For ' + ReduceDecimals(value) + " lions (lei) you have: <br> Dollars: " + 
            ReduceDecimals(dolar) + " ($)" + "<br> Pounds: " + ReduceDecimals(lire) + " (GBP) <br> " +
            "Forints: " + ReduceDecimals(forint) + " (HUF)<br>" + " Euros: " + ReduceDecimals(euro) + "(€)</pre>";
            
            break;

        case "euros":
            dolar = value * 1.07;
            lei = value * 4.89;
            lire = value * 0.89;
            forint = value * 387.1;

            results.innerHTML = '<pre>      For ' + ReduceDecimals(value) + " euros (€) you have: <br> Lions: " + 
                ReduceDecimals(lei) + " (lei) <br> Dollars: " + ReduceDecimals(dolar) + " ($)" + "<br> Pounds: " + 
                ReduceDecimals(lire) + " (GBP) <br> " + "Forints: " + ReduceDecimals(forint) + " (HUF)";
            
            break;

        case "dollars":
            euro = value * 0.93;
            lei = value * 4.56;
            lire = value * 0.83;
            forint = value * 360.71;

            results.innerHTML = '<pre>      For ' + ReduceDecimals(value) + " dollars ($) you have: <br> Lions: " + 
                ReduceDecimals(lei) + " (lei) <br> Euro: " + ReduceDecimals(euro) + " (€)" + "<br> Pounds: " + 
                ReduceDecimals(lire) + " (GBP) <br> " + "Forints: " + ReduceDecimals(forint) + " (HUF)";
            
            break;

        case "forints":
            euro = value * 0.0026;
            lei = value * 0.013;
            lire = value * 0.0023;
            dolar = value * 0.0028;

            results.innerHTML = '<pre>      For ' + ReduceDecimals(value) + " fotints (HUF) you have: <br> Lions: " + 
                ReduceDecimals(lei) + " (lei) <br> Euro: " + ReduceDecimals(euro) + " (€)" + "<br> Pounds: " + 
                ReduceDecimals(lire) + " (GBP) <br> " + "Dollars: " + ReduceDecimals(dolar) + " ($)</pre>";
            
            break;

        case "pounds":
            euro = value * 1.13;
            lei = value * 5.52;
            forint = value * 437.24;
            dolar = value * 1.21;

            results.innerHTML = '<pre>      For ' + ReduceDecimals(value) + " pounds (BGP) you have: <br> Lions: " + 
                ReduceDecimals(lei) + " (lei) <br> Euro: " + ReduceDecimals(euro) + " (â‚¬)" + "<br> Forints: " + 
                ReduceDecimals(forint) + " (HUF) <br> " + "Dollars: " + ReduceDecimals(dolar) + " ($)</pre>";
            
            break;
    
        default:
            results.innerHTML = "Please choose your currency!";
            results.style.color = "red";
            results.style.textAlign = "center";            
            break;
    }
}

function ReduceDecimals(number){
    if(number.toString().includes('.')){
        var integerPart = number.toString().split('.')[0];
        var decimalPart = number.toString().split('.')[1].slice(0,3);

        number =  integerPart + '.' + decimalPart;
    }

    return number;
}