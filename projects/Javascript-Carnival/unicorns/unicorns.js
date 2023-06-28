// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti'

console.log('Inflate The Unicorn!')
// Variables
const unicorns = Array.from(document.getElementsByClassName('inflate-an-image'))
const unicornState = [0, 0, 0]
const snortAudio = new Audio('audio/mixkit-hard-big-horse-snort-80.wav')
const stallionAudio = new Audio(
  'audio/mixkit-intense-horse-stallion-neigh-76.wav'
)
const neighAudio = new Audio('audio/mixkit-stallion-horse-neigh-1762.wav')
const audio = [snortAudio, stallionAudio, neighAudio]

for (let i = 0; i < unicorns.length; i++) {
  onclick = inflate
}

//Function to change images (written after watching the foundations video)
function inflate(e) {
  const index = unicorns.indexOf(e.target)
  if (unicornState[index] < 2) {
    unicornState[index] += 1
    unicorns[index].src = `images/unicorn-${unicornState[index]}.png`
  } else if (unicornState[index] === 2) {
    unicornState[index] += 1
    unicorns[index].src = `images/unicorn-${unicornState[index]}.png`
    canvasConfetti()
  } else {
    randomSound()
    unicornState[index] = 0
    unicorns[index].src = `images/unicorn-0.png`
  }
}

//Function to generate random sound
function randomSound() {
  const number = Math.floor(Math.random() * 3)
  audio[number].play()
}

// bellow here is my working through the process
// Function to change images - using String Concatenation!
// function inflate(e) {
//   let unicorn = e.target
//   if (unicorn === unicorns[0]) {
//     makeChange(0)
//     snortAudio.play()
//   } else if (unicorn === unicorns[1]) {
//     makeChange(1)
//     neighAudio.play()
//   } else if (unicorn === unicorns[2]) {
//     makeChange(2)
//     stallionAudio.play()
//   }
// }

// // Function for the change
// function makeChange(i) {
//   if (unicornState[i] < 2) {
//     unicornState[i] += 1
//     unicorns[i].src = `images/unicorn-${unicornState[i]}.png`
//   } else if (unicornState[i] === 2) {
//     unicornState[i] += 1
//     unicorns[i].src = `images/unicorn-${unicornState[i]}.png`
//     canvasConfetti()
//   }
// }

// Function to change images - not using String concatenation
// function inflate(e) {
//   let unicorn = e.target
//   if (
//     unicorn.src ===
//     'http://localhost:3000/inflate-the-unicorn/images/unicorn-0.png'
//   ) {
//     unicorn.src = 'images/unicorn-1.png'
//   } else if (
//     unicorn.src ===
//     'http://localhost:3000/inflate-the-unicorn/images/unicorn-1.png'
//   ) {
//     unicorn.src = 'images/unicorn-2.png'
//   } else if (
//     unicorn.src ===
//     'http://localhost:3000/inflate-the-unicorn/images/unicorn-2.png'
//   ) {
//     unicorn.src = 'images/unicorn-3.png'
//     canvasConfetti()
//   }
// }
