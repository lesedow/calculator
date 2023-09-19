import { Calculator } from "./calculator.js";

const display = document.querySelector('.display');
const calculatorButtons = document.querySelector('.calculator-buttons');

let firstNumber = 0;
let secondNumber = 0;
let currentOperator = null;

const buttonsFunction = {
    number: setNumber,
    operator: setOperator,
    clear: 1,
    sign: 1,
    percent: 1,
    comma: 1
}

function updateDisplay (number) {
    display.textContent = number.toLocaleString();
}

function setOperator (operator) {
    currentOperator = operator;
}

function isNumberAtLimit (number) {
    return number.toString().length === 9;
}

function setNumber (number) {
    if (!currentOperator) {
        if (isNumberAtLimit(firstNumber)) return
        firstNumber = parseInt(`${firstNumber}${number}`);
        updateDisplay(firstNumber);
    } else {
        if (isNumberAtLimit(secondNumber)) return
        secondNumber = parseInt(`${secondNumber}${number}`);
        updateDisplay(secondNumber);
    }
}

calculatorButtons.addEventListener('click', (event) => {
    const buttonValue = event.target.getAttribute('data-button');
    if(!buttonValue) return;

    switch (buttonValue) {
        case 'number':
            buttonsFunction.number(event.target.textContent);
            break;
        case 'operator':
            buttonsFunction.operator(event.target.textContent);
            break;
    }
})