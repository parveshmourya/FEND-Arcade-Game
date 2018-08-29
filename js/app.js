//winning popup
function winPopup() {
    setTimeout(function() {
        // Get the modal
        var modal = document.getElementById('myModal');
     
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 

        modal.style.display = "block";

       
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }, 200)
}

// Enemies our player must avoid
var Enemy = function(x, y, vel) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.vel = vel;
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
    this.x += this.vel * dt;
    //when off the canvas then reset the position of the enemies
    if (this.x > 500) {
        this.x = -10;
        this.vel = 100 + Math.floor(Math.random() * 128)
    }

    if (player.x > this.x - 60 && player.x < this.x + 50 && player.y < this.y + 50 && player.y > this.y-50) {
        player.x = 200;
        player.y = 380;


        // toggle background after collision between player and enemies
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 200);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // this.position = position;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    //control if the movement is beyond the canvas
    if (this.y > 380)
        this.y = 380;
    if (this.x < 0)
        this.x = 0;
    if (this.x > 400)
        this.x = 400;

    //for the top i.e. for the winning condition
    if (this.y < 0) {
        console.log(this.y);
        this.y = -28;
        winPopup();
    }

};
//handle the movement via. the keys
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 80;
            break;
        case 'left':
            this.x -= 100;
            break;
    }

};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [];
// Place the player object in a variable called player 
var enemyStartPosition = [60, 150, 230];
var player = new Player(200, 380);
var enemy;

enemyStartPosition.forEach(function(enemyYPos) {
    enemy = new Enemy(0, enemyYPos, 100 + Math.floor(Math.random() * 256));
    allEnemies.push(enemy)
});



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