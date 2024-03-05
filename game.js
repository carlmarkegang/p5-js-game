
let backgroundPixels = [];
let range = 2;
let quality = 80;
let playerX = 50;
let playerY = 50;
let playerXVel = 0;
let playerYVel = 0;
let playerSpeed = 8;

let coinX = randomInt(range, quality - range);
let coinY = randomInt(range, quality - range);
let coinWidth = 8;

let imgleaf;


function preload() {
    imgleaf = loadImage("leaf.png");
}

function create_backgroundPixel(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.width = 1;
    this.height = 1;
}


function setup() {
    createCanvas(quality, quality);
    for (let x = 0; x < quality; x++) {
        for (let y = 0; y < quality; y++) {
            backgroundPixels.push(new create_backgroundPixel(x, y, 30, 30, 30));
        }
    }
    frameRate(50)
}


function draw() {
    background(30)
    noStroke();

    
    if (keyIsDown(LEFT_ARROW)) {
        playerXVel = -playerSpeed;
        playerYVel = 0;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        playerXVel = playerSpeed;
        playerYVel = 0;
    }

    if (keyIsDown(UP_ARROW)) {
        playerYVel = -playerSpeed;
        playerXVel = 0;
    }

    if (keyIsDown(DOWN_ARROW)) {
        playerYVel = playerSpeed;
        playerXVel = 0;
    }

    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].active == false) {
            let distance = Math.sqrt(Math.pow(playerX - backgroundPixels[i].x, 2) + Math.pow(playerY - backgroundPixels[i].y, 2));
            if (distance <= range) {
                backgroundPixels[i].active = true;
            }
        }
        if (backgroundPixels[i].active) {
            fill(color(125, 27, 179));
        } else {
            fill(color(30, 30, 30));
        }

        rect(backgroundPixels[i].x, backgroundPixels[i].y, backgroundPixels[i].width, backgroundPixels[i].height);
    }

    noSmooth();
    image(imgleaf, coinX-coinWidth/2, coinY-coinWidth/2);
 
    let distanceCoin = Math.sqrt(Math.pow(playerX - coinX, 2) + Math.pow(playerY - coinY, 2)) - coinWidth / 2;
    if (distanceCoin <= range) {
        coinX = randomInt(range, quality - range);
        coinY = randomInt(range, quality - range);
    }


    playerX = playerX += (playerXVel / 10);
    playerY = playerY += (playerYVel / 10);

    if (playerX < (0 - range) || playerX > (quality + range) || playerY < (0 - range) || playerY > (quality + range)) {
        frameRate(0);
    }

}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function fadeBackgroundPixels() {
    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].active == true) {
            if (randomInt(0, 5) == 0) {
                backgroundPixels[i].active = false;
            }
        }
    }

}

myInterval = setInterval(fadeBackgroundPixels, 100);
