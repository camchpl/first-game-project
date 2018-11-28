// Canvas setup
window.onload = function() {
  var canvas = document.getElementById("game-board");
  var myAudio = document.createElement("audio");
  var ctx = canvas.getContext("2d");
  var gameStarted = false;
  var lives = 3;
  var score = 0;
  var speed = 2;

  // Declarations
  var positionXpanier = 220;
  var img = new Image();
  var obstacles = [];
  var images = ["images/banana.png", "images/orange.png", "images/fruit1.png"];
  var frame = 0;

  // Sounds
  var mySound;

  // Form name
//   $(window).load(function () {
//     $(".popUp").click(function(){
//        $('.popUp').show();
//     });
//     $('.popUp').click(function(){
//         $('.popUp').hide();
//     });
//     $('.popupCloseButton').click(function(){
//         $('.popUp').hide();
//     });
// });

  // First image, before starting
  var startImage = new Image();
  startImage.src = "./images/start.png";
  startImage.onload = function() {
    ctx.drawImage(startImage, 0, 0);
    ctx.font = "bold 25px Dosis";
    ctx.fillText(
      "Try to catch up the fruits before they hit the ground !",
      32,
      200
    ),
      //       setTimeout(function){
      //  canvas.value ="Use the left and right arrow to control your basket" }, 2000;
      ctx.font = "bold 22px Dosis";
      ctx.fillText("Use the left and right arrow to control your basket",
        71,
        290);
      (ctx.font = "bold 14px Dosis");
    ctx.fillText("And find the hidden lemon on the page !", 170, 442);
  };

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

  // Click on the tree
  //   var arbre = 298, 218;
  // //  canvas.addEventListener('click', function(drawTree) {
  // // for (var i = 0; i < arbre.length; i++)


  // Right and left
  document.onkeydown = function(event) {
    var key = event.keyCode;
    if (key === 37) {
      if (positionXpanier <= 0) {
        positionXpanier = -20;
      } else {
        positionXpanier -= 15;
      }
    } else if (key === 39) {
      if (positionXpanier >= 450) {
        positionXpanier = 470;
      } else {
        positionXpanier += 15;
      }
    }
  };

  // Hearts images
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
      obstacles[i].y += speed; // rapidity
    }
    if (frame % 120 == 0) {
      var randomIndex = Math.floor(images.length * Math.random());
      var randomX = Math.floor(550 * Math.random());
      obstacles.push(
        new Obstacle(images[randomIndex], randomX, -50, 30, 50, 50)
      );
    }

    // Moving cloud
    var movingClouds = 3;
    for (let i = 0; i < movingClouds; i++) {
    movingClouds.x += 2;
    }

    drawLives();

    //Background grass
    var grass = new Image();
    grass.src = "./images/grass.png";
    ctx.drawImage(grass, 125, 440);

    // Background tree
    var tree = new Image();
    tree.src = "./images/tree.png";
    ctx.drawImage(tree, 298, 218, 287, 287);

  // Draw the basket
   ctx.drawImage(img, positionXpanier, 410, 100, 100);

   // Background cloud
    var cloud = new Image();
    cloud.src = "./images/clouds.png";
    ctx.drawImage(cloud, 180, 50, 150, 150);

    // Design - score
    ctx.font = " bold 18px Dosis";
    ctx.fillText("Your Score : " + score, 415, 30);

    // Consequences of obstacles and sounds
    for (var i = 0; i < obstacles.length; i++) {
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y);

      if (
        intersect(
          { x: positionXpanier, y: 410, width: 100, height: 100 },
          { x: obstacles[i].x, y: obstacles[i].y, width: 50, height: 50 }
        )
      ) {
        obstacles.splice(i, 1);
        plash = new Sound("./sounds/plash.mp3");
        plash.play();
        score += 1;
        if (score % 10 == 0) {
          speed += 2;
        }
      }
      if (obstacles[i] &&
        intersect(
          { x: obstacles[i].x, y: obstacles[i].y, width: 50, height: 50 },
          { y: 500 }
        )
      ) {
        obstacles.splice(i, 1);
        lives--;
        splash = new Sound("./sounds/splash.mp3");
        splash.play();
      }
      
    }

    // Game Over
    if (lives === 0) {
      gameOver = true;
      var endImage = new Image();
      endImage.src = "./images/end.png";
      endImage.onload = function() {
        ctx.drawImage(endImage, 0, 0);
        scream = new Sound("./sounds/end.mp3");
        scream.play();
        ctx.font = "bold 40px Dosis";
        ctx.fillText("GAME OVER", 180, 250);
      };
      $('popUp').show();
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

    if (!gameOver) requestAnimationFrame(updateCanvas);
  }
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };



};

// //function restart() {
//   if (clearInterval(interval)) frames = 0;
//   score = 0;
// }
