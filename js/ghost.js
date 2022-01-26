"use strict";
const GHOST = "&#9781;";

var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    color: getRandomColor(),
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  //model
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function removeGhostByPos(pos) {
  var currGhost;
  for (var i = 0; i < gGhosts.length; i++) {
    currGhost = gGhosts[i];


    if (pos.i === currGhost.location.i && pos.j === currGhost.location.j) {

      if (currGhost.currCellContent === FOOD) { gFoodCounter-- }
      gGhosts.splice(i, 1);
    }
  }
}
// 3 ghosts and an interval
function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
  if (gGame.isOn === false) return
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}
function moveGhost(ghost) {
  // figure out moveDiff, nextLocation, nextCell
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

  // return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === GHOST) return;
  // hitting a pacman?  call gameOver
  if (nextCellContent === PACMAN && gSuperPacman === false) {
    //console.log("One of the ghosts caught you!");
    gameOver("One of the ghost caught you!");
    return;
  }
  if (nextCellContent === PACMAN && gSuperPacman === true) {
    console.log("ghost hit pacman!");
    var currPos = { i: ghost.location.i, j: ghost.location.j };

    console.log("killed ghost");
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);

    removeGhostByPos(currPos);
    return;
  }

  // update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // Move the ghost
  ghost.location = nextLocation;
  ghost.currCellContent = nextCellContent;
  // update the model
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {

    if (gSuperPacman === true) {
        return `<span style="color:blue">${GHOST}</span>`;
    }
  return `<span style="color:${ghost.color}">${GHOST}</span>`;
}
