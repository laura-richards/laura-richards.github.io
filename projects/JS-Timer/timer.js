// Variables
let remainingTime = document.getElementById('remaining-time')
let secondCircle = document.getElementById('base-timer-path-remaining')
let startTiming = document.getElementById('start-time')
let timerLength = 20
let timePassed = 0
let timeLeft = timerLength

// button set up
startTiming.addEventListener('click', () => {
  startTimer()
})

// Circle Colors
const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: 0.5,
  },
  alert: {
    color: 'red',
    threshold: 0.25,
  },
}

// Function to change colors at the time reduces
function changeColors() {
  const timeLeftRatio = timeLeft / timerLength
  if (
    timeLeftRatio <= COLOR_CODES.warning.threshold &&
    timeLeftRatio > COLOR_CODES.alert.threshold
  ) {
    secondCircle.classList.remove(COLOR_CODES.info.color)
    secondCircle.classList.add(COLOR_CODES.warning.color)
  } else if (timeLeftRatio <= COLOR_CODES.alert.threshold) {
    secondCircle.classList.remove(COLOR_CODES.warning.color)
    secondCircle.classList.add(COLOR_CODES.alert.color)
  }
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
    changeColors()
    setCircleDasharray()

    if (timeLeft == -1) {
      clearInterval(timerInterval)
      timeIsUp()
      secondCircle.classList.remove(COLOR_CODES.alert.color)
      secondCircle.classList.add(COLOR_CODES.info.color)
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
