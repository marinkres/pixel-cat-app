const minimizeBtn = document.getElementById("minimize-btn")
const closeBtn = document.getElementById("close-btn")

minimizeBtn.addEventListener("click", () => {
  window.electronAPI.minimizeWindow()
})

closeBtn.addEventListener("click", () => {
  window.electronAPI.closeWindow()
})

const cat = document.getElementById("cat")
const frames = [
  "assets/pixil-frame-0.png",
  "assets/pixil-frame-1.png",
  "assets/pixil-frame-2.png",
  "assets/pixil-frame-3.png",
  "assets/pixil-frame-4.png",
  // Add more frames as needed
]

let currentFrame = 0
const frameRate = 5 // Adjust as needed

function animateCat() {
  cat.src = frames[currentFrame]
  currentFrame = (currentFrame + 1) % frames.length
}

setInterval(animateCat, 1000 / frameRate)

