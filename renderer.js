const minimizeBtn = document.getElementById('minimize-btn');
const closeBtn = document.getElementById('close-btn');
const feedBtn = document.getElementById('feed-btn');
const resetBtn = document.getElementById('reset-btn');
const playBtn = document.getElementById('play-btn');
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

// Water Sound
const waterSound = new Audio('assets/water.mp3');
waterSound.volume = 0.7;

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
    element.textContent = '';
    textContainer.style.display = 'block';
    bottomButtons.style.display = 'none';
    okBtn.style.display = 'none';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            blinkingCursor.style.display = 'inline';
            okBtn.style.display = 'block';
        }
    }
    type();
}

// OK Button
okBtn.addEventListener('click', () => {
    textContainer.style.display = 'none';
    bottomButtons.style.display = 'flex';
    textContent.textContent = '';
    blinkingCursor.style.display = 'none';
    okBtn.style.display = 'none';
    
    feedBtn.style.display = 'none';
    playBtn.style.display = 'none';
    resetBtn.style.display = 'block';
});

// Feed Button
feedBtn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    
    changeBackground('assets/background2.png');
    spawnNewCat();
    
    typeText("Lorena: Ocu sushi seksa mi se...", textContent);
});

// Play Button
playBtn.addEventListener('click', () => {
    // Remove the click sound playback
    // clickSound.currentTime = 0;
    // clickSound.play();
    
    changeBackground('assets/background3.png');
    // Remove the original cat when spawning skinker
    const originalCat = document.getElementById('cat');
    if (originalCat) {
        originalCat.parentElement.remove();
    }
    spawnSkinkerCat();
    
    typeText("Lorena: Ubicuse...", textContent);

    // Play water sound when play button is clicked
    waterSound.currentTime = 0;
    waterSound.play();
});

// Reset Button
resetBtn.addEventListener('click', () => {
    resetApp();
});

function changeBackground(newBackgroundPath) {
    backgroundContainer.style.backgroundImage = `url('${newBackgroundPath}')`;
}

function spawnCat(catClass, catSrc, catAlt, animateFunction) {
    if (!document.querySelector(`.${catClass}`)) {
        const catContainer = document.createElement('div');
        catContainer.className = 'cat-container';
        
        const cat = document.createElement('img');
        cat.className = `${catClass} new-cat`;
        cat.src = catSrc;
        cat.alt = catAlt;

        catContainer.style.margin = "-90px";
        catContainer.style.padding = "0px";
        
        catContainer.appendChild(cat);
        catsContainer.appendChild(catContainer);
        animateFunction(cat);

        // Default click sound
        cat.addEventListener('click', () => {
            meowSound.currentTime = 0;
            meowSound.play();
        });
    }
}

function spawnNewCat() {
    spawnCat('marin-cat', 'assets/marin1.png', 'Marin Cat', animateNewCat);
}

function spawnSkinkerCat() {
    spawnCat('skinker-cat', 'assets/skinker1.png', 'Skinker Cat', animateSkinkerCat);
    
    // Make the skincare cat bigger
    const skinkerCat = document.querySelector('.skinker-cat');
    if (skinkerCat) {
        skinkerCat.style.width = '300px'; // Adjust the width as needed
        skinkerCat.style.height = '200px'; // Adjust the height as needed

        // Replace the click sound with water sound
        skinkerCat.removeEventListener('click', playMeowSound); // Remove default click sound
        skinkerCat.addEventListener('click', () => {
            waterSound.currentTime = 0;
            waterSound.play();
        });
    }
}

function playMeowSound() {
    meowSound.currentTime = 0;
    meowSound.play();
}

function resetApp() {
    changeBackground('assets/background.png');

    const newCats = document.querySelectorAll('.new-cat');
    newCats.forEach((cat) => {
        cat.parentElement.remove();
    });

    catsContainer.style.gap = "0px"; 

    catsContainer.innerHTML = `
        <div class="cat-container">
            <img id="cat" src="assets/pixil-frame-0.png" alt="Pixel Cat">
        </div>
    `;

    feedBtn.style.display = 'block';
    playBtn.style.display = 'block';
    resetBtn.style.display = 'block';

    textContainer.style.display = 'none';
    textContent.textContent = '';
    blinkingCursor.style.display = 'none';

    bottomButtons.style.display = 'flex';

    setTimeout(() => {
        const cat = document.getElementById('cat');
        animateCat(cat);

        cat.addEventListener('click', () => {
            meowSound.currentTime = 0;
            meowSound.play();
        });
    }, 100);
}

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
        if (!cat) return;
        cat.src = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
        setTimeout(animate, frameRate);
    }

    animate();
}

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

function animateSkinkerCat(skinkerCat) {
    let skinkerFrame = 0;
    const skinkerFrames = [
        'assets/skinker1.png',
        'assets/skinker2.png'
    ];
    const frameRate = 400;

    function animate() {
        skinkerCat.src = skinkerFrames[skinkerFrame];
        skinkerFrame = (skinkerFrame + 1) % skinkerFrames.length;
        setTimeout(animate, frameRate);
    }

    animate();
}

animateCat();

const mainCat = document.getElementById('cat');
mainCat.addEventListener('click', () => {
    meowSound.currentTime = 0;
    meowSound.play();
});