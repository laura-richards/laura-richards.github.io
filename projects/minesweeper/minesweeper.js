document.addEventListener('DOMContentLoaded', setUpGame)

// Define your `board` object here!
const board = {
  cells: [],
}

// Variables

const size = {
  small: 4,
  medium: 5,
  large: 6,
}
let rows
let cols
let difficultySelected

const difficulty = {
  easy: 0.1,
  medium: 0.2,
  hard: 0.3,
  stiff: 0.5,
}

// Set up page
function setUpGame() {
  const startButton = document.getElementById('start_btn')
  const sizeSelector = document.getElementById('size')
  const difficultySelector = document.getElementById('difficulty')
  lib.displayMessage('How would you like play?')
  startButton.addEventListener('click', startGame)
  difficultySelector.innerHTML = `<label>Choose a difficulty:</label><select id="diff_Input"><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select>`
  sizeSelector.innerHTML = `<label>Choose a size:</label><select id="size_input"><option value= 'small'>Small</option><option value='medium'>Medium</option><option value='large'>Large</option></select>`
}

//creating mine list
// mineList = createMineList()
function createMineList(diff, size) {
  let boardSize = size * size
  let numberOfMines = Math.floor(boardSize * diff)
  let mineList = []
  for (let m = 0; m < numberOfMines; m++) {
    mine = Math.floor(Math.random() * boardSize)
    if (mineList.includes(mine)) {
      mine = Math.floor(Math.random() * boardSize)
    }
    mineList.push(mine)
  }
  return mineList
}

//function to add mines on set up
function addMines(i) {
  if (mineList.includes(i)) {
    return true
  } else {
    return false
  }
}

//function for starting the game
function startGame() {
  const sizeInput = document.getElementById('size_input')
  const diffInput = document.getElementById('diff_Input')
  const sizePicked = size[sizeInput.value]
  const difficultySelected = difficulty[diffInput.value]
  let boardSize = sizePicked
  mineList = createMineList(difficultySelected, sizePicked)
  let i = 0
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      let cell = { row: r, col: c, isMine: addMines(i), hidden: true }
      board.cells.push(cell)
      i++
    }
  }
  for (let c = 0; c < board.cells.length; c++) {
    const cell = board.cells[c]
    let numOfMines = countSurroundingMines(cell)
    cell['surroundingMines'] = numOfMines
  }
  document.addEventListener('click', () => checkForWin())
  document.addEventListener('contextmenu', () => checkForWin())
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (let c = 0; c < board.cells.length; c++) {
    const cell = board.cells[c]
    if (!cell.isMine && cell.hidden) {
      return
    }
    if (cell.isMine && !cell.isMarked) {
      return
    }
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
  let startButton = document.getElementById('start_btn')
  startButton.removeEventListener('click', startGame)
  startButton.textContent = 'refresh to play again'
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//

//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  let count = 0
  const surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count++
    }
  }
  return count
}
