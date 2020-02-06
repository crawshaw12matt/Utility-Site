// --------------------- START UP -------------------------------------
let currentResult = [0];
let saveNumber = [0];
let currentOperator = [0];

window.onload = function(){
    updateDisplay(currentResult.join(''));
};

// -------------------- CODING FUNCTIONS ------------------------------
function updateDisplay(value){
    document.getElementById('result').innerHTML = value;
}

function resetValues(){
    currentResult = [0];
    saveNumber = [0];
}

function removeEquals(){
    if (currentResult[0] == '=') {
        currentResult.shift();
    }
}

function setResult(value){
    resetValues();
    currentResult[0] = '=';
    currentResult[1] = value;
}

// ---------------------- ALL BUTTONS ----------------------------------
document.querySelectorAll('.button').forEach(item => {
    item.addEventListener('mouseenter', function(){
        item.style.opacity = 0.75;
    })
    item.addEventListener('mouseleave', function(){
        item.style.opacity = 1;
    })
})

// ----------------------- NUMBERS -------------------------------------
//  Number Button Listeners
for (let i = 0; i < 10; i++) {

    const number = document.getElementById(i);

    number.addEventListener('click', function(){
        if (currentResult[0] == 0) {
            currentResult[0] = number.innerHTML;
        } else if (currentResult[0] == '=') {
            resetValues();
            currentResult[0] = number.innerHTML;
        } else {
            currentResult.push(number.innerHTML);
        }
        updateDisplay(currentResult.join(''));
    })
}

// --------------------- SWITCH & DECIMALS -----------------------------
// Switch
const switcher = document.getElementById('switch');

switcher.onclick = function() {
    removeEquals();
    currentResult[0] = currentResult[0] * -1;
    updateDisplay(currentResult.join(''));
}

// Decimal
const deci = document.getElementById('decimal');

deci.onclick = function() {
    if (currentResult.includes('.') == false) {
        currentResult.push('.');
    }
    updateDisplay(currentResult.join(''));
}

// --------------------- MATH FUNCTIONS --------------------------------
// All Operators saveNumber Functionality
for (let j = 10; j < 16; j++) {

    const operator = document.getElementById(j);

    operator.addEventListener('click', function(){
        removeEquals();
        saveNumber = currentResult;
        currentResult = [0];
        updateDisplay(operator.innerHTML);
    })

}

// Addition
const addButton = document.getElementById('10');

addButton.onclick = function() {
    currentOperator[0] = '+';
}

// Subtraction
const subButton = document.getElementById('11');

subButton.onclick = function() {
    currentOperator[0] = '-';
}

// Multiplication
const multButton = document.getElementById('12');

multButton.onclick = function() {
    currentOperator[0] = '*';
}

// Division
const divButton = document.getElementById('13');

divButton.onclick = function() {
    currentOperator[0] = '/';
}

// Exponent
const expButton = document.getElementById('14');

expButton.onclick = function() {
    currentOperator[0] = '^';
}

// Modular
const modButton = document.getElementById('15');

modButton.onclick = function() {
    currentOperator[0] = '%';
}

// Root
const rootButton = document.getElementById('sqRoot');

rootButton.onclick = function() {
    removeEquals();
    let numToRoot = parseFloat(currentResult.join(''));
    let rootedNum = Math.sqrt(numToRoot);
    resetValues();
    setResult(rootedNum);
    updateDisplay(currentResult[1]);
}

// Fractionalize
const fractButton = document.getElementById('fractionIt');

fractButton.onclick = function() {
    removeEquals();
    let denom = parseFloat(currentResult.join(''));
    let fract = 1 / denom;
    resetValues();
    setResult(fract);
    updateDisplay(currentResult[1]);
}


// Equals

const equalsButton = document.getElementById('equal');

equalsButton.onclick = function() {
    let num1 = parseFloat(currentResult.join(''));
    let num2 = parseFloat(saveNumber.join(''));
    let mathSign = currentOperator[0];
    if (num1) {
        if (num2) {
            if (mathSign) {
                let resultOfCalculation = 0;
                switch (mathSign) {
                    case '+':
                        resultOfCalculation = num1 + num2;
                        break;
                    case '-':
                        resultOfCalculation = num2 - num1;
                        break;
                    case '*':
                        resultOfCalculation = num1 * num2;
                        break;
                    case '/':
                        resultOfCalculation = num2 / num1;
                        break;
                    case '^':
                        resultOfCalculation = Math.pow(num2, num1);
                        break;
                    case '%':
                        resultOfCalculation = num2 % num1;
                        break;
                }
                resetValues();
                setResult(resultOfCalculation);
                updateDisplay(currentResult[1]);

            } else {
                updateDisplay('Error with operator');
            }
        } else {
            updateDisplay('Error with second number');
        }
    } else {
        updateDisplay('Error with first number');
    }
}



// --------------------- CALC-FUNCTIONS --------------------------------
// Clear Everything Functionality
const CE = document.getElementById("clear-everything");

CE.onclick = function(){
    resetValues();
    currentOperator = [0];
    updateDisplay(currentResult.join(''));
}

// Clear currentResult Functionality
const C = document.getElementById('clear');

C.onclick = function(){
    currentResult = [0];
    updateDisplay(currentResult.join(''));
}

// Backspace Functionality
const backspace = document.getElementById('backspace');

backspace.onclick = function(){
    currentResult.pop();
    if (currentResult[0] == undefined) {
        currentResult[0] = 0;
    } else if (currentResult.length == 1 && currentResult[0] == '='){
        currentResult[0] = 0;
    }
    updateDisplay(currentResult.join(''));
}