import { Calculator } from "./calculator.js";

const display = document.querySelector('.display');
const calculatorButtons = document.querySelector('.calculator-buttons');
const calculator = new Calculator();

let operatorSelected = false;

function updateDisplay (number) {
    if (
        isDisplayLimit() && 
        !operatorSelected
    ) return;

    if (operatorSelected) {
        calculator.setFirstNumber(formatNumber(display.textContent));
        display.textContent = '';
        operatorSelected = false;
    }

    display.textContent += number;
    display.textContent = convertToLocaleString(display.textContent);
}

function displayResult () {
    if (calculator.isOperator()) {
        calculator.setSecondNumber(formatNumber(display.textContent));
        let result = calculator.evaluate();
        if (
            result.toString().includes('.') &&
            !result.toString().includes('e')
        ) {
            const resultSplitted = result.toString().split('.');
            if (resultSplitted[0].length <= 9) {
                result = result.toFixed(4)
            } else {
                result = result.toExponential(4);
            }

        } else if (result.toString().length > 9) {
            result = result.toExponential(4)
        }
        display.textContent = convertToLocaleString(result.toString())
    }
}

function changeSign () {
    if (display.textContent.startsWith('-')) {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = `-${display.textContent}`;
    }
}

function convertToLocaleString(value) {
    if (value.includes('.')) {
        const [firstPart, secondPart] = value.split('.');
        return `${firstPart.toLocaleString()}.${secondPart}`;
    }
    return parseFloat(value.split(',').join('')).toLocaleString();
}

function formatNumber (string) {
    return parseFloat(string.split(',').join(''));
}

function setOperator (operator) {
    if (calculator.isOperator()) return;
    calculator.setOperator(operator);
    operatorSelected = true;
}

function isDisplayLimit () {
    const displayFormatted = display.textContent.split(/[^0-9]/g).join('');
    return displayFormatted.length >= 9;
}

function clearDisplay () {
    operatorSelected = false;
    display.textContent = '';
    calculator.setFirstNumber(0);
    calculator.setSecondNumber(null);
    calculator.setOperator(null);
}

function addDecimal () {
    if (
        display.textContent.includes('.') ||
        display.textContent.length === 0
    ) return;

    display.textContent += '.';
}

calculatorButtons.addEventListener('click', (event) => {
    const button = event.target.getAttribute('data-button');
    if(!button) return;

    const buttonValue = event.target.textContent;

    switch (button) {
        case 'number':
            updateDisplay(buttonValue);
            break;
        case 'operator':
            setOperator(buttonValue);
            break;
        case 'equals':
            displayResult();
            break;
        case 'sign':
            changeSign();
            break;
        case 'clear':
            clearDisplay();
            break;
        case 'decimal':
            addDecimal();
            break;

    }
})