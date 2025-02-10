// Cache DOM lookups
const elements = {
    minimizeBtn: document.getElementById('minimize-btn'),
    closeBtn: document.getElementById('close-btn'),
    feedBtn: document.getElementById('feed-btn'),
    resetBtn: document.getElementById('reset-btn'),
    playBtn: document.getElementById('play-btn'),
    smokeBtn: document.getElementById('smoke-btn'),
    sleepBtn: document.getElementById('sleep-btn'),
    gameBtn: document.getElementById('game-btn'),
    backgroundContainer: document.getElementById('background-container'),
    catsContainer: document.querySelector('.cats-container'),
    textContainer: document.getElementById('text-container'),
    textContent: document.getElementById('text-content'),
    blinkingCursor: document.getElementById('blinking-cursor'),
    okBtn: document.getElementById('ok-btn'),
    bottomButtons: document.getElementById('bottom-buttons'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsMenu: document.getElementById('settings-menu'),
    muteBtn: document.getElementById('mute-btn'),
    exitBtn: document.getElementById('exit-btn')
  };
  
  let gameContainer = null;
  
  // Audio elements
  const audioElements = {
    backgroundMusic: new Audio('assets/background-music.mp3'),
    clickSound: new Audio('assets/lamp.mp3'),
    meowSound: new Audio('assets/meow.mp3'),
    waterSound: new Audio('assets/water.mp3'),
    doorbellSound: new Audio('assets/doorbell.mp3')
  };
  
  // Configure audio elements
  audioElements.backgroundMusic.loop = true;
  audioElements.backgroundMusic.volume = 0.5;
  audioElements.clickSound.volume = 0.7;
  audioElements.meowSound.volume = 0.7;
  audioElements.waterSound.volume = 0.7;
  audioElements.doorbellSound.volume = 0.7;
  
  // Add a new variable to track if we're on the main menu
  let isMainMenu = true;
  
  // Function to show main menu
  function showMainMenu() {
    isMainMenu = true;
    changeBackground("assets/background4.webp");
    elements.catsContainer.style.display = "none";
    elements.bottomButtons.style.display = "none";
  
    // Create main menu elements if they don't exist
    if (!document.getElementById("main-menu")) {
      const mainMenu = document.createElement("div");
      mainMenu.id = "main-menu";
      mainMenu.style.position = "absolute";
      mainMenu.style.top = "50%";
      mainMenu.style.left = "50%";
      mainMenu.style.transform = "translate(-50%, -50%)";
      mainMenu.style.textAlign = "center";
      mainMenu.innerHTML = `
        <h1 style="font-family: 'Press Start 2P', cursive; font-size: 36px; color: #fff; margin-bottom: 30px; text-shadow: 2px 2px 4px #000;">Matze Simulator</h1>
        <button id="start-game-btn" style="font-family: 'Press Start 2P', cursive; font-size: 24px; padding: 15px 30px; background-color: #89cff0; color: #fff; border: none; cursor: pointer; text-shadow: 1px 1px 2px #000;">Enter</button>
      `;
      elements.backgroundContainer.appendChild(mainMenu);
  
      // Add event listener to the start game button
      document.getElementById("start-game-btn").addEventListener("click", function() {
        audioElements.doorbellSound.currentTime = 0;
        audioElements.doorbellSound.play();  // Play doorbell sound
        startGame();  // Call start game function
      });
    } else {
      document.getElementById("main-menu").style.display = "block";
    }
  }
  
  // Function to start the game
  function startGame() {
    isMainMenu = false;
    document.getElementById("main-menu").style.display = "none";
    changeBackground("assets/background.png");
    elements.catsContainer.style.display = "flex";
    elements.bottomButtons.style.display = "flex";
    resetApp();
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    audioElements.backgroundMusic.play().catch(err => console.error("Music playback failed:", err));
    showMainMenu();
  });
  
  // Title Bar Controls
  elements.minimizeBtn.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
  });
  
  elements.closeBtn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
  });
  
  // Function to simulate typing effect
  function typeText(text, element, speed = 50) {
    let i = 0;
    element.textContent = '';
    elements.textContainer.style.display = 'block';
    elements.bottomButtons.style.display = 'none';
    elements.okBtn.style.display = 'none';
  
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        elements.blinkingCursor.style.display = 'inline';
        elements.okBtn.style.display = 'block';
      }
    }
    type();
  }
  
  // OK Button
  elements.okBtn.addEventListener('click', () => {
    elements.textContainer.style.display = 'none';
    elements.bottomButtons.style.display = 'flex';
    elements.textContent.textContent = '';
    elements.blinkingCursor.style.display = 'none';
    elements.okBtn.style.display = 'none';
  
    elements.feedBtn.style.display = 'none';
    elements.playBtn.style.display = 'none';
    elements.smokeBtn.style.display = 'none';
    elements.sleepBtn.style.display = 'none';
    elements.gameBtn.style.display = 'none';
    elements.resetBtn.style.display = 'block';
  });
  
  // Feed Button
  elements.feedBtn.addEventListener('click', () => {
    audioElements.clickSound.currentTime = 0;
    audioElements.clickSound.play();
  
    changeBackground('assets/background2.png');
    spawnNewCat();
    elements.gameBtn.style.display = 'none';
    typeText("I want sushi...", elements.textContent);
  });
  
  // Play Button
  elements.playBtn.addEventListener('click', () => {
    changeBackground('assets/background3.png');
    const originalCat = document.getElementById('cat');
    if (originalCat) {
      originalCat.parentElement.remove();
    }
    spawnSkinkerCat();
  
    elements.gameBtn.style.display = 'none';
    typeText("Where is my moisturizer...", elements.textContent);
  
    audioElements.waterSound.currentTime = 0;
    audioElements.waterSound.play();
  });
  
  // Smoke Button
  elements.smokeBtn.addEventListener('click', () => {
    changeBackground('assets/background5.webp');
    const originalCat = document.getElementById('cat');
    if (originalCat) {
      originalCat.parentElement.remove();
    }
    spawnSkinkerCat();
  
    elements.gameBtn.style.display = 'none';
    typeText("Puff puff...", elements.textContent);
  });
  // Sleep Button
  elements.sleepBtn.addEventListener('click', () => {
    changeBackground('assets/background7.webp');
    const originalCat = document.getElementById('cat');
    if (originalCat) {
      originalCat.parentElement.remove();
    }
  
    elements.gameBtn.style.display = 'none';
    typeText("Zzzz...", elements.textContent);
  });
  
  // Game Button
  elements.gameBtn.addEventListener('click', () => {
    // Hide cats
    const cats = document.querySelectorAll('.cat-container');
    cats.forEach(cat => cat.style.display = 'none');
  
    // Hide bottom buttons except reset
    elements.feedBtn.style.display = 'none';
    elements.playBtn.style.display = 'none';
    elements.smokeBtn.style.display = 'none';
    elements.sleepBtn.style.display = 'none';
    elements.gameBtn.style.display = 'none';
  
    // If game container doesn't exist, create it
    if (!gameContainer) {
      gameContainer = document.createElement('div');
      gameContainer.id = 'heart-game-container';
      gameContainer.style.position = 'absolute';
      gameContainer.style.top = '50%';
      gameContainer.style.left = '50%';
      gameContainer.style.transform = 'translate(-50%, -50%)';
      gameContainer.style.width = '80%';
      gameContainer.style.height = '80%';
      gameContainer.style.maxWidth = '600px';
      gameContainer.style.maxHeight = '400px';
  
      // Add the game HTML
      gameContainer.innerHTML = `<div id="game-container" style="width: 100%; height: 100%; position: relative;">
        <canvas id="gameCanvas"></canvas>
        <div id="game-ui" style="background: rgba(0, 0, 0, 0.8); position: absolute; top: 10px; left: 10px; color: white; font-family: 'Press Start 2P', cursive;">
          Score: <span id="score">0</span> <br> Time: <span id="time">30</span>
        </div>
        <div id="start-screen" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white; font-family: 'Press Start 2P', cursive;">
          <h2 style="text-shadow: 2px 2px 4px black;">Vataj!</h2>
          <button id="start-button" style="background: #89cff0; border: 2px solid white; color: white; padding: 10px 20px; margin-top: 20px; cursor: pointer; font-family: 'Press Start 2P', cursive;">Start Game</button>
        </div>
      </div>`;
  
      elements.backgroundContainer.appendChild(gameContainer);
  
      // Initialize game after adding to DOM
      initializeGame();
    } else {
      gameContainer.style.display = 'block';
      // Reinitialize game when showing existing container
      initializeGame();
    }
  });
  
  // Separate function to initialize the game
  function initializeGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
  
    // Reset game state
    gameRunning = false;
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
  
    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    let score = 0;
    let timeLeft = 30;
    let hearts = [];
    let catX = canvas.width / 2;
    const catY = canvas.height - 80;
    let catImg = new Image();
    catImg.src = 'assets/marin.webp';
  
    class Heart {
      constructor() {
        this.x = Math.random() * (canvas.width - 20);
        this.y = -20;
        this.speed = 3 + Math.random() * 2;
        this.size = 20;
      }
  
      update() {
        this.y += this.speed;
      }
  
      draw() {
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        const x = this.x + this.size / 2;
        const y = this.y + this.size / 2;
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - this.size/2, y - this.size/2, x - this.size, y + this.size/4, x, y + this.size/2);
        ctx.bezierCurveTo(x + this.size, y + this.size/4, x + this.size/2, y - this.size/2, x, y);
        ctx.fill();
      }
    }
  
    function startGame() {
      gameRunning = true;
      score = 0;
      timeLeft = 30;
      hearts = [];
      startScreen.style.display = 'none';
      scoreElement.textContent = score;
      timeElement.textContent = timeLeft;
  
      requestAnimationFrame(gameLoop);
      spawnHeart();
  
      // Store the interval reference
      if (gameInterval) {
        clearInterval(gameInterval);
      }
      gameInterval = setInterval(() => {
        if (!gameRunning) {
          clearInterval(gameInterval);
          gameInterval = null;
          return;
        }
        timeLeft--;
        timeElement.textContent = timeLeft;
  
        if (timeLeft <= 0) {
          gameRunning = false;
          clearInterval(gameInterval);
          gameInterval = null;
          endGame();
        }
      }, 1000);
    }
  
    function spawnHeart() {
      if (!gameRunning) return;
      hearts.push(new Heart());
      setTimeout(spawnHeart, 1000);
    }
  
    function endGame() {
      startScreen.style.display = 'block';
      startScreen.innerHTML = `
        <h2 style="text-shadow: 2px 2px 4px black;">Game Over!</h2>
        <p style="margin: 20px 0; text-shadow: 2px 2px 4px black;">Final Score: ${score}</p>
        <button id="restart-button" style="text-shadow: 2px 2px 4px black; background: #89cff0; border: 2px solid white; color: white; padding: 10px 20px; margin-top: 20px; cursor: pointer; font-family: 'Press Start 2P', cursive;">Play Again</button>
      `;
  
      document.getElementById('restart-button').addEventListener('click', (e) => {
        e.stopPropagation();
        startGame();
      });
    }
  
    function isHeartCollidingWithCat(heart, catX, catY) {
      return heart.y + heart.size > catY - 40 &&
             heart.y < catY + 40 &&
             heart.x + heart.size > catX - 40 &&
             heart.x < catX + 40;
    }
  
    function gameLoop() {
      if (!gameRunning) return;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(catImg, catX - 40, catY - 40, 80, 80);
  
      hearts = hearts.filter(heart => {
        heart.update();
        heart.draw();
  
        if (isHeartCollidingWithCat(heart, catX, catY)) {
          score++;
          scoreElement.textContent = score;
          return false;
        }
  
        return heart.y < canvas.height;
      });
  
      requestAnimationFrame(gameLoop);
    }
  
    canvas.addEventListener('mousemove', (e) => {
      if (!gameRunning) return;
      const rect = canvas.getBoundingClientRect();
      catX = e.clientX - rect.left;
      catX = Math.max(40, Math.min(canvas.width - 40, catX));
    });
  
    // Add click handler with stopPropagation
    startButton.addEventListener('click', (e) => {
      e.stopPropagation();
      startGame();
    });
  }
  
  // Reset Button
  elements.resetBtn.addEventListener('click', () => {
    resetApp();
  });
  
  function changeBackground(newBackgroundPath) {
    elements.backgroundContainer.style.backgroundImage = `url('${newBackgroundPath}')`;
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
      elements.catsContainer.appendChild(catContainer);
      animateFunction(cat);
  
      cat.addEventListener('click', () => {
        audioElements.meowSound.currentTime = 0;
        audioElements.meowSound.play();
      });
    }
  }
  
  function spawnNewCat() {
    spawnCat('marin-cat', 'assets/marin1.png', 'Marin Cat', animateNewCat);
  }
  
  function spawnSkinkerCat() {
    spawnCat('skinker-cat', 'assets/skinker1.png', 'Skinker Cat', animateSkinkerCat);
  
    const skinkerCat = document.querySelector('.skinker-cat');
    if (skinkerCat) {
      skinkerCat.style.width = '300px';
      skinkerCat.style.height = '200px';
  
      skinkerCat.removeEventListener('click', playMeowSound);
      skinkerCat.addEventListener('click', () => {
        audioElements.waterSound.currentTime = 0;
        audioElements.waterSound.play();
      });
    }
  }
  
  function playMeowSound() {
    audioElements.meowSound.currentTime = 0;
    audioElements.meowSound.play();
  }
  
  // Add a variable to track game state
  let gameInterval = null;
  
  // Update the Reset function to properly clean up and reset the game
  function resetApp() {
    changeBackground('assets/background.png');
  
    // Reset game state
    if (gameContainer) {
      gameContainer.style.display = 'none';
  
      // Reset game UI elements
      const scoreElement = document.getElementById('score');
      const timeElement = document.getElementById('time');
      if (scoreElement) scoreElement.textContent = '0';
      if (timeElement) timeElement.textContent = '30';
  
      // Show start screen
      const startScreen = document.getElementById('start-screen');
      if (startScreen) {
        startScreen.style.display = 'block';
        startScreen.innerHTML = `
          <h2>Catch Hearts for Lorena!</h2>
          <button id="start-button" style="background: #8c0099; border: 2px solid white; color: white; padding: 10px 20px; margin-top: 20px; cursor: pointer; font-family: 'Press Start 2P', cursive;">Start Game</button>
        `;
      }
  
      // Clear any existing game interval
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }
  
      // Reset game state variables in initializeGame
      if (typeof gameRunning !== 'undefined') {
        gameRunning = false;
      }
    }
  
    const newCats = document.querySelectorAll('.new-cat');
    newCats.forEach((cat) => {
      cat.parentElement.remove();
    });
  
    elements.catsContainer.style.gap = "0px";
  
    elements.catsContainer.innerHTML = `
      <div class="cat-container">
        <img id="cat" src="assets/pixil-frame-0.png" alt="Pixel Cat">
      </div>
    `;
  
    const cats = document.querySelectorAll('.cat-container');
    cats.forEach(cat => cat.style.display = 'block');
  
    elements.feedBtn.style.display = 'block';
    elements.playBtn.style.display = 'block';
    elements.smokeBtn.style.display = 'block';
    elements.sleepBtn.style.display = 'block';
    elements.gameBtn.style.display = 'block';
    elements.resetBtn.style.display = 'block';
  
    elements.textContainer.style.display = 'none';
    elements.textContent.textContent = '';
    elements.blinkingCursor.style.display = 'none';
  
    elements.bottomButtons.style.display = 'flex';
  
    setTimeout(() => {
        const cat = document.getElementById('cat');
        animateCat(cat);

        cat.addEventListener('click', () => {
            audioElements.meowSound.currentTime = 0;
            audioElements.meowSound.play();
        });
    }, 100);
}

// Toggle settings menu
elements.settingsBtn.addEventListener('click', () => {
    elements.settingsMenu.style.display = elements.settingsMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  // Mute sounds
  elements.muteBtn.addEventListener('click', () => {
    const isMuted = audioElements.backgroundMusic.muted;
    audioElements.backgroundMusic.muted = !isMuted;
    audioElements.clickSound.muted = !isMuted;
    audioElements.meowSound.muted = !isMuted;
    audioElements.waterSound.muted = !isMuted;
    audioElements.doorbellSound.muted = !isMuted;
    elements.muteBtn.textContent = isMuted ? 'Mute Sounds' : 'Unmute Sounds';
  });
  
  // Exit game
  elements.exitBtn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
  });
  document.addEventListener('click', (event) => {
    if (!elements.settingsMenu.contains(event.target) && !elements.settingsBtn.contains(event.target)) {
      elements.settingsMenu.style.display = 'none';
    }
  });
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
    const frameDuration = 1000 / (1000 / frameRate);

    // Preload images
    skinkerFrames.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    let lastFrameTime = performance.now();

    function animate(currentTime) {
        if (currentTime - lastFrameTime >= frameDuration) {
            skinkerCat.src = skinkerFrames[skinkerFrame];
            skinkerFrame = (skinkerFrame + 1) % skinkerFrames.length;
            lastFrameTime = currentTime;
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

animateCat();

const mainCat = document.getElementById('cat');
mainCat.addEventListener('click', () => {
    audioElements.meowSound.currentTime = 0;
    audioElements.meowSound.play();
});