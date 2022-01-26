"use strict";
const WALL = "#";
const FOOD = ".";
const EMPTY = " ";
const SUPER_FOOD = "🏆";
const CHERRY = "🍒";
var gSuperPacman = false;
var gBoard;
var gCherryTimerID = null;
var gFreeCells = [];
var gFoodCounter = 0;
var gDeletedGhosts = [];
var gGame = {
  score: 0,
  isOn: false
};

function createRandomCherry() {
  if (gGame.isOn === false) return
  createFreeCells();
  gFreeCells = shuffleArray(gFreeCells);

  var freeCellLocation = gFreeCells.pop();
  var currCell = gBoard[freeCellLocation.i][freeCellLocation.j];

  if (currCell === FOOD || currCell === EMPTY) {
    // console.log("currCell",currCell);
    currCell = CHERRY;
    if (gBoard[freeCellLocation.i][freeCellLocation.j] === FOOD) {
      //console.log("cherry on food");
      gFoodCounter--;
    }
    gBoard[freeCellLocation.i][freeCellLocation.j] = CHERRY;
    renderCell(freeCellLocation, CHERRY);
    // console.log("freeCellLocation",freeCellLocation);
  }
}

//return free cells array
function createFreeCells() {
  gFreeCells = [];
  var cellLocation;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY || gBoard[i][j] === FOOD) {
        cellLocation = {
          i: i,
          j: j
        };
        gFreeCells.push(cellLocation);
      }
    }
  }
}

function foodCellsCount() {
  var cellCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD) {
        cellCount++;
      }
    }
  }
  return cellCount;
}
function init() {
  console.log("hello");
  gDeletedGhosts = [];
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  createSuperFood(gBoard);
  gFreeCells = [];
  gCherryTimerID = null;
  clearInterval(gCherryTimerID);
  printMat(gBoard, ".board-container");
  gGame.isOn = true;
  gSuperPacman = false;
  gCherryTimerID = setInterval(createRandomCherry,3000);
  closeModal();
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  gFoodCounter = 0;
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCounter++;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gFoodCounter--;
      }
    }
  }
  gFoodCounter--;

  console.log("gFoodCounter", gFoodCounter);
  return board;
}

function createSuperFood(gBoard) {
  gBoard[1][1] = SUPER_FOOD;
  gBoard[8][8] = SUPER_FOOD;
  gBoard[1][8] = SUPER_FOOD;
  gBoard[8][1] = SUPER_FOOD;
  gFoodCounter = gFoodCounter - 4;
}

// update model and dom
function updateScore(diff) {
  // model
  gGame.score += diff;

  //dom
  var elScore = document.querySelector("h2 span");
  elScore.innerText = gGame.score;
}

// TODO
function gameOver(text) {
  console.log("Game Over");
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  showModal(text);
  clearInterval(gCherryTimerID);
}
function showModal(text) {
  var modalEl = document.querySelector(".victoryModal");

  var textEl = modalEl.querySelector(".gameoverMassege");

  textEl.innerText = text;
  modalEl.style.display = "flex";
}

function closeModal() {
  var modalEl = document.querySelector(".victoryModal");

  modalEl.style.display = "none";
}

//return shuffled array
//V
function shuffleArray(arr) {
  var newArr = [];
  var randNum;
  var currValue;
  var oldLength = arr.length;
  for (var i = 0; i < oldLength; i++) {
    randNum = getRandomIntInclusive(0, arr.length - 1);
    currValue = arr[randNum];

    arr.splice(randNum, 1);
    newArr.push(currValue);
  }
  return newArr;
}
