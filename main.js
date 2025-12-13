function generate6dRandom() {
    return Math.floor((Math.random() * 6));
}

function returnPair(color, internals) {
    return [color,internals];
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

    var return_internals = [];

    const eqDice = createConstDice("equals", generate6dRandom());
    container.appendChild(eqDice);

    return_internals.push(returnPair("black",eqDice.innerHTML));


    const randparenth = generate6dRandom()
    const parenth1Dice = createConstDice("parentheses", randparenth);
    container.appendChild(parenth1Dice);
    return_internals.push(returnPair("black",parenth1Dice.innerHTML));
    
    const parenth2Dice = createConstDice("parentheses", (5 - randparenth));
    container.appendChild(parenth2Dice);
    return_internals.push(returnPair("black",parenth2Dice.innerHTML));

    return return_internals;

}

function getRandomNumericalDiceSet(container, enable_advanced) {
    container.innerHTML = "";

    var return_internals = [];

    const evenDice = createNumericalDice("even", generate6dRandom());
    container.appendChild(evenDice);
    return_internals.push(returnPair("white",evenDice.innerHTML));

    const oddDice = createNumericalDice("odd", generate6dRandom());
    container.appendChild(oddDice);
    return_internals.push(returnPair("white",oddDice.innerHTML));

    const oddeven = createNumericalDice("even-odd", generate6dRandom());
    container.appendChild(oddeven);
    return_internals.push(returnPair("white",oddeven.innerHTML));

    const eightnineten = createNumericalDice("8-9-10", generate6dRandom());
    container.appendChild(eightnineten);
    return_internals.push(returnPair("white",eightnineten.innerHTML));

    if (enable_advanced) {
        const mult10 = createNumericalDice("mult-10", generate6dRandom());
        container.appendChild(mult10);
        return_internals.push(returnPair("white",mult10.innerHTML));

        const fractions = createNumericalDice("fractions", generate6dRandom());
        container.appendChild(fractions);
        return_internals.push(returnPair("white",fractions.innerHTML));
    }

    else {
        const placeHolder1 = createPlaceHolderDice("white");
        container.appendChild(placeHolder1);

        const placeHolder2 = createPlaceHolderDice("white");
        container.appendChild(placeHolder2);
    }

    return return_internals;
}

function getRandomOperatorDiceSet(container, enable_advanced) {
    container.innerHTML = "";

    var return_internals = [];

    const plmnDice = createOperatorDice("plusminus", generate6dRandom());
    container.appendChild(plmnDice);
    return_internals.push(returnPair("red",plmnDice.innerHTML));

    const multDivDice = createOperatorDice("multdiv", generate6dRandom());
    container.appendChild(multDivDice);
    return_internals.push(returnPair("red",multDivDice.innerHTML));

    const mixedop1Dice = createOperatorDice("mixedop1", generate6dRandom());
    container.appendChild(mixedop1Dice);
    return_internals.push(returnPair("red",mixedop1Dice.innerHTML));

    const mixedop2Dice = createOperatorDice("mixedop2", generate6dRandom());
    container.appendChild(mixedop2Dice);
    return_internals.push(returnPair("red",mixedop2Dice.innerHTML));

    if (enable_advanced){
        const specialDice1 = createOperatorDice("special", generate6dRandom());
        container.appendChild(specialDice1);
        return_internals.push(returnPair("red",specialDice1.innerHTML));

        const specialDice2 = createOperatorDice("special", generate6dRandom());
        container.appendChild(specialDice2);
        return_internals.push(returnPair("red",specialDice2.innerHTML));
    }
    else{
        const placeHolder1 = createPlaceHolderDice("red");
        container.appendChild(placeHolder1);

        const placeHolder2 = createPlaceHolderDice("red");
        container.appendChild(placeHolder2);
    }

    return return_internals;


}

function getDiceListDiv(internal_html, list_display) {

    var holder = document.createElement("div");
    holder.classList.add("result-group");

    var numerical = document.createElement("div");
    numerical.classList.add("numerical_display");
    numerical.innerHTML = list_display;

    holder.appendChild(numerical);

    for(var i = 0; i < internal_html.length; i++){
        var dice = document.createElement("div");
        var color = internal_html[i][0];
        var innerhtml = internal_html[i][1];

        dice.innerHTML = innerhtml;
        dice.classList.add("dice-display");
        dice.classList.add(color+"-bkg");

        holder.appendChild(dice);
    }

    return holder;
}

document.querySelector(".toggle-highgrade").checked = false;

var current_result_tabular = 1;


const diceSound = new Audio('./assets/sound/diceroll.mp3');

const constantDiceContainer = document.querySelector(".constant-dices");

getRandomConstDiceSet(constantDiceContainer);

const numericalDiceContainer = document.querySelector(".numerical-dices");

getRandomNumericalDiceSet(numericalDiceContainer, false);

const operatorDiceContainers = document.querySelector(".operator-dices");

getRandomOperatorDiceSet(operatorDiceContainers, false);

const btnRollDice = document.querySelector(".btn-roll-dice");

const dice_result_holder = document.querySelector(".results-display");

btnRollDice.addEventListener("click", () => {

    let display_temp_storage = btnRollDice.style.display;

    let enable_advanced_dice = document.querySelector(".toggle-highgrade").checked;

    btnRollDice.style.display = 'none';

    let dice_results;

    const interval = setInterval(() => {
        dice_results = [];
        dice_results.push(...getRandomConstDiceSet(constantDiceContainer));
        dice_results.push(...getRandomNumericalDiceSet(numericalDiceContainer, enable_advanced_dice));
        dice_results.push(...getRandomOperatorDiceSet(operatorDiceContainers, enable_advanced_dice));
    }, 50);

    diceSound.currentTime = 0;
    diceSound.play();

    setTimeout(() => {

        clearInterval(interval)
        btnRollDice.style.display = display_temp_storage;

        dice_result_holder.appendChild(getDiceListDiv(dice_results,current_result_tabular++));
        console.log(dice_result_holder);

    }, 1000)
})