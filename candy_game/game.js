let gridsize = 30;
let player;
let playerPosX = 300;
let playerPosY = 300;
let enemy;
let enemyPosX = randomInt(0, 20) * gridsize;
let enemyPosY = randomInt(0, 20) * gridsize;
let enemyRandomMove = randomInt(0, 3);
let grass;
let candy_1;
let candy_2;
let candy_3;
let grid = [];
let walkableSurfaceAmount = 10;
let randomGridvalue = randomInt(0, walkableSurfaceAmount);

function generateGrid() {
    randomGridvalue = randomInt(0, walkableSurfaceAmount);
    enemyPosX = randomInt(0, 20) * gridsize;
    enemyPosY = randomInt(0, 20) * gridsize;
    for (let y = 0; y < 20; y++) {
        grid[y] = [];
        for (let x = 0; x < 20; x++) {
            randomGridvalue = randomInt(0, walkableSurfaceAmount);

            if (y == 0 || y == 19) {
                grid[y].push('gameborder');
                continue;
            }

            if (x == 0 || x == 19) {
                grid[y].push('gameborder');
                continue;
            }

            if (randomGridvalue == 0) {
                grid[y].push('candy_1');
            }

            if (randomGridvalue == 1) {
                grid[y].push('candy_2');
            }

            if (randomGridvalue == 2) {
                grid[y].push('candy_3');
            }

            if (randomGridvalue >= 3) {
                grid[y].push('grass');
            }
        }
    }
}


function setup() {
    createCanvas(600, 600);
    player = loadImage('img/player.png');
    enemy = loadImage('img/enemy.png');
    grass = loadImage('img/grass.png');
    candy_1 = loadImage('img/candy_1.png');
    candy_2 = loadImage('img/candy_2.png');
    candy_3 = loadImage('img/candy_3.png');
    gameborder = loadImage('img/gameborder.png');
}

function draw() {
    let gridPosX = 0;
    let gridPosY = 0;
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            if (grid[y][x] == "gameborder") {
                image(gameborder, gridPosX, gridPosY);
            }

            if (grid[y][x] == "grass") {
                image(grass, gridPosX, gridPosY);
            }

            if (grid[y][x] == "candy_1") {
                image(candy_1, gridPosX, gridPosY);
            }

            if (grid[y][x] == "candy_2") {
                image(candy_2, gridPosX, gridPosY);
            }

            if (grid[y][x] == "candy_3") {
                image(candy_3, gridPosX, gridPosY);
            }
            gridPosX = gridPosX + gridsize;
        }
        gridPosX = 0;
        gridPosY = gridPosY + gridsize;
    }

    image(player, playerPosX, playerPosY);
    image(enemy, enemyPosX, enemyPosY);

}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let playerIsPushingBlockUp = false;
let playerIsPushingBlockDown = false;
let playerIsPushingBlockLeft = false;
let playerIsPushingBlockRight = false;

function keyPressed() {
    if (key == 's' || key == 'ArrowDown') {
        if (grid[(playerPosY / gridsize) + 1][(playerPosX / gridsize)] != "grass") {
            if (playerIsPushingBlockDown == true) {
                if (grid[(playerPosY / gridsize) + 1 + 1][(playerPosX / gridsize)] == "grass") {
                    grid[(playerPosY / gridsize) + 1 + 1][(playerPosX / gridsize)] = grid[(playerPosY / gridsize) + 1][(playerPosX / gridsize)];
                    grid[(playerPosY / gridsize) + 1][(playerPosX / gridsize)] = "grass";
                    playerIsPushingBlockDown = false;
                }
            }
            playerIsPushingBlockDown = true;
            return;
        }
        playerPosY += gridsize;
    }

    if (key == 'w' || key == 'ArrowUp') {
        if (grid[(playerPosY / gridsize) - 1][(playerPosX / gridsize)] != "grass") {
            if (playerIsPushingBlockUp == true) {
                if (grid[(playerPosY / gridsize) - 1 - 1][(playerPosX / gridsize)] == "grass") {
                    grid[(playerPosY / gridsize) - 1 - 1][(playerPosX / gridsize)] = grid[(playerPosY / gridsize) - 1][(playerPosX / gridsize)];
                    grid[(playerPosY / gridsize) - 1][(playerPosX / gridsize)] = "grass";
                    playerIsPushingBlockUp = false;
                }
            }
            playerIsPushingBlockUp = true;
            return;
        }
        playerPosY -= gridsize;
    }

    if (key == 'a' || key == 'ArrowLeft') {
        if (grid[(playerPosY / gridsize)][(playerPosX / gridsize) - 1] != "grass") {
            if (playerIsPushingBlockLeft == true) {
                if (grid[(playerPosY / gridsize)][(playerPosX / gridsize) - 1 - 1] == "grass") {
                    grid[(playerPosY / gridsize)][(playerPosX / gridsize) - 1 - 1] = grid[(playerPosY / gridsize)][(playerPosX / gridsize) - 1];
                    grid[(playerPosY / gridsize)][(playerPosX / gridsize) - 1] = "grass";
                    playerIsPushingBlockLeft = false;
                }
            }
            playerIsPushingBlockLeft = true;
            return;
        }
        playerPosX -= gridsize;
    }

    if (key == 'd' || key == 'ArrowRight') {
        if (grid[(playerPosY / gridsize)][(playerPosX / gridsize) + 1] != "grass") {
            if (playerIsPushingBlockRight == true) {
                if (grid[(playerPosY / gridsize)][(playerPosX / gridsize) + 1 + 1] == "grass") {
                    grid[(playerPosY / gridsize)][(playerPosX / gridsize) + 1 + 1] = grid[(playerPosY / gridsize)][(playerPosX / gridsize) + 1];
                    grid[(playerPosY / gridsize)][(playerPosX / gridsize) + 1] = "grass";
                    playerIsPushingBlockRight = false;
                }
            }
            playerIsPushingBlockRight = true;
            return;
        }
        playerPosX += gridsize;
    }

}

function moveEnemy() {
    try {
        let movedindirection = -1;
        if (randomInt(0, 3) == 0) {
            enemyRandomMove = randomInt(0, 3);
        }

        if (enemyRandomMove == 0) {
            if (grid[(enemyPosY / gridsize) + 1][(enemyPosX / gridsize)] != "grass") {
                if (grid[(enemyPosY / gridsize) + 1][(enemyPosX / gridsize)] == "gameborder") {
                    return;
                }
                grid[(enemyPosY / gridsize) + 1][(enemyPosX / gridsize)] = "grass";
                return;
            }
            movedindirection = 0;
            enemyPosY += gridsize;
        }

        if (enemyRandomMove == 1) {
            if (grid[(enemyPosY / gridsize) - 1][(enemyPosX / gridsize)] != "grass") {
                if (grid[(enemyPosY / gridsize) - 1][(enemyPosX / gridsize)] == "gameborder") {
                    return;
                }
                grid[(enemyPosY / gridsize) - 1][(enemyPosX / gridsize)] = "grass";
                return;
            }
            movedindirection = 1;
            enemyPosY -= gridsize;
        }

        if (enemyRandomMove == 2) {
            if (grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) - 1] != "grass") {
                if (grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) - 1] == "gameborder") {
                    return;
                }
                grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) - 1] = "grass";
                return;
            }
            movedindirection = 2;
            enemyPosX -= gridsize;
        }

        if (enemyRandomMove == 3) {
            if (grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) + 1] != "grass") {
                if (grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) + 1] == "gameborder") {
                    return;
                }
                grid[(enemyPosY / gridsize)][(enemyPosX / gridsize) + 1] = "grass";
                return;
            }
            movedindirection = 3;
            enemyPosX += gridsize;
        }

        if (movedindirection == -1) {
            // Enemy was unable to move in any direction
            enemyPosX = randomInt(0, 20) * gridsize;
            enemyPosY = randomInt(0, 20) * gridsize;
        }

    }
    catch (err) {
        // Enemy went outside the map
        enemyPosX = randomInt(0, 20) * gridsize;
        enemyPosY = randomInt(0, 20) * gridsize;
    }

}

function checkGameOverGameState() {
    if (playerPosX == enemyPosX && playerPosY == enemyPosY) {
        generateGrid();
        const node = document.createElement("h1");
        node.innerHTML = "Game Over, try again";
        document.body.appendChild(node);
        setTimeout(() => {
            document.getElementsByTagName("h1")[0].remove()
        }, 3000);

    }
}

function checkVictoryGameState() {
    hasCandy = false;
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            if (grid[y][x].includes("candy")) {
                hasCandy = true;
            }
        }
    }

    if (hasCandy == false) {
        walkableSurfaceAmount = walkableSurfaceAmount - 1;
        generateGrid()
    }
}

generateGrid();
myInterval = setInterval(moveEnemy, 300);
myInterval = setInterval(checkVictoryGameState, 300);
myInterval = setInterval(checkGameOverGameState, 50);