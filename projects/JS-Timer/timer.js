// Variables
let remainingTime = document.getElementById('remaining-time')
let secondCircle = document.getElementById('base-timer-path-remaining')
let startTiming = document.getElementById('start-time')
let timerLength = 20
let timePassed = 0
let timeLeft = timerLength
let timerInterval = null

// button set up
startTiming.addEventListener('click', () => {
  startTimer()
})

// Circle Colors
const COLOR_CODES = {
  info: {
    color: 'green',
  },
}

let remainingPathColor = COLOR_CODES.info.color
secondCircle.setAttribute(
  'class',
  `base-timer_path-remaining ${remainingPathColor}`
)

// function to format the time left
function formatTimeLeft(time) {
  let minutes = Math.floor(time / 60)
  let seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// display the remaining time
remainingTime.innerHTML = `${formatTimeLeft(timeLeft)}`

//function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed++
    timeLeft = timerLength - timePassed
    remainingTime.innerHTML = `${formatTimeLeft(timeLeft)}`
    setCircleDasharray()

    if (timeLeft == -1) {
      clearInterval(timerInterval)

      timeIsUp()
    }
  }, 1000)
}

// Function for when time runs out
function timeIsUp() {
  alert('Your time is up!')
  timerInterval = null
  timePassed = 0
  timeLeft = timerLength
  remainingTime.innerHTML = `${formatTimeLeft(timeLeft)}`
}

//function to reset the timer

// function to work out time left fraction
function calculateFraction() {
  const rawTimeFraction = timeLeft / timerLength
  return rawTimeFraction - (1 / timerLength) * (1 - rawTimeFraction)
}

// function to update the dasharray value to make the second circle move
function setCircleDasharray() {
  const circleDasharray = `${(calculateFraction() * 283).toFixed(0)} 283`
  secondCircle.setAttribute('stroke-dasharray', circleDasharray)
}
