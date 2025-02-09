const minimizeBtn = document.getElementById('minimize-btn');
const closeBtn = document.getElementById('close-btn');
const feedBtn = document.getElementById('feed-btn');
const resetBtn = document.getElementById('reset-btn');
const backgroundContainer = document.getElementById('background-container');
const catsContainer = document.querySelector('.cats-container');
const textContainer = document.getElementById('text-container');
const textContent = document.getElementById('text-content');
const blinkingCursor = document.getElementById('blinking-cursor');
const okBtn = document.getElementById('ok-btn');
const bottomButtons = document.getElementById('bottom-buttons');

// Background Music
const backgroundMusic = new Audio('assets/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Click Sound
const clickSound = new Audio('assets/lamp.mp3');
clickSound.volume = 0.7;

// Meow Sound
const meowSound = new Audio('assets/meow.mp3');
meowSound.volume = 0.7;

window.addEventListener('DOMContentLoaded', () => {
  backgroundMusic.play().catch(err => console.error("Music playback failed:", err));
});

// Title Bar Controls
minimizeBtn.addEventListener('click', () => {
  window.electronAPI.minimizeWindow();
});

closeBtn.addEventListener('click', () => {
  window.electronAPI.closeWindow();
});

// Function to simulate typing effect
function typeText(text, element, speed = 50) {
    let i = 0;
    element.textContent = ''; // Clear the text container
    textContainer.style.display = 'block'; // Show the text container
    bottomButtons.style.display = 'none'; // Hide the bottom buttons

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            blinkingCursor.style.display = 'inline'; // Show blinking cursor at the end
        }
    }
    type();
}

// OK Button
okBtn.addEventListener('click', () => {
    textContainer.style.display = 'none'; // Hide the text container
    bottomButtons.style.display = 'flex'; // Show the bottom buttons
    textContent.textContent = ''; // Clear the text
    blinkingCursor.style.display = 'none'; // Hide the blinking cursor
});

// Feed Button
feedBtn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    
    changeBackground('assets/background2.png');
    spawnNewCat();
    
    feedBtn.disabled = true;

    // Trigger the typing effect
    typeText("Lorena: Ocu sushi seksa mi se...", textContent);
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

        // Add click event to the new cat
        newCat.addEventListener('click', () => {
            meowSound.currentTime = 0; // Reset sound to start
            meowSound.play(); // Play the meow sound
        });
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

    // Hide the text container
    textContainer.style.display = 'none';
    textContent.textContent = ''; // Clear the text
    blinkingCursor.style.display = 'none'; // Hide the blinking cursor

    // Show the bottom buttons
    bottomButtons.style.display = 'flex';

    // Restart the animation after a short delay
    setTimeout(() => {
        const cat = document.getElementById('cat');
        animateCat(cat);

        // Add click event to the main cat
        cat.addEventListener('click', () => {
            meowSound.currentTime = 0; // Reset sound to start
            meowSound.play(); // Play the meow sound
        });
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

// Add click event to the main cat
const mainCat = document.getElementById('cat');
mainCat.addEventListener('click', () => {
    meowSound.currentTime = 0; // Reset sound to start
    meowSound.play(); // Play the meow sound
});