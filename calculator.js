export function Calculator() {
    this.firstNumber = 0;
    this.secondNumber = null;
    this.operator = null;
    this.operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }
    this.evaluate = () => {
        const evaluation = this.operations[this.operator](this.firstNumber, this.secondNumber);
        this.firstNumber = evaluation;
        this.secondNumber = null;
        this.operator = null;
        return evaluation;
    }
    this.setOperator = (operator) => {
        this.operator = operator;
    }
    this.isOperator = () => this.operator;
    this.setFirstNumber = (number) => {
        this.firstNumber = number;
    }
    this.setSecondNumber = (number) => {
        this.secondNumber = number;
    }
}
