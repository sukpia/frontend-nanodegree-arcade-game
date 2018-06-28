# FEND Arcade Game

This project recreates the classic arcade game Frogger for Udacity FEND course.

## Prerequisites

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## How to Play

I implemented the following functionalities for this project.

### Basic Functionality
* This game has a Player and Enemies (Bugs).
* The goal of the player is to reach the water, without colliding into any bugs.
* The player can move left, right, up and down with keyboard arrow keys.
* The enemies move in varying speeds on the paved blocks.
* Once the player collides with an enemy, the game ends. Press Enter to restart.
* Once the player reaches the water the game is won. Press Enter to restart.

### Additional Functionality
* Added game menu with instructions at the beginning of the game
* Added collectible gems.
* Added Score, player scores 10 points for every step forward or collect a gem. Subtract 10 points for every step backward. Minimum score is 0 and maximum score is 100.
* Added time to time the game.
* When player wins, display the score and time.

## Future Improvements

* add multiple enemy types.
* add different difficulty levels as game progress.
* add scoreboard.
* add more grids.
