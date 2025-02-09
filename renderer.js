const minimizeBtn = document.getElementById('minimize-btn');
const closeBtn = document.getElementById('close-btn');
const feedBtn = document.getElementById('feed-btn');
const resetBtn = document.getElementById('reset-btn');
const backgroundContainer = document.getElementById('background-container');
const catsContainer = document.querySelector('.cats-container');

// Background Music
const backgroundMusic = new Audio('assets/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

window.addEventListener('DOMContentLoaded', () => {
  backgroundMusic.play().catch(err => console.error("Music playback failed:", err));
});

// Click Sound
const clickSound = new Audio('assets/lamp.mp3');
clickSound.volume = 0.7;

// Title Bar Controls
minimizeBtn.addEventListener('click', () => {
  window.electronAPI.minimizeWindow();
});

closeBtn.addEventListener('click', () => {
  window.electronAPI.closeWindow();
});

// Feed Button
feedBtn.addEventListener('click', () => {
  clickSound.currentTime = 0;
  clickSound.play();
  
  changeBackground('assets/background2.png');
  spawnNewCat();
  
  feedBtn.disabled = true;
});

// Reset Button
resetBtn.addEventListener('click', () => {
  resetApp();
});

// Function to change the background
function changeBackground(newBackgroundPath) {
  backgroundContainer.style.backgroundImage = `url('${newBackgroundPath}')`;
}

// Function to spawn a new cat
function spawnNewCat() {
  if (!document.querySelector('.new-cat')) {
    const newCatContainer = document.createElement('div');
    newCatContainer.className = 'cat-container';
    
    const newCat = document.createElement('img');
    newCat.className = 'new-cat';
    newCat.src = 'assets/new-cat-frame1.png';
    newCat.alt = 'New Pixel Cat';

    // Ensure no spacing issues
    newCatContainer.style.margin = "-90px";
    newCatContainer.style.padding = "0px";
    
    newCatContainer.appendChild(newCat);
    catsContainer.appendChild(newCatContainer);
    animateNewCat(newCat);
  }
}

// Function to reset the app
function resetApp() {
  // Reset the background
  changeBackground('assets/background.png');

  // Remove all spawned cats
  const newCats = document.querySelectorAll('.new-cat');
  newCats.forEach((cat) => {
    cat.parentElement.remove(); // Remove their container too
  });

  // Reset the container spacing
  catsContainer.style.gap = "0px"; 

  // Restore the first cat properly
  catsContainer.innerHTML = `
    <div class="cat-container">
      <img id="cat" src="assets/pixil-frame-0.png" alt="Pixel Cat">
    </div>
  `;

  // Re-enable the feed button
  feedBtn.disabled = false;

  // Restart the animation after a short delay
  setTimeout(() => {
    const cat = document.getElementById('cat');
    animateCat(cat);
  }, 100);
}

// Cat Animation
function animateCat(cat = document.getElementById('cat')) {
  let currentFrame = 0;
  const frames = [
    'assets/pixil-frame-0.png',
    'assets/pixil-frame-1.png',
    'assets/pixil-frame-2.png',
    'assets/pixil-frame-3.png',
    'assets/pixil-frame-4.png',
  ];
  const frameRate = 200;

  function animate() {
    if (!cat) return; // Prevent errors if element is missing
    cat.src = frames[currentFrame];
    currentFrame = (currentFrame + 1) % frames.length;
    setTimeout(animate, frameRate);
  }

  animate();
}

// New Cat Animation
function animateNewCat(newCat) {
  let newCatFrame = 0;
  const newCatFrames = [
    'assets/marin1.png',
    'assets/marin2.png',
    'assets/marin3.png',
    'assets/marin4.png',
    'assets/marin5.png',
  ];
  const frameRate = 200;

  function animate() {
    newCat.src = newCatFrames[newCatFrame];
    newCatFrame = (newCatFrame + 1) % newCatFrames.length;
    setTimeout(animate, frameRate);
  }

  animate();
}

// Start the animation on load
animateCat();
