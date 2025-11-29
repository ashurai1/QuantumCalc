// ===================================
// CALCULATOR STATE
// ===================================
const calculator = {
    expression: '',
    result: '0',
    memory: 0,
    history: [],
    lastAnswer: 0,
    soundEnabled: true
};

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
    expression: document.getElementById('expression'),
    result: document.getElementById('result'),
    display: document.querySelector('.display'),
    copyBtn: document.getElementById('copyBtn'),
    themeToggle: document.getElementById('themeToggle'),
    soundToggle: document.getElementById('soundToggle'),
    historyPanel: document.getElementById('historyPanel'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    modeToggle: document.getElementById('modeToggle'),
    historyBtn: document.getElementById('historyBtn'),
    scientificButtons: document.getElementById('scientificButtons'),
    buttons: document.querySelectorAll('.btn')
};

// ===================================
// SOUND EFFECTS
// ===================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create click sound using Web Audio API
function playClickSound() {
    if (!calculator.soundEnabled) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
        console.log('Sound playback failed:', error);
    }
}

// ===================================
// CONSTANTS
// ===================================
const CONSTANTS = {
    π: Math.PI,
    e: Math.E
};

// ===================================
// EXPRESSION PARSER & EVALUATOR
// ===================================
class ExpressionEvaluator {
    constructor() {
        this.operators = {
            '+': { precedence: 1, associativity: 'L' },
            '-': { precedence: 1, associativity: 'L' },
            '×': { precedence: 2, associativity: 'L' },
            '÷': { precedence: 2, associativity: 'L' },
            '^': { precedence: 3, associativity: 'R' }
        };
    }

    // Tokenize the expression
    tokenize(expr) {
        const tokens = [];
        let number = '';

        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];

            if (char === ' ') continue;

            if (char >= '0' && char <= '9' || char === '.') {
                number += char;
            } else {
                if (number) {
                    tokens.push(parseFloat(number));
                    number = '';
                }
                tokens.push(char);
            }
        }

        if (number) {
            tokens.push(parseFloat(number));
        }

        return tokens;
    }

    // Convert infix to postfix using Shunting-yard algorithm
    infixToPostfix(tokens) {
        const output = [];
        const stack = [];

        for (let token of tokens) {
            if (typeof token === 'number') {
                output.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                stack.pop(); // Remove '('
            } else if (this.operators[token]) {
                while (
                    stack.length &&
                    this.operators[stack[stack.length - 1]] &&
                    ((this.operators[token].associativity === 'L' &&
                        this.operators[token].precedence <= this.operators[stack[stack.length - 1]].precedence) ||
                        (this.operators[token].associativity === 'R' &&
                            this.operators[token].precedence < this.operators[stack[stack.length - 1]].precedence))
                ) {
                    output.push(stack.pop());
                }
                stack.push(token);
            }
        }

        while (stack.length) {
            output.push(stack.pop());
        }

        return output;
    }

    // Evaluate postfix expression
    evaluatePostfix(postfix) {
        const stack = [];

        for (let token of postfix) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();

                switch (token) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '×': stack.push(a * b); break;
                    case '÷':
                        if (b === 0) throw new Error('Division by zero');
                        stack.push(a / b);
                        break;
                    case '^': stack.push(Math.pow(a, b)); break;
                }
            }
        }

        return stack[0];
    }

    // Main evaluate function
    evaluate(expr) {
        try {
            // Replace constants
            expr = expr.replace(/π/g, Math.PI.toString());
            expr = expr.replace(/e/g, Math.E.toString());

            const tokens = this.tokenize(expr);
            const postfix = this.infixToPostfix(tokens);
            const result = this.evaluatePostfix(postfix);

            if (!isFinite(result)) {
                throw new Error('Invalid result');
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}

const evaluator = new ExpressionEvaluator();

// ===================================
// CALCULATOR FUNCTIONS
// ===================================

// Apply scientific function
function applyFunction(func, value) {
    switch (func) {
        case 'sin': return Math.sin(value);
        case 'cos': return Math.cos(value);
        case 'tan': return Math.tan(value);
        case 'log': return Math.log10(value);
        case 'ln': return Math.log(value);
        case 'sqrt':
            if (value < 0) throw new Error('Invalid input');
            return Math.sqrt(value);
        case 'x²': return Math.pow(value, 2);
        case 'x³': return Math.pow(value, 3);
        case '!':
            if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid input');
            return factorial(value);
        default: return value;
    }
}

// Calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    if (n > 170) throw new Error('Number too large');
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Format number for display
function formatNumber(num) {
    if (typeof num !== 'number' || !isFinite(num)) return num;

    // Round to 10 decimal places to avoid floating point errors
    num = Math.round(num * 10000000000) / 10000000000;

    // Use scientific notation for very large or small numbers
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
    }

    return num.toString();
}

// ===================================
// DISPLAY MANAGEMENT
// ===================================
function updateDisplay() {
    elements.expression.textContent = calculator.expression || '';
    elements.result.textContent = calculator.result;
    elements.display.classList.remove('error');
}

function showError(message) {
    calculator.result = message;
    elements.display.classList.add('error');
    updateDisplay();

    setTimeout(() => {
        calculator.result = '0';
        updateDisplay();
    }, 2000);
}

// ===================================
// INPUT HANDLING
// ===================================
function handleNumberInput(value) {
    calculator.expression += value;
    updateDisplay();
}

function handleOperatorInput(operator) {
    if (calculator.expression === '' && operator === '-') {
        calculator.expression = '-';
    } else if (calculator.expression !== '') {
        calculator.expression += operator;
    }
    updateDisplay();
}

function handleFunctionInput(func) {
    switch (func) {
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
            calculator.expression += func + '(';
            break;
        case 'x²':
        case 'x³':
        case '!':
            if (calculator.expression) {
                try {
                    const currentValue = evaluator.evaluate(calculator.expression);
                    const result = applyFunction(func, currentValue);
                    calculator.expression = formatNumber(result);
                } catch (error) {
                    showError('Error');
                }
            }
            break;
        case 'x^y':
            calculator.expression += '^';
            break;
        case '%':
            if (calculator.expression) {
                try {
                    const currentValue = evaluator.evaluate(calculator.expression);
                    calculator.expression = formatNumber(currentValue / 100);
                } catch (error) {
                    showError('Error');
                }
            }
            break;
        case '+/-':
            if (calculator.expression) {
                try {
                    const currentValue = evaluator.evaluate(calculator.expression);
                    calculator.expression = formatNumber(-currentValue);
                } catch (error) {
                    showError('Error');
                }
            }
            break;
    }
    updateDisplay();
}

function handleConstantInput(constant) {
    calculator.expression += constant;
    updateDisplay();
}

function handleEquals() {
    if (!calculator.expression) return;

    try {
        // Process functions in the expression
        let expr = calculator.expression;

        // Handle scientific functions
        const funcRegex = /(sin|cos|tan|log|ln|sqrt)\(([^)]+)\)/g;
        expr = expr.replace(funcRegex, (match, func, value) => {
            try {
                const numValue = evaluator.evaluate(value);
                return applyFunction(func, numValue);
            } catch (e) {
                throw new Error('Invalid function input');
            }
        });

        const result = evaluator.evaluate(expr);
        calculator.lastAnswer = result;
        calculator.result = formatNumber(result);

        // Add to history
        addToHistory(calculator.expression, calculator.result);

        calculator.expression = '';
        updateDisplay();
    } catch (error) {
        showError('Error');
    }
}

function handleClear() {
    calculator.expression = '';
    calculator.result = '0';
    updateDisplay();
}

function handleBackspace() {
    calculator.expression = calculator.expression.slice(0, -1);
    updateDisplay();
}

// ===================================
// MEMORY OPERATIONS
// ===================================
function handleMemory(action) {
    try {
        const currentValue = calculator.expression ?
            evaluator.evaluate(calculator.expression) :
            parseFloat(calculator.result);

        switch (action) {
            case 'mc':
                calculator.memory = 0;
                break;
            case 'mr':
                calculator.expression = formatNumber(calculator.memory);
                updateDisplay();
                break;
            case 'm+':
                calculator.memory += currentValue;
                break;
            case 'm-':
                calculator.memory -= currentValue;
                break;
        }
    } catch (error) {
        showError('Error');
    }
}

// ===================================
// HISTORY MANAGEMENT
// ===================================
function addToHistory(expression, result) {
    const historyItem = { expression, result, timestamp: Date.now() };
    calculator.history.unshift(historyItem);

    // Limit history to 50 items
    if (calculator.history.length > 50) {
        calculator.history.pop();
    }

    saveHistory();
    renderHistory();
}

function renderHistory() {
    if (calculator.history.length === 0) {
        elements.historyList.innerHTML = '<p class="empty-history">No calculations yet</p>';
        return;
    }

    elements.historyList.innerHTML = calculator.history.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="expression">${item.expression}</div>
            <div class="result">${item.result}</div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const historyItem = calculator.history[index];
            calculator.expression = historyItem.expression;
            updateDisplay();
            toggleHistory();
        });
    });
}

function clearHistory() {
    if (calculator.history.length === 0) return;

    if (confirm('Clear all history?')) {
        calculator.history = [];
        saveHistory();
        renderHistory();
    }
}

function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(calculator.history));
}

function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        calculator.history = JSON.parse(saved);
        renderHistory();
    }
}

function toggleHistory() {
    elements.historyPanel.classList.toggle('active');
}

// ===================================
// SOUND MANAGEMENT
// ===================================
function toggleSound() {
    calculator.soundEnabled = !calculator.soundEnabled;
    localStorage.setItem('soundEnabled', calculator.soundEnabled);

    // Play a sound to confirm the toggle (if enabling)
    if (calculator.soundEnabled) {
        playClickSound();
    }
}

function loadSound() {
    const savedSound = localStorage.getItem('soundEnabled');
    calculator.soundEnabled = savedSound === null ? true : savedSound === 'true';
    elements.soundToggle.checked = calculator.soundEnabled;
}

// ===================================
// MODE TOGGLE (Basic/Scientific)
// ===================================
function toggleMode() {
    const scientificButtons = elements.scientificButtons;
    const modeToggle = elements.modeToggle;
    const isActive = scientificButtons.classList.contains('active');

    if (isActive) {
        scientificButtons.classList.remove('active');
        modeToggle.classList.remove('active');
        localStorage.setItem('calculatorMode', 'basic');
    } else {
        scientificButtons.classList.add('active');
        modeToggle.classList.add('active');
        localStorage.setItem('calculatorMode', 'scientific');
    }
}

function loadMode() {
    const savedMode = localStorage.getItem('calculatorMode') || 'basic';

    if (savedMode === 'scientific') {
        elements.scientificButtons.classList.add('active');
        elements.modeToggle.classList.add('active');
    }
}

// ===================================
// THEME MANAGEMENT
// ===================================
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');

    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;

    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme + '-theme');

    elements.themeToggle.checked = savedTheme === 'light';
}

// ===================================
// COPY TO CLIPBOARD
// ===================================
function copyToClipboard() {
    const textToCopy = calculator.result;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<span style="font-size: 14px;">✓</span>';

        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ===================================
// BUTTON CLICK HANDLERS
// ===================================
function handleButtonClick(button) {
    const action = button.dataset.action;
    const value = button.dataset.value;
    const func = button.dataset.function;

    // Play click sound
    playClickSound();

    // Add pressed effect
    button.classList.add('pressed');
    setTimeout(() => button.classList.remove('pressed'), 150);

    if (action) {
        switch (action) {
            case 'clear': handleClear(); break;
            case 'backspace': handleBackspace(); break;
            case 'equals': handleEquals(); break;
            case 'mc':
            case 'mr':
            case 'm+':
            case 'm-':
                handleMemory(action);
                break;
            case 'history': toggleHistory(); break;
        }
    } else if (value) {
        if (button.classList.contains('number') || value === '.') {
            handleNumberInput(value);
        } else if (button.classList.contains('operator')) {
            handleOperatorInput(value);
        } else if (button.classList.contains('constant')) {
            handleConstantInput(value);
        }
    } else if (func) {
        handleFunctionInput(func);
    }
}

// ===================================
// KEYBOARD INPUT
// ===================================
function handleKeyboardInput(e) {
    const key = e.key;

    // Prevent default for calculator keys
    if ('0123456789.+-*/()'.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        e.preventDefault();
    }

    // Find corresponding button and trigger visual effect
    let targetButton = null;

    if (key >= '0' && key <= '9') {
        targetButton = Array.from(elements.buttons).find(btn =>
            btn.dataset.value === key && btn.classList.contains('number')
        );
        handleNumberInput(key);
    } else if (key === '.') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '.');
        handleNumberInput('.');
    } else if (key === '+') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '+');
        handleOperatorInput('+');
    } else if (key === '-') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '-');
        handleOperatorInput('-');
    } else if (key === '*') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '×');
        handleOperatorInput('×');
    } else if (key === '/') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '÷');
        handleOperatorInput('÷');
    } else if (key === '(') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === '(');
        handleOperatorInput('(');
    } else if (key === ')') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.value === ')');
        handleOperatorInput(')');
    } else if (key === 'Enter') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.action === 'equals');
        handleEquals();
    } else if (key === 'Escape') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.action === 'clear');
        handleClear();
    } else if (key === 'Backspace') {
        targetButton = Array.from(elements.buttons).find(btn => btn.dataset.action === 'backspace');
        handleBackspace();
    }

    // Visual feedback for keyboard press
    if (targetButton) {
        targetButton.classList.add('pressed');
        setTimeout(() => targetButton.classList.remove('pressed'), 150);
    }
}

// ===================================
// EVENT LISTENERS
// ===================================
function initEventListeners() {
    // Button clicks
    elements.buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });

    // Copy button
    elements.copyBtn.addEventListener('click', copyToClipboard);

    // Theme toggle
    elements.themeToggle.addEventListener('change', toggleTheme);

    // Sound toggle
    elements.soundToggle.addEventListener('change', toggleSound);

    // Mode toggle
    elements.modeToggle.addEventListener('click', toggleMode);

    // History button
    elements.historyBtn.addEventListener('click', toggleHistory);

    // Clear history
    elements.clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard input
    document.addEventListener('keydown', handleKeyboardInput);

    // Close history panel when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.historyPanel.classList.contains('active') &&
            !elements.historyPanel.contains(e.target) &&
            !elements.historyBtn.contains(e.target)) {
            toggleHistory();
        }
    });
}

// ===================================
// INITIALIZATION
// ===================================
function init() {
    loadTheme();
    loadSound();
    loadMode();
    loadHistory();
    initEventListeners();
    updateDisplay();
}

// Start the calculator
init();
