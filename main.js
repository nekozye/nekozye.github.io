function generate6dRandom() {
    return Math.floor((Math.random() * 6));
}

function createConstDice(type, selection) {

    const diceSet = {
        "equals": ["=", "=", "=", "=", "=", "="],
        "parentheses": ["(", "(", "(", ")", ")", ")"],
    }

    const dice = document.createElement("div")

    dice.classList.add("dice");
    dice.classList.add("black-bkg");
    dice.classList.add(type + "-dice");

    const character = document.createElement("div");
    character.classList.add("dice-char");
    character.style.setProperty("--top", "50%")
    character.style.setProperty("--left", "50%")
    character.innerHTML = diceSet[type][selection];

    dice.appendChild(character);

    return dice;
}

function createPlaceHolderDice(color) {
    const dice = document.createElement("div");

    dice.classList.add("dice");
    dice.classList.add(color+"-placeholder-bkg");

    return dice;
}

function createNumericalDice(type, selection) {

    const diceSet = {
        "even": ["2", "2", "4", "4", "6", "6"],
        "odd": ["3", "3", "5", "5", "7", "7"],
        "even-odd": ["2", "3", "4", "5", "6", "7"],
        "8-9-10": ["8", "8", "9", "9", "10", "10"],
        "mult-10": ["20", "30", "40", "50", "60", "100"],
        "fractions": ["1/2", "1/2", "1/3", "1/3", "1/4", "1/4"]
    }

    const dice = document.createElement("div")

    dice.classList.add("dice");
    dice.classList.add("white-bkg");
    dice.classList.add(type + "-dice");

    const character = document.createElement("div");
    character.classList.add("dice-char");
    character.style.setProperty("--top", "50%")
    character.style.setProperty("--left", "50%")

    character.innerHTML = diceSet[type][selection];
    dice.appendChild(character);

    return dice;
}

function createOperatorDice(type, selection) {

    const diceSet = {
        "plusminus": ["+", "+", "+", "-", "-", "-"],
        "multdiv": ["×", "×", "×", "÷", "÷", "÷"],
        "mixedop1": ["+", "+", "-", "-", "×", "÷"],
        "mixedop2": ["+", "-", "×", "×", "÷", "÷"],
        "special": ["√", "3√", "^", "^2", "^3", "!"],
    }

    const dice = document.createElement("div")

    dice.classList.add("dice");
    dice.classList.add("red-bkg");
    dice.classList.add(type + "-dice");

    const character = document.createElement("div");
    character.classList.add("dice-char");
    character.style.setProperty("--top", "50%")
    character.style.setProperty("--left", "50%")

    character.innerHTML = diceSet[type][selection];
    dice.appendChild(character);

    return dice;
}

function getRandomConstDiceSet(container) {
    container.innerHTML = "";

    const eqDice = createConstDice("equals", generate6dRandom());
    container.appendChild(eqDice);

    const randparenth = generate6dRandom()
    const parenth1Dice = createConstDice("parentheses", randparenth);
    container.appendChild(parenth1Dice);
    const parenth2Dice = createConstDice("parentheses", (5 - randparenth));
    container.appendChild(parenth2Dice);
}

function getRandomNumericalDiceSet(container, enable_advanced) {
    container.innerHTML = "";

    const evenDice = createNumericalDice("even", generate6dRandom());
    container.appendChild(evenDice);

    const oddDice = createNumericalDice("odd", generate6dRandom());
    container.appendChild(oddDice);

    const oddeven = createNumericalDice("even-odd", generate6dRandom());
    container.appendChild(oddeven);

    const eightnineten = createNumericalDice("8-9-10", generate6dRandom());
    container.appendChild(eightnineten);

    if (enable_advanced) {
        const mult10 = createNumericalDice("mult-10", generate6dRandom());
        container.appendChild(mult10);

        const fractions = createNumericalDice("fractions", generate6dRandom());
        container.appendChild(fractions);
    }

    else {
        const placeHolder1 = createPlaceHolderDice("white");
        container.appendChild(placeHolder1);

        const placeHolder2 = createPlaceHolderDice("white");
        container.appendChild(placeHolder2);
    }
}


function getRandomOperatorDiceSet(container, enable_advanced) {
    container.innerHTML = "";

    const plmnDice = createOperatorDice("plusminus", generate6dRandom());
    container.appendChild(plmnDice);

    const multDivDice = createOperatorDice("multdiv", generate6dRandom());
    container.appendChild(multDivDice);

    const mixedop1Dice = createOperatorDice("mixedop1", generate6dRandom());
    container.appendChild(mixedop1Dice);

    const mixedop2Dice = createOperatorDice("mixedop2", generate6dRandom());
    container.appendChild(mixedop2Dice);

    if (enable_advanced){
        const specialDice1 = createOperatorDice("special", generate6dRandom());
        container.appendChild(specialDice1);

        const specialDice2 = createOperatorDice("special", generate6dRandom());
        container.appendChild(specialDice2);
    }
    else{
        const placeHolder1 = createPlaceHolderDice("red");
        container.appendChild(placeHolder1);

        const placeHolder2 = createPlaceHolderDice("red");
        container.appendChild(placeHolder2);
    }



}

document.querySelector(".toggle-highgrade").checked = false;


const diceSound = new Audio('./assets/sound/diceroll.mp3');

const constantDiceContainer = document.querySelector(".constant-dices");

getRandomConstDiceSet(constantDiceContainer);

const numericalDiceContainer = document.querySelector(".numerical-dices");

getRandomNumericalDiceSet(numericalDiceContainer, false);

const operatorDiceContainers = document.querySelector(".operator-dices");

getRandomOperatorDiceSet(operatorDiceContainers, false);

const btnRollDice = document.querySelector(".btn-roll-dice");


btnRollDice.addEventListener("click", () => {

    let display_temp_storage = btnRollDice.style.display;

    let enable_advanced_dice = document.querySelector(".toggle-highgrade").checked;


    btnRollDice.style.display = 'none';

    const interval = setInterval(() => {
        getRandomConstDiceSet(constantDiceContainer);
        getRandomNumericalDiceSet(numericalDiceContainer, enable_advanced_dice);
        getRandomOperatorDiceSet(operatorDiceContainers, enable_advanced_dice);
    }, 50);

    diceSound.currentTime = 0;
    diceSound.play();

    setTimeout(() => {
        clearInterval(interval)
        btnRollDice.style.display = display_temp_storage;
    }, 1000)
})