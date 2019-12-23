// Variables
let selectedColor = "rgb(0, 0, 255)";
let notSelectedColor = "rgb(255, 255, 255)";
let runGame = false;
let inputs = document.getElementsByTagName("input");
inputs.namedItem("gameHeight").value = 10;
inputs.namedItem("gameWidth").value = 10;
let height = inputs.namedItem("gameHeight").value;
let width = inputs.namedItem("gameWidth").value;
var gameField = document.getElementById("gamefield");
window.onresize = handleWindowSizeChnaged;

// initliaze the first game field
CreateGamefield();
var validadorPhase = true;

function CreateGamefield() {
    let inputs = document.getElementsByTagName("input");
    height = inputs.namedItem("gameHeight").value;
    width = inputs.namedItem("gameWidth").value;
    let windowWidth = document.documentElement.clientWidth / 2;
    let windowHeight = document.documentElement.clientHeight / 2;
    let buttonWidth = windowWidth / width;
    let buttonHeight = windowHeight / height;

    if (width < 10) {
        console.log("Die Breite kann nicht kleienr als 10 sein.");
        width = 10;
    }

    if (width > 100) {
        console.log("Die Breite kann nicht größer als 100 sein.");
        width = 100;
    }

    if (height < 10) {
        console.log("Die Höhe kann nicht kleiner als 10 sein.");
        height = 10;
    }

    if (height > 100) {
        console.log("Die Höhe kann nicht größer0 als 10 sein.");
        height = 100;
    }

    var x = document.getElementById("gamefield");
    while (x.childNodes.item(0)) {
        x.removeChild(x.childNodes.item(0));
    }

    gameField = new Array(height);
    document.getElementById("gamefield").style.margin = "0px";
    for (let i = 0; i < height; i++) {
        gameField[i] = new Array(width);
        let myDiv = document.createElement("div");
        myDiv.style.margin = "0px";
        myDiv.style.padding = "0px";
        myDiv.style.border = "0px";
        myDiv.style.height = (window.innerHeight * 0.75 / height) + "px";
        for (let j = 0; j < width; j++) {
            var button = document.createElement("button");
            button.style.height = (window.innerHeight * 0.75 / height) + "px";
            button.style.width = (window.innerWidth * 0.75 / width) + "px";
            button.style.backgroundColor = notSelectedColor;
            button.style.padding = "0px";
            button.style.margin = "0px";
            button.onclick = onSelection;
            gameField[i][j] = button;
            myDiv.appendChild(gameField[i][j]);
        }

        gamefield = document.getElementById("gamefield").appendChild(myDiv);
    }

    validadorPhase = true;
}

function handleWindowSizeChnaged() {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            document.getElementById("gamefield").style.height = (window.innerHeight * 0.75 / height) + "px";
            gameField[j][i].style.height = (window.innerHeight * 0.75 / height) + "px";
            gameField[j][i].style.width = (window.innerWidth * 0.75 / width) + "px";
        }
    }
}

function onSelection() {
    if (validadorPhase) {
        if (this.style.backgroundColor === notSelectedColor) {
            this.style.backgroundColor = selectedColor;
        }
        else if (this.style.backgroundColor === selectedColor) {
            this.style.backgroundColor = notSelectedColor;
        }
    }
}

function stopGameOfLife() {
    if (runGame) {
        runGame = false;
    }
}

function startGameOfLife() {
    runGame = true;
    playGameOfLife();
}

function playGameOfLife() {
    if (runGame) {
        nextGeneration();
        setTimeout(playGameOfLife, 100);
    }
    else {
        return;
    }
}

function clearGamefield() {
    if (validadorPhase == false) {
        validadorPhase = true;
    }

    if (runGame) {
        runGame = false;
    }

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            gameField[j][i].style.backgroundColor = notSelectedColor;
        }
    }
}

function nextGeneration() {
    if (validadorPhase == true) {
        validadorPhase = false;
    }

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var amountNeighbours = getNeighbors(j,i,height,width);
            if (gameField[j][i].style.backgroundColor == selectedColor) {
                if (amountNeighbours < 2) {
                    gameField[j][i].style.backgroundColor = notSelectedColor;
                }
                else if (amountNeighbours == 2 || amountNeighbours == 3) {
                    gameField[j][i].style.backgroundColor = selectedColor;
                }
                else if (amountNeighbours > 3) {
                    gameField[j][i].style.backgroundColor = notSelectedColor;
                }
            }
            else if (gameField[j][i].style.backgroundColor == notSelectedColor && amountNeighbours == 3) {
                gameField[j][i].style.backgroundColor = selectedColor;
            }
        }
    }
}

function getNeighbors(row, column, amountRows, amountCols) {
    var counter = 0;
    if (row - 1 >= 0 && gameField[row - 1][column].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (row - 1 >= 0 && column - 1 >= 0 && gameField[row - 1][column - 1].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (row - 1 >= 0 && column + 1 < amountCols && gameField[row - 1][column + 1].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (column - 1 >= 0 && gameField[row][column - 1].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (column + 1 < amountCols && gameField[row][column + 1].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (row + 1 < amountRows && gameField[row + 1][column].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (row + 1 < amountRows && column - 1 >= 0 && gameField[row + 1][column - 1].style.backgroundColor == selectedColor) {
        counter++;
    }

    if (row + 1 < amountRows && column + 1 < amountCols && gameField[row + 1][column + 1].style.backgroundColor == selectedColor) {
        counter++;
    }
    return counter;
}