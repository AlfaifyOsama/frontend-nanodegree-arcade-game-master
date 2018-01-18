// Enemies our player must avoid
//score to make more fun
var score = 0 ;
document.getElementById('playerScore').innerHTML = score;
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    // set a random speed to th enemy
    this.speed= Math.floor((Math.random() * 4)+1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 101 * dt * this.speed;
    //if the bug is off canvas
    if (this.x > 505) {
     this.x = -90;
    }
    //check collisions
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        score=0;
        document.getElementById('playerScore').innerHTML = score;
        player.reset()
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    // set the player's location
    this.x = x;
    this.y = y;
    // set the players image
    this.sprite = 'images/char-boy.png';
};
// update the players position
Player.prototype.update = function () {
    this.x = this.x;
    this.y = this.y;
};

// draw player on cnvas
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// change players position based on users key press
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= 101;
    }
    if (keyPress === 'right') {
        this.x += 101;
    }
    if (keyPress === 'up') {
        this.y -= 80;
    }
    if (keyPress === 'down') {
        this.y += 80;
    }
    //if the player is off canvas from left dont allow it to move any forther
    if (this.x < 0) {
        this.x = 10;
    }
    //if the player is off canvas from right dont allow it to move any forther
    if (this.x > 400) {
        this.x = 400;
    }
    //if the player is going down with y off canvas bring it back on canvas
    if (this.y > 380) {
        this.y = 380;
    }
    //check to see if the player reached the top then reset the game
    if (this.y <= -20 && this.x > 0 && this.x < 606) {
        score++;
        document.getElementById('playerScore').innerHTML = score;
        player.reset();
    }
};

//called when the player is reset to the starting point
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
var firstEnemy = new Enemy(-90, 60);
var secondEnemy = new Enemy(-190, 140);
var thiredEnemy = new Enemy(-290, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [firstEnemy, secondEnemy, thiredEnemy];
// Place the player object in a variable called player
var player = new Player(200, 380);

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
