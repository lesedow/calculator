function Calculator() {
    this.operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }
    this.evaluate = expression => {
        const [a, operator, b] = expression.split(' ');
        const evaluation = this.operations[operator](+a, +b);
        return evaluation;
    }
}

const calculator = new Calculator();
const result = calculator.evaluate('2 * 3');
console.log(result)