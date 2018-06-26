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
};

// Update the player's position, required method for game
Player.prototype.update = function() {

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
  switch (keypressed) {
    case 'left':
      if (this.x <= 0) {
        this.x = 0;
      } else {
        this.x -= 101;
      }
      break;
    case 'right':

      if (this.x >= 404) {
        this.x = 404;
      } else {
        this.x += 101;
      }
      break;
    case 'up':
      this.y -= 83;
      // reach the water, win the game
      if (this.y <= -15) {
        // reset player to initial position
        this.y = 400;
        this.x = 202;
      }
      break;
    case 'down':
      if (this.y >= 400) {
        this.y = 400;
      } else {
        this.y += 83;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 63, 100), new Enemy(101, 146, 150), new Enemy(202, 229, 200)];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
