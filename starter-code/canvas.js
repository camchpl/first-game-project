// Canvas setup
window.onload = function() {
  var canvas = document.getElementById("game-board");
  var ctx = canvas.getContext("2d");
  var positionXpanier = 220;
  var img = new Image();
  var obstacles = [];
  var images = [
    "images/banana.png",
    "images/blueberries.png",
    "images/orange.png",
    "images/fruit1.png",
  ];
  var frame = 0;

  // Sounds
  //var soundFruits
  //var soundGameOver = new sound()

  // Function Start Game
  function startGame() {
    img.src = "./images/panier.png";
    img.onload = function() {
      ctx.drawImage(img, positionXpanier, 410, 100, 100);
    };
  }
  // Start Button
  document.getElementById("button").onclick = function() {
    startGame();
    updateCanvas();
  };

  // Right and left
  document.onkeydown = function(event) {
    var key = event.keyCode;
    if (key === 37) {
      positionXpanier -= 10;
    } else if (key === 39) {
      positionXpanier += 10;
    }
  };

 // Function Random Obstacles
  function updateCanvas() {

    frame++;
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].y += 1; // rapidity
    }
    if (frame % 120 == 0) {
      var randomIndex = Math.floor(images.length * Math.random());
      var randomX = Math.floor(550 * Math.random());
      obstacles.push(new Obstacle(images[randomIndex], randomX,-50, 30, 50, 50));
    }

    ctx.clearRect(0, 0, 550, 500);
    ctx.drawImage(img, positionXpanier, 410, 100, 100);
    for (var i = 0; i < obstacles.length; i++) {
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y);
    }
    window.requestAnimationFrame(updateCanvas);

// Intersect

  }
}




// Function Game Over

// Function Start Again

// Function Write Score
function printmyScore() {
  UpdateScore();
}

function UpdateScore() {
  scoreText.text = "Score: " + score;
}
