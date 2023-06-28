// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
import { save } from './screenshot.js'
console.log('Dress The Clown!')

// Variables
const clownParts = document.getElementsByClassName('dress-an-image')
let partsIndex = [0, 0, 0]
let partsNames = [`head`, `body`, `shoes`]
let clothingIndex = 0
console.log(clownParts)

//Function to change the clown head
function changeClownUp() {
  let i = clothingIndex
  let partSrc = `./images/${partsNames[i]}${partsIndex[i]}.png`
  if (partsIndex[i] === 4) {
    partsIndex[i] = 0
  }
  clownParts[i].src = partSrc
  partsIndex[i]++
}

function changeClownDown() {
  let i = clothingIndex
  let partSrc = `./images/${partsNames[i]}${partsIndex[i]}.png`
  if (partsIndex[i] === 0) {
    partsIndex[i] = 4
  }
  clownParts[i].src = partSrc
  partsIndex[i]--
}

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowRight':
      changeClownUp()
      break

    case 'ArrowLeft':
      changeClownDown()
      break
    case 'ArrowDown':
      if (clothingIndex < 2) {
        clothingIndex++
        break
      } else {
        break
      }
    case 'ArrowUp':
      if (clothingIndex > 0) {
        clothingIndex--
        break
      } else {
        break
      }
  }
})

// Save Function
function saveFunction() {
  let clown = {
    head: clownParts[0],
    body: clownParts[1],
    shoes: clownParts[2],
  }
  save(clown)
}

// Add Save Function to the Save button
let saveButton = document.getElementById('save-button')
saveButton.addEventListener('click', saveFunction)
