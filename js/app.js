var startButton = document.querySelector('.playButton');
var gameMenu = document.getElementById('gameMenu');
var gameCanvas = document.getElementById('gameCanvas');

// Display the game menu at the beginning of the game
// Press the Play button will hide the game menu
gameCanvas.style.display = "none";
startButton.addEventListener('click', function() {
  gameMenu.style.display = "none";
  gameCanvas.style.display = "inline-block";
});

// Start the game with 0 score
let score = 0;

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
      // generate random speeds between 100 and 500
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
};

// Update the player's position, required method for game
// check if player win the game by checking if player reached the water
Player.prototype.update = function() {
  // Update player x position if its not off screen
  if (this.moveXDistance >= 0 && this.moveXDistance <= 404) {
    this.x = this.moveXDistance;
  }
  // Update player y position if its not off screen
  if (this.moveYDistance >= -15 && this.moveYDistance <= 400) {
    if (this.moveYDistance < this.y) {
      score += 10;
    }
    if (this.moveYDistance > this.y) {
      score -= 10;
      if (score < 0) score = 0;
    }
    this.y = this.moveYDistance;
  }
  // Player reach the water and WON!
  if (this.moveYDistance == -15) {
    this.win = true;
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
      this.reset();
      score = 0;
    }
  }
};

// Reset player's position back to initial location
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 400;
  this.moveXDistance = 202;
  this.moveYDistance = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 68, 100), new Enemy(101, 151, 200), new Enemy(202, 234, 300)];
// let allEnemies = [new Enemy(202, 234, 50)];
let player = new Player();

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
