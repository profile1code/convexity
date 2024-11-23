/*
Tanush Ojha
Hw5 - CS290
5|7|2024
*/


let stack = []; // Stack for the buttons pressed
let buttons = []; // All Buttons
let lastClickedOp = false; // True if the last clicked button was an operator
let canClick = true; // A boolean to check if you can click a button
let op_done = 0; // Number of operations done
let newOp = true; // Boolean to tell the program that there is a new operation happening
let cantClickOp = true; // Boolean to check if you can click an operator button

function init_buttons() {
    buttons.forEach((btn) => {btn.enabled = true;}); // Set enabled status for each button

// Generate random number for each button
    buttons.forEach((btn) => {btn.textContent = 1 + Math.floor(Math.random() * 9);}); 
// Creates goal using each random number
    let goalNum = doRandMath(Number(button1.textContent), Number(button2.textContent));
    goalNum = doRandMath(Number(goalNum), Number(button3.textContent));
    goalNum = doRandMath(Number(goalNum), Number(button4.textContent));
    let goal = document.getElementById("goalNum");
    goal.textContent = goalNum;
}

function doRandMath(a, b) {
// Randomly chooses operation to do on two numbers
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return (a + b);
        case 1:
            return (a - b);
        case 2:
            return (a * b);
        case 3:
            return (b - a);
    }
}
function buttonClicked(button) {
// if the button is enabled or the program doesn't want a button to be
// clicked, don't do anything. 
    if (!canClick || !button.enabled) {
        return;
    }
    button.style.background='#ffc876'; // Changes the button background when clicked
    button.enabled = false; // Disables button
    stack.push(button); 
    canClick = false; 
    cantClickOp = false; 
// Does the operation if two numbers and an operator are selected
    if (lastClickedOp) {
        op_done++; // Another operation has been done, increment

        let b2 = stack.pop();
        let op = stack.pop(); 
        let b1 = stack.pop(); 

        let product = do_operation(b1, op, b2); // Does the operation that the user input
        let workArea = document.getElementById('history');
        workArea.innerText += "\n" + b1.textContent + " " + op.textContent + " " + 
                                    b2.textContent + " = " + product;
// Set button1's number and reset color and enable
        b1.textContent = product; 
        b1.style.background = '#ffebcd';
        b1.enabled = true;
// White out second button
        b2.style.background='#f0ffff';
        b2.textContent = '';

        op.style.background = '#5f9ea0'; // Reset operator button color
        canClick = true; 
        cantClickOp = true; 
        check_win(b1); // Check if the user won or lost
        
    }
    lastClickedOp = false; // Last clicked was an number
}

function operatorClicked(operator) {
// If the last button clicked was an operator, or the program 
// doesn't want to let the user click an operator, do nothing
    if (lastClickedOp || cantClickOp) { return; } 

    lastClickedOp = true; // Last clicked button was an operator
    operator.style.background='#264243'; // Change button color on click
    stack.push(operator);
    canClick = true; 
}

//do operation from buttons user clicked
//first button, operation to be done, second button
function do_operation(b1, op, b2) { 
    if (op.textContent === '+') {
        // console.log('Plus');
        return (Number(b1.textContent) + Number(b2.textContent));
    } 
    if (op.textContent === '-') {
        // console.log('minus');
        return (Number(b1.textContent) - Number(b2.textContent));
    }
    if (op.textContent === '*') {
        // console.log('mult');
        return (Number(b1.textContent) * Number(b2.textContent));
    }
    return;
}
// Checks win
function check_win(button) {
    if (op_done === 3) { // If 3 operations are done, check if the user won or lost
        if (Number(button.textContent) === Number(document.getElementById('goalNum').textContent)) {
            document.getElementById('Status').textContent = 'You Win!!!!';
            let wins = document.getElementById('winNum');
            wins.textContent = Number(wins.textContent) + 1;
        } else {
            document.getElementById('Status').textContent = 'You Lose :(';
            let loss = document.getElementById('lossNum');
            loss.textContent = Number(loss.textContent) + 1;
        }
        cantClickOp = true;
        canClick = false;
    }
}


function restart() { // Resets everything
    buttons.forEach((btn) => reset_button(btn)); // Reset button color
    
    init_buttons();
    document.getElementById('Status').textContent = 'Select a number';
    stack = [];
    lastClickedOp = false;
    canClick = true;
    op_done = 0;
    newOp = true;
    document.getElementById('history').innerText = '';
}
// Resets color of the button
function reset_button(button) {
    button.style.background='#ffebcd';
}

window.onload = init_buttons; // On the load of the window, start the game.
/*____________Declare buttons and make event listeners_____________*/
const button1 = document.getElementById('button1');
button1.addEventListener('click', () =>  {buttonClicked(button1);} );
buttons.push(button1);

const button2 = document.getElementById('button2');
button2.addEventListener('click', () =>  {buttonClicked(button2);} );
buttons.push(button2);

const button3 = document.getElementById('button3');
button3.addEventListener('click', () =>  {buttonClicked(button3);} );
buttons.push(button3);

const button4 = document.getElementById('button4');
button4.addEventListener('click', () =>  {buttonClicked(button4);} );
buttons.push(button4);
/*_______________________________________________________________*/

/*_____________________Operator Buttons________________________*/
const addOp = document.getElementById('Plus');
addOp.addEventListener('click', () => {operatorClicked(addOp)});

const subOp = document.getElementById('Minus');
subOp.addEventListener('click', () => {operatorClicked(subOp)});

const mulOp = document.getElementById('Mult');
mulOp.addEventListener('click', () => {operatorClicked(mulOp)});
/*_______________________________________________________________*/

/*____________________New Game Button________________________*/
const newGame = document.getElementById('newGame');
newGame.addEventListener('click', () => {restart();})
/*_______________________________________________________________*/