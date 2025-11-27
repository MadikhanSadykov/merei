import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import anime from 'https://cdn.skypack.dev/animejs';

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const valentineQuestion = document.getElementById('valentineQuestion');
const responseButtons = document.getElementById('responseButtons');

let noClickCount = 0;
let buttonHeight = 48;
let buttonWidth = 80;
let fontSize = 20;
const imagePaths = ['./images/image1.gif','./images/image2.gif','./images/image3.gif','./images/image4.gif','./images/image5.gif'];
const usedPositions = [];

//sound
function playSound(soundPath) {const audio = new Audio(soundPath); audio.play();}

const getRandomNumber = (num) => {return Math.floor(Math.random() * (num + 1));};
  
  //raunaway button
  const runawayButtonLogic = (button) => {
    const moveButton = function () {
      if (this.textContent.trim() === "Say yes or else...") {
        const top = getRandomNumber(window.innerHeight - this.offsetHeight);
        const left = getRandomNumber(window.innerWidth - this.offsetWidth);
  
        animateMove(this, "top", top).play();
        animateMove(this, "left", left).play();
      }
    };
    button.addEventListener("mouseover", moveButton);
    button.addEventListener("click", moveButton);};
  
  const animateMove = (element, prop, pixels) =>
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: "easeOutCirc",
      duration: 500,
    });
  
  // Create sticker effect for No button
  const createSticker = (clickCount) => {
    const imageRect = imageDisplay.getBoundingClientRect();
    const sticker = document.createElement("img");
    
    // Place stickers around the main gif corners
    const isMobile = window.innerWidth < 768;
    const stickerSize = isMobile ? 160 : 180;
    
    // Position relative to main gif
    const corners = [
      {x: imageRect.left - stickerSize/2, y: imageRect.top - stickerSize/2}, // top-left of gif
      {x: imageRect.right - stickerSize/2, y: imageRect.top - stickerSize/2}, // top-right of gif
      {x: imageRect.left - stickerSize/2, y: imageRect.bottom - stickerSize/2}, // bottom-left of gif
      {x: imageRect.right - stickerSize/2, y: imageRect.bottom - stickerSize/2} // bottom-right of gif
    ];
    
    const cornerIndex = (clickCount - 1) % corners.length;
    const selectedCorner = corners[cornerIndex];
    
    const randomX = selectedCorner.x + (Math.random() - 0.5) * 30;
    const randomY = selectedCorner.y + (Math.random() - 0.5) * 30;
    
    const randomAngle = (Math.random() - 0.5) * 30; // -15 to +15 degrees
    
    sticker.src = `./images/m${clickCount}.jpg`;
    sticker.style.position = "absolute";
    sticker.style.left = `${randomX}px`;
    sticker.style.top = `${randomY}px`;
    sticker.style.transform = `rotate(${randomAngle}deg)`;
    const stickerSizeStr = isMobile ? "160px" : "180px";
    sticker.style.width = stickerSizeStr;
    sticker.style.height = stickerSizeStr;
    sticker.style.borderRadius = "50%";
    sticker.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    sticker.style.border = "3px solid white";
    sticker.style.zIndex = "1";
    sticker.style.pointerEvents = "none";
    sticker.style.objectFit = "cover";
    
    document.body.appendChild(sticker);
    
    // Cute bounce animation
    anime({
      targets: sticker,
      scale: [0, 1.2, 1],
      duration: 600,
      easing: "easeOutElastic(1, .8)"
    });
  };

  //no button
  noButton.addEventListener("click", () => {
    playSound('./sounds/click.mp3');
    if (noClickCount < 7) {
      noClickCount++;
      imageDisplay.src = imagePaths[noClickCount] || "./images/image1.gif";
  
      //yes button gets thicc
      buttonHeight += 25; buttonWidth += 25; fontSize += 3;
      yesButton.style.height = `${buttonHeight}px`;
      yesButton.style.width = `${buttonHeight}px`;
      yesButton.style.fontSize = `${fontSize}px`;
      yesButton.style.borderRadius = "50%";
      yesButton.style.padding = "0";
      
      // Keep text and buttons on top
      valentineQuestion.style.zIndex = "999";
      valentineQuestion.style.position = "relative";
      valentineQuestion.style.webkitTextStroke = "1px white";
      valentineQuestion.style.textShadow = "1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white";
      responseButtons.style.zIndex = "999";
      responseButtons.style.position = "relative";
  
      //no button text and stickers
      const messages = ["Не","Точно?","Ну пожалуйста?","Не делай так :(","Ну давай же!","Последний шанс!","Скажи да или..."];
      
      // Create cute sticker on the image
      createSticker(noClickCount);
  
      if (noClickCount === 7) {
        const newButton = document.createElement("button");
        newButton.id = "runawayButton";
        newButton.textContent = "Скажи да или...";
        newButton.style.position = "absolute";
        const yesButtonRect = yesButton.getBoundingClientRect();
        newButton.style.top = `${yesButtonRect.bottom + 10}px`;
        newButton.style.left = `${yesButtonRect.left + yesButtonRect.width / 2 + 24}px`;

        newButton.style.backgroundColor = "#ff5a5f";
        newButton.style.color = "white";
        newButton.style.padding = "12px 20px";
        newButton.style.borderRadius = "8px";
        newButton.style.cursor = "pointer";
        newButton.style.fontSize = "20px";
        newButton.style.fontWeight = "bold";
  
        noButton.replaceWith(newButton);
  //make no button go zoom with new button
        runawayButtonLogic(newButton);
      } else {
        noButton.textContent = messages[noClickCount];
      }
    }
  });
  
  //yes button
  yesButton.addEventListener("click", () => {
    playSound('./sounds/final.mp3');
    imageDisplay.remove(); 
    responseButtons.style.display = "none"; 
  
    //yes page
    valentineQuestion.innerHTML = `
      <img src="./images/final.gif" alt="Celebration duckie" style="display: block; margin: 0 auto; width: 200px; height: auto;"/>
      Ура мы идем гулять<br>
      <span style="font-size: 20px; color: #bd1e59;">Че там куда пойдем)<3</span>
    `;
    valentineQuestion.style.textAlign = "center";
    valentineQuestion.style.marginTop = "80px"; 
  
    //make image go boing
    const bounceImage = document.createElement("img");
    bounceImage.src = "./images/m0.jpg";
    bounceImage.alt = "Baddie";
    bounceImage.style.position = "absolute";
    bounceImage.style.width = "200px";
    bounceImage.style.height = "200px";
    bounceImage.style.borderRadius = "50%";
    bounceImage.style.objectFit = "cover";
    document.body.appendChild(bounceImage);
  
    startBouncing(bounceImage);
  
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#FF5A5F", "#3DCC91", "#FFD1DC"],
    });
  });
  
  function startBouncing(element) {
    let x = Math.random() * (window.innerWidth - element.offsetWidth);
    let y = Math.random() * (window.innerHeight - element.offsetHeight);
    let dx = 2; let dy = 2; let rotation = 0;
  
    function move() {
      const viewportWidth = window.innerWidth - element.offsetWidth;
      const viewportHeight = window.innerHeight - element.offsetHeight;
  
      if (x <= 0 || x >= viewportWidth) {dx *= -1; rotation += 15;
        anime({
          targets: element,
          translateX: dx > 0 ? x + 20 : x - 20, 
          duration: 300,
          easing: "easeOutElastic(1, .6)", 
      });
  }

      if (y <= 0 || y >= viewportHeight) {dy *= -1; rotation += 15;
        anime({
          targets: element,
          translateY: dy > 0 ? y + 20 : y - 20, 
          duration: 300,
          easing: "easeOutElastic(1, .6)", 
      });
  }
        
      x += dx; y += dy;
  
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.transform = `rotate(${rotation}deg)`;
  
      requestAnimationFrame(move); 
    }
  
    move();
  }
  