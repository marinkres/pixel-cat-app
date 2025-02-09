const minimizeBtn = document.getElementById("minimize-btn")
const closeBtn = document.getElementById("close-btn")
const feedBtn = document.getElementById("feed-btn")
const backgroundContainer = document.getElementById("background-container")
const catsContainer = document.querySelector(".cats-container")

minimizeBtn.addEventListener("click", () => {
  window.electronAPI.minimizeWindow()
})

closeBtn.addEventListener("click", () => {
  window.electronAPI.closeWindow()
})

// Add event listener for the feed button
feedBtn.addEventListener("click", () => {
  changeBackground("assets/background2.png")
  spawnNewCat()
})

// Function to change the background
function changeBackground(newBackgroundPath) {
  backgroundContainer.style.backgroundImage = `url('${newBackgroundPath}')`
}

// Function to spawn a new cat
function spawnNewCat() {
  if (!document.querySelector(".new-cat")) {
    const newCatContainer = document.createElement("div")
    newCatContainer.className = "cat-container"
    const newCat = document.createElement("img")
    newCat.className = "new-cat"
    newCat.src = "assets/new-cat-frame1.png"
    newCat.alt = "New Pixel Cat"
    newCatContainer.appendChild(newCat)
    catsContainer.appendChild(newCatContainer)
    animateNewCat(newCat)
  }
}

const cat = document.getElementById("cat")
const frames = [
  "assets/pixil-frame-0.png",
  "assets/pixil-frame-1.png",
  "assets/pixil-frame-2.png",
  "assets/pixil-frame-3.png",
  "assets/pixil-frame-4.png",
]
const newCatFrames = [
  "assets/marin1.png",
  "assets/marin2.png",
  "assets/marin3.png",
  "assets/marin4.png",
  "assets/marin5.png",
]
let currentFrame = 0
const frameRate = 200 // Time (in milliseconds) between frames

function animateCat() {
  cat.src = frames[currentFrame]
  currentFrame = (currentFrame + 1) % frames.length
  setTimeout(animateCat, frameRate)
}

function animateNewCat(newCat) {
  let newCatFrame = 0
  function animate() {
    newCat.src = newCatFrames[newCatFrame]
    newCatFrame = (newCatFrame + 1) % newCatFrames.length
    setTimeout(animate, frameRate)
  }
  animate()
}

// Start the animation
animateCat()

