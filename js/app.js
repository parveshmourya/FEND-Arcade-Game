/*
@description Represents winning popup
*/
function winPopup() {
    setTimeout(function() {
        // Get the modal
        var modal = document.getElementById('myModal');
     
        modal.style.display = "block";
    }, 200)
}

/*
@description Represents enemy
@param {int} x - x position coordinate for enemy object  
@param {int} y - y position coordinate for enemy object  
@param {int} vel - the rate at which the position of enemy object will change
*/
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

/*
@description Represents enemy position update method
@param {int} dt - a time delta between ticks
*/
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

    //collision check for the player and the enemy
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

/*
@description  Draw the enemy on the screen  
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
@description Represents Player
@param {int} x - x position coordinate for Player object  
@param {int} y - y position coordinate for Player object  
*/
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
/*
@description Represents Player position update method
@param {int} dt - a time delta between ticks
*/
Player.prototype.update = function() {
    
};

/*
@description Represents handling the movement via. the keys
@param {string} key - a time delta between ticks
*/
Player.prototype.handleInput = function(key) {
    if(this.y <= 60){
        console.log(this.y);
        this.y = -28;
        winPopup();
    }
    else{

    switch (key) {
        case 'up':
            console.log(this.y);
            this.y -= 80;
            console.log(this.y);
            break;
        case 'right':
            if (this.x >= 400){this.x = 400;}
            else{this.x += 100;}
            break;
        case 'down':
            console.log(this.y);
            if(this.y >= 380){
                this.y = 380;
            }    
            else { this.y += 80; }     
            break;
        case 'left':
            if (this.x <= 0)
                {this.x = 0;}
            else{this.x -= 100;}
            break;
    }

    }
};
/*
@description  Draw the player on the screen
*/
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



/*
@description  Event Listener for mapping keystroke event with their codes
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});