// Canvas setup
window.onload = function() {
  console.log("hey");
  var canvas = document.getElementById("game-board");
  var myAudio = document.createElement("audio");
  var ctx = canvas.getContext("2d");
  var gameStarted = false;
  var lives = 3;

  // Declarations
  var positionXpanier = 220;

  var img = new Image();
  var obstacles = [];
  var images = [
    "images/banana.png",
    "images/blueberries.png",
    "images/orange.png",
    "images/fruit1.png"
  ];
  var frame = 0;

  // Sounds
  var mySound;

  // First image, before starting
  var startImage = new Image();
  startImage.src = "./images/fruits.jpg";
  startImage.onload = function() {
    ctx.drawImage(startImage, 0, 0, 500, 550);
  };

  var space;
  // Function Start Game
  function startGame() {
    mySound = new Sound("./sounds/bong.mp3");
    img.src = "./images/panier.png";
    img.onload = function() {
      ctx.drawImage(img, positionXpanier, 410, 100, 100);
      mySound.play();
    };
    for (let i = 0; i < lives; i++) {
      hearts.push(heart);
    }
    updateCanvas();
  }
  // Start Button
  document.getElementById("button").onclick = function() {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
    }
  };

  // Right and left
  document.onkeydown = function(event) {
    var key = event.keyCode;
    if (key === 37) {
      if (positionXpanier <= 0) {
        positionXpanier = 0;
      } else {
        positionXpanier -= 15;
      }
    } else if (key === 39) {
      if (positionXpanier >= 450) {
        positionXpanier = 450;
      } else {
        positionXpanier += 15;
      }
    }
  };

  var heart = new Image();
  heart.src = "./images/health.png";
  var hearts = [];
  function drawLives() {
    space = 0;
    for (let i = 0; i < lives; i++) {
      ctx.drawImage(heart, 10 + space, 10, 24, 24);
      space += 34;
    }
  }

var gameOver = false;

  // Function Random Obstacles
  function updateCanvas() {
    frame++;
    ctx.clearRect(0, 0, 550, 500);
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].y += 1; // rapidity
    }
    if (frame % 120 == 0) {
      var randomIndex = Math.floor(images.length * Math.random());
      var randomX = Math.floor(550 * Math.random());
      obstacles.push(
        new Obstacle(images[randomIndex], randomX, -50, 30, 50, 50)
      );
    }

    drawLives();

    ctx.drawImage(img, positionXpanier, 410, 100, 100);

    // Your score
    ctx.font = "18px sans-serif";
    ctx.fillText("Your Score :", 415, 30);

    for (var i = 0; i < obstacles.length; i++) {
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y);
      if (
        intersect(
          { x: positionXpanier, y: 410, width: 100, height: 100 },
          { x: obstacles[i].x, y: obstacles[i].y, width: 50, height: 50 }
        )
      ) {
        obstacles.splice(i, 1);
      }
      if (
        intersect(
          { x: obstacles[i].x, y: obstacles[i].y, width: 50, height: 50 },
          { y: 500 }
        )
      ) {
        obstacles.splice(i, 1);
        lives--;
      }
    }
    if (lives === 0) {
        gameOver = true;
      var endImage = new Image();
      endImage.src = "./images/fruits.jpg";
      endImage.onload = function() {
        ctx.drawImage(endImage, 0, 0, 500, 550);
        scream = new Sound("./sounds/end.mp3");
          scream.play();
      };
    }

    // Intersect basket-obstacles
    function intersect(positionXpanier, obstacles) {
      positionXpanierleft = positionXpanier.x;
      positionXpaniertop = positionXpanier.y;
      positionXpanierright = positionXpanier.x + positionXpanier.width;
      positionXpanierbottom = positionXpanier.y + positionXpanier.height;
      obstaclesleft = obstacles.x;
      obstaclestop = obstacles.y;
      obstaclesright = obstacles.x + obstacles.width;
      obstaclesbottom = obstacles.y + obstacles.height;
      return !(
        positionXpanierleft > obstaclesright ||
        positionXpanierright < obstaclesleft ||
        positionXpaniertop > obstaclesbottom ||
        positionXpanierbottom < obstaclestop
      );
    }

    if(!gameOver) requestAnimationFrame(updateCanvas);
  }
};
