// Getting the required elements from the DOM
const calculator = document.getElementById('calculator');
const screen = document.getElementById('screen');
const allButtonNodes = calculator.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';

const operators = ['add', 'substract', 'multiply', 'divide'];

function operate(operator, x, y) {
	let finalValue;
	let intX = parseInt(x);
	let intY = parseInt(y);
	switch (operator) {
		case 'add':
			finalValue = add(intX, intY);
			break;
		case 'substract':
			finalValue = substract(intX, intY);
			break;
		case 'multiply':
			finalValue = multiply(intX, intY);
			break;
		case 'divide':
			finalValue = divide(intX, intY);
			break;
	}

	return finalValue;
}

function add(x, y) {
	return x + y;
}

function substract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return y === 0 ? 0 : x / y;
}

function startCalculator() {
	allButtonNodes.forEach(button => {
		button.addEventListener('click', () => {
			if (button.id === 'equal') {
				if (firstNumber.length > 0 && secondNumber.length > 0) {
					let result = operate(operator, firstNumber, secondNumber);
					screen.textContent = result;
					firstNumber = `${result}`;
					secondNumber = '';
					operator = '';
					displayValue = `${result}`;
				} else {
					screen.textContent = '0';
					firstNumber = '';
					displayValue = '';
				}
			}

			switch (button.id) {
				case 'zero':
				case 'one':
				case 'two':
				case 'three':
				case 'four':
				case 'five':
				case 'six':
				case 'seven':
				case 'eight':
				case 'nine':
					if (operators.includes(operator)) {
						secondNumber += button.textContent;
						displayValue += button.textContent;
						screen.textContent = displayValue;
					} else {
						firstNumber += button.textContent;
						displayValue += button.textContent;
						screen.textContent = displayValue;
					}
					break;
				case 'add':
				case 'substract':
				case 'divide':
				case 'multiply':
					if (firstNumber.length > 0) {
						operator = button.id;
						if (!displayValue == '0') {
							console.log('changed');
							displayValue = '';
						}
					}
			}

			console.log(`first ${firstNumber} second${secondNumber} operator${operator} display value ${displayValue}`)

		});
	});
}

startCalculator();