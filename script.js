function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const currentValue = display.value;

    if (currentValue === '' && isOperator(value)) {
        return; // If display is empty and the entered value is an operator, do nothing
    }

    if (isOperator(value)) {
        if (currentValue === '' || isOperator(currentValue.slice(-1))) {
            display.value = currentValue.slice(0, -1) + value; // Replace last operator
        } else {
            display.value += value; // Append operator
        }
    } else if (value === '.') {
        if (isValidDecimal(currentValue)) {
            display.value += value; // Append decimal
        }
    } else {
        display.value += value; // Append number
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function isValidDecimal(currentValue) {
    const parts = currentValue.split(/[\+\-\*\/\%]/); // Split by operators
    const lastPart = parts[parts.length - 1];
    return !lastPart.includes('.'); // Valid if the last part doesn't contain a decimal
}

function handleKeydown(event) {
    const validKeys = '0123456789+-*/.%'.split('');
    if (validKeys.includes(event.key)) {
        appendToDisplay(event.key);
        event.preventDefault(); // Prevent the default action
    } else if (event.key === 'Enter') {
        calculate();
        event.preventDefault(); // Prevent the default action
    } else if (event.key === 'Backspace') {
        backspace();
        event.preventDefault(); // Prevent the default action
    } else if (event.key === 'Escape') {
        clearDisplay();
        event.preventDefault(); // Prevent the default action
    }
}

document.addEventListener('keydown', handleKeydown);

function calculate() {
    const display = document.getElementById('display');
    try {
        let expression = display.value.replace(/%/g, '/100'); // Replace percentage with division by 100
        let result = eval(expression);
        if (!isFinite(result)) {
            display.value = 'Error';
            alert('Invalid calculations');
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
        alert('Invalid calculations');
    }
}