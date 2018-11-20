// Canvas setup
window.onload = function() {
  var canvas = document.getElementById("game-board");
  var ctx = canvas.getContext("2d");

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
  var burger = ["images/burger.png"]
  var frame = 0;
  var score = 0;

  // Sounds
  //var soundStart;
  //var soundGameOver;

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

  // Borders canvas
  function moveLeft() {
    if (positionXpanier > 100) {
      positionXpanier -= 5;
    }
  }

  function moveRight() {
    if (positionXpanier < 150) positionXpanier += 5;
  }

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
      obstacles.push(
        new Obstacle(images[randomIndex], randomX, -50, 30, 50, 50)
      );
    }

    ctx.clearRect(0, 0, 550, 500);
    ctx.drawImage(img, positionXpanier, 410, 100, 100);
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
    }
    window.requestAnimationFrame(updateCanvas);

        // Function Print Score
  

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

    // Function Write Score

    // Function Game Over
    //function gameOver(){
    //  var score = 3 lives;
    // pause();
    // alert("Game Over. Your score was "+ score);
    // ctx.clearRect(0,0, canvas.width, canvas.height);
    // }

    // Function Start Again

    // Function Write Score


  }
};
