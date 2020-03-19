function eval() {
    // Do not use eval!!!
    return;
}

const operatorPriority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0,
    ')': 0
};

function calculate (x, y, op) {
    if (op === '+')
        return x + y;
    else if (op === '-')
        return x - y;
    else if (op === '*')       
        return x * y;
    else if (op === '/') {
        if (y === 0) 
            throw new Error("TypeError: Division by zero.");
        return  x / y;
    }
}

function checkPair(expr) {
    let count = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            count++;
        }
        else if (expr[i] === ')') {
            count --;
        }
    }
    if (count != 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }    
}

let stackNumbers = [];
let stackOperators = [];

function calculateTopNumbers () {
    let y = stackNumbers.pop();
    let x = stackNumbers.pop();
    let operator = stackOperators.pop();
    stackNumbers.push(calculate(x, y, operator));
}

function checkOperator (token) {
    if (stackOperators.length === 0)
        stackOperators.push(token);
    else if (token === '(')
        stackOperators.push(token);
    else if (token === ')') {
        while (stackOperators[stackOperators.length - 1] != '(') {
            calculateTopNumbers();
        }
        stackOperators.pop();
    }    
    else if (operatorPriority[token] > operatorPriority[stackOperators[stackOperators.length - 1]]) {
        stackOperators.push(token);
    }
    else if (operatorPriority[token] <= operatorPriority[stackOperators[stackOperators.length - 1]]) {
        calculateTopNumbers();
        checkOperator(token);
    } 
}

function expressionCalculator(expr) {

    checkPair(expr);

    stackNumbers = [];
    stackOperators = [];
    let str = expr.replace(/\s+/g,'');
    arrayOfTokens = str.split(/(\D)/);

    for (let token of arrayOfTokens) { 
        if (token.length === 0)
            continue;

        if (!isNaN(token)) {
            stackNumbers.push(parseFloat(token));
        }
        else {
            checkOperator(token);
        }
    }
    while (stackOperators.length != 0) {
        calculateTopNumbers();
    }
    let result = stackNumbers.pop();
    return result;
}

module.exports = {
    expressionCalculator
}