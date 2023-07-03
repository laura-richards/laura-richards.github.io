console.log('Welcome to Tic-Tac-Toe! Enjoy!')

let cells = document.getElementsByTagName('td')
let noughtsTurn = whoStarts()
let subtitle = document.getElementById('subtitle')
let gameIsOver
let stalemate
let button = document.getElementById('restart')
let totalsdisplay = document.getElementById('totals')
let totals = {
  X: 0,
  O: 0,
}

for (let i = 0; i < cells.length; i++) {
  onclick = cellClicked
}
//Start with random x or o
//function to choose start player
function whoStarts() {
  randomNum = Math.floor(Math.random() * 2)
  return randomNum === 0 ? true : false
}

// function for handling clicks on cells
function cellClicked(e) {
  let cell = e.target
  let symbol = noughtsTurn === true ? 'O' : 'X'
  if (cell.innerHTML === '') {
    cell.innerHTML = symbol
    checkForStalemate(cells)
    checkForWin(symbol)
    if (!gameIsOver && !stalemate) {
      nextPlayersTurn(symbol)
    } else if (!gameIsOver && stalemate) {
      subtitle.textContent = `Its a Stalemate`
      button.textContent = `Play Again?`
    } else if (gameIsOver) {
      endGame(symbol)
      addWin(symbol)
      displaytotals(totals)
    }
  }
}

// function to check if current player wins
function checkForWin(symbol) {
  // HORIZONTAL LINES //
  if (
    cells[0].innerHTML == symbol &&
    cells[1].innerHTML == symbol &&
    cells[2].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[3].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[5].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[6].innerHTML == symbol &&
    cells[7].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  // VERTICAL LINES //
  else if (
    cells[0].innerHTML == symbol &&
    cells[3].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[1].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[7].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[2].innerHTML == symbol &&
    cells[5].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  // DIAGONAL LINES
  else if (
    cells[0].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[2].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  )
    gameIsOver = true
}

// function for next turn
function nextPlayersTurn(symbol) {
  noughtsTurn = !noughtsTurn
  symbol = noughtsTurn === true ? 'O' : 'X'
  subtitle.textContent = `It is now ${symbol}'s turn`
}

// function for when there is a winner-declares winner and stops adding more
function endGame(symbol) {
  subtitle.textContent = `${symbol} is the Winner!`
  button.textContent = `Play Again?`
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      cells[i].innerHTML = ' '
    }
  }
}

//function for if there is a stalemate
function checkForStalemate(cells) {
  let count = 0
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML !== '') {
      count += 1
    }
  }
  if (count === 9) {
    stalemate = true
  }
}

//function to restart the game
function restartGame() {
  noughtsTurn = whoStarts()
  symbol = noughtsTurn === true ? '0' : 'X'
  subtitle.textContent = `Let's Start again, it is ${symbol}'s turn`
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = ''
  }
  gameIsOver = false
  stalemate = false
}

//Function to Update win totals
function addWin(symbol) {
  totals[symbol]++
}

//Function to display the totals
function displaytotals(totals) {
  totalsdisplay.textContent = `Wins X: ${totals.X} O: ${totals.O}`
}

//Function to reset the totals
function resetTotals() {
  totals.O = 0
  totals.X = 0
  displaytotals(totals)
}
