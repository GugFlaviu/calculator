document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.number-btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.value;

    
            if (!isNaN(value) || value === '0') {
                currentInput += value;
                display.value = currentInput;
            }
   
            else if (value === '+' || value === '-' || value === 'x' || value === '/') {
                if (currentInput === '' && operator !== '') return;
                if (previousInput === '') {
                    previousInput = currentInput;
                    currentInput = '';
                } else {
                    previousInput = calculate(previousInput, currentInput, operator);
                    display.value = previousInput;
                    currentInput = '';
                }
                operator = value;
            }
            // Handle equals input
            else if (value === '=') {
                if (previousInput !== '' && currentInput !== '') {
                    display.value = calculate(previousInput, currentInput, operator);
                    previousInput = '';
                    currentInput = display.value;
                    operator = '';
                }
            }
            // Handle delete input
            else if (value === 'Del') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
            }
        });
    });

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        let result = '';

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    result = 'Error';
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                return;
        }
        return result.toString();
    }
});