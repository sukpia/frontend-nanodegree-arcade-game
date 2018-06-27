var startButton = document.querySelector('.playButton');
var gameMenu = document.getElementById('gameMenu');
var gameCanvas = document.getElementById('gameCanvas');

// Display the game menu at the beginning of the game
// Press the Play button will hide the game menu
gameCanvas.style.display = "none";
startButton.addEventListener('click', function() {
  gameMenu.style.display = "none";
  gameCanvas.style.display = "inline-block";
  startTimer();
});

// Start the game with 0 score
let score = 0;

// variables for timer
var sec = 0,
    timerID;

// start timer function
// timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer() {
  function pad (val) {return val > 9 ? val : "0" + val; }

  timerID = setInterval( function() {
    document.getElementById('seconds').innerHTML = pad(++sec%60);
    document.getElementById('minutes').innerHTML = pad(parseInt(sec/60,10));
  }, 1000);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = 0;
      // generate random speeds between 100 and 300
      this.speed = Math.floor((Math.random() * 300) + 100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 400;
  this.moveXDistance = 202;
  this.moveYDistance = 400;
  this.win = false;
  this.row = 6;
  this.col = 2;
};

// Update the player's position, required method for game
// check if player win the game by checking if player reached the water
Player.prototype.update = function() {
  // If new x position is not off screen
  if (this.moveXDistance >= 0 && this.moveXDistance <= 404) {
    // if player is moving left, update player's column
    if (this.moveXDistance < this.x) {
      this.col -= 1;
    }
    // if player is moving right, update player's column
    if (this.moveXDistance > this.x) {
      this.col += 1;
    }
    // Update player x position
    this.x = this.moveXDistance;
  }
  // If new y position is not off screen
  if (this.moveYDistance >= -15 && this.moveYDistance <= 400) {
    // if player is moving up, add score and update player's row
    if (this.moveYDistance < this.y) {
      score += 10;
      this.row -= 1;
    }
    // if player is moving down, subtract score and update player's row
    if (this.moveYDistance > this.y) {
      score -= 10;
      this.row += 1;
      if (score < 0) score = 0;
    }
    // Update player y position
    this.y = this.moveYDistance;
  }
  // Check if player collected gems
  for (var i = 0; i < gems.length; i++) {
    if (this.row === gems[i].row && this.col === gems[i].col) {
      gems[i].collected = true;
      gems[i].col = 10; //assign to a column that is off screen.
      score += 10;
    }
  }
  // Player reach the water and WON!
  if (this.moveYDistance == -15) {
    this.win = true;
    clearInterval(timerID);
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Receive user input, required method for game
// Parameter: allowedKeys, the key user pressed
// Output: move the player according to the key pressed
//  1. left arrow - move player to the left
//  2. right arrow - move player to the right
//  3. up arrow - move player up
//  4. down arrow - move player down
Player.prototype.handleInput = function(keypressed) {
  if (!this.win) {
    switch (keypressed) {
      case 'left':
        this.moveXDistance = this.x - 101;
        break;
      case 'right':
        this.moveXDistance = this.x + 101;
        break;
      case 'up':
        this.moveYDistance = this.y - 83;
        break;
      case 'down':
        this.moveYDistance = this.y + 83;
        break;
    }
  } else {
    if (keypressed === 'enter') {
      this.win = false;
      gameReset();
    }
  }
};

// Player lost, reset the game
function gameReset() {
  // Reset timer
  document.getElementById('seconds').innerHTML = "00";
  document.getElementById('minutes').innerHTML = "00";
  clearInterval(timerID);
  sec = 0;
  startTimer();
  // Reset player's position back to initial location
  player.x = 202;
  player.y = 400;
  player.moveXDistance = 202;
  player.moveYDistance = 400;
  player.win = false;
  player.row = 6;
  player.col = 2;
  // Reset score
  score = 0;
  // Reset all gems
  for (var i = 0; i < gems.length; i++) {
    gems[i].reset();
  }
}

// Generate random columns for all gem
var Gem = function(color, row) {
  this.row = row;
  this.col = Math.round(Math.random() * 4);
  this.color = "images/Gem " + color + ".png";
  this.collected = false;
}

Gem.prototype.reset = function() {
  this.col = Math.round(Math.random() * 4);
  this.collected = false;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 68, 100), new Enemy(101, 151, 200), new Enemy(202, 234, 300)];
let player = new Player();
// Place the gem objects in an array called gems
// one blue gem, 2 green gems, and 2 orange gems
let gems = [new Gem("Blue", 2), new Gem("Green", 3), new Gem("Green", 4), new Gem("Orange", 5), new Gem("Orange", 5)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
