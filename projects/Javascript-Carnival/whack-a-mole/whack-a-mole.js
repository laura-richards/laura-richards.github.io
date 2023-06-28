// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
import { getRandomNumber } from './random-number.js'
console.log('Whack-a-Mole!')

// Variables
let holes = document.getElementsByTagName('TD')
let springSound = new Audio('./whack-audio.wav')
let moleCount = 0
let countDisplay = document.getElementById('mole-count')
let timedCountDisplay = document.getElementById('challenge-mole-count')
let numberArr = []
let timedMoleClickCount = 0
let moleTimer = document.getElementById('mole-timer')
let seconds = 10
let timePassed = 0
let timeleft = seconds
let timeDisplay = document.getElementById('time-display')
let timerInterval = null
let highScoreDisplay = document.getElementById('high-score')
let highScore
let currentHighScore = 0

// the mole
let mole = document.createElement('img')
mole.setAttribute('src', './mole.PNG')
mole.setAttribute('id', 'mole')
mole.onclick = whackedMole

//Function to get a random hole
function randomNumber() {
  let number = getRandomNumber(0, holes.length - 1)
  let lastNumber = numberArr.pop()
  numberArr.push(number)
  if (number !== lastNumber) {
    return number
  } else {
    return randomNumber()
  }
}

//Function to put the mole in a hole
function moleAppears() {
  let hole = holes[randomNumber()]
  hole.appendChild(mole)
}

//Function  to remove mole from current cell and puts it in a new hole
function whackedMole() {
  moleCounter()
  // springSound.play()
  moleAppears()
  if (moleTimer.textContent === 'CLICK THOSE MOLES!') {
    timedMoleClickCount++
    timedCountDisplay.textContent = `Timed Mole Count: ${timedMoleClickCount}`
  }
}

//Function to count how many times the mole is whacked
function moleCounter() {
  moleCount++
  countDisplay.textContent = `Total Mole Count: ${moleCount}`
}

//Set up the timer button
moleTimer.addEventListener('click', () => timedMoleClicks())

//Function to count how many moles clicked in 10 seconds
function timedMoleClicks() {
  timedMoleClickCount = 0
  moleTimer.textContent = 'CLICK THOSE MOLES!'
  timer()
}

// Function for the actually timing
function timer() {
  timerInterval = setInterval(() => {
    if (timeleft > 0) {
      timePassed = timePassed += 1
      timeleft = seconds - timePassed
      timeDisplay.textContent = `${formatTime(timeleft)}`
    } else {
      clearInterval(timerInterval)
      checkHighScore(currentHighScore, timedMoleClickCount)
      if (highScore === true) {
        alert(`NEW HIGH SCORE! You clicked ${timedMoleClickCount} moles!`)
        timePassed = 0
        timeleft = seconds
        moleTimer.textContent = `Try Again?`
        timedMoleClickCount = 0
        highScoreDisplay.textContent = `High Score: ${currentHighScore}`
        timedCountDisplay.textContent = `Timed Mole Count: ${timedMoleClickCount}`
      } else {
        alert(`You clicked ${timedMoleClickCount} moles!`)
        timePassed = 0
        timeleft = seconds
        moleTimer.textContent = `Try Again?`
        timedMoleClickCount = 0
        timedCountDisplay.textContent = `Timed Mole Count: ${timedMoleClickCount}`
      }
    }
  }, 1000)
}
//I used "https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/" heavily to help me with this feature

// Function to format the time display
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}

// Function to check if new high score is more than old high score
function checkHighScore(num1, num2) {
  if (num1 < num2) {
    highScore = true
    currentHighScore = num2
  } else {
    highScore = false
  }
}
//Call mole at start
moleAppears()
