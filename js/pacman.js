"use strict";
const PACMAN = "😷";

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (gGame.isOn === false) return
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  // return if cannot move
  if (nextCellContent === WALL) return;
  // hitting a ghost?  call gameOver
  if (nextCellContent === GHOST) {
    if (gSuperPacman === true) {
        console.log("you ate ghost");
        removeGhostByPos(nextLocation)
    }
    if (gSuperPacman === false) {
    console.log("One of the ghosts caught you!");
      gameOver("One of the ghost caught you!");
      return;
    }
  }
  if (nextCellContent === FOOD) {
    updateScore(1);
    gFoodCounter--;
    console.log("one point");
    console.log("remaining food", gFoodCounter);
    if (gFoodCounter === 0) {
      gameOver("won!");
    }
  }
  if (nextCellContent === CHERRY) {
    console.log("cherry, 10 points");
    updateScore(10);
  }
  
  if ((nextCellContent === SUPER_FOOD) && (gSuperPacman === true)) {
      return;
  }
  if ((nextCellContent === SUPER_FOOD) && (gSuperPacman !== true)) {
    gSuperPacman = true;
    startSuperPacman();
  }
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);
  // Move the pacman
  gPacman.location = nextLocation;
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // update the DOM
  renderCell(gPacman.location, getPacManHTML(PACMAN));
}

function startSuperPacman() {
  console.log("You are now super pacman");
  setTimeout(stopSuperPacman, 5000);
}

function stopSuperPacman() {

    gSuperPacman = false;
  console.log("Stopped super pacman");
}
function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // figure out nextLocation
  switch (ev.key) {
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
  }

  return nextLocation;
}

function getPacManHTML(PACMAN) {
    if (gSuperPacman === true) {
        return `<span class="colorsAnimation">${PACMAN}</span>`;
    }
    return `<span>${PACMAN}</span>`;
  }
