var PLAY
var END
var gameState
var ghost
var window
var restart
var gameover
var tower
var towerImg
var ghostImg
var windowImg
var restartImg
var gameoverImg
var towerImg
var restartImg
var score

function preload(){
    ghostImg = loadImage("ghost.png")
    windowImg = loadImage("window.png")
    restartImg = loadImage("rest.png")
    gameoverImg = loadImage("game.png")
    towerImg = loadImage("tower.jpg")
}

function setup() {
    createCanvas(600,500)
    ghost = createSprite(300,420,600,10)
    ghost.addImage(ghostImg)
    ghost.debug = false
    ghost.scale = 0.1
    ghost.setCollider("rectangle",0,0,ghost.width,ghost.height)

    gameover = createSprite(300,100)
    gameover.addImage(gameoverImg)

    restart = createSprite(300,180)
    restart.addImage(restartImg)

    window = createSprite(490,200)
    window.addImage(windowImg)

    tower = createSprite(600,500)
    tower.addImage(towerImg)

    windowsGroup = newGroup()

    score = 0

    createSprite(edges)
}

function draw() {
    background(tower)

    ghost.velocityY = ghostVelocityY + 0.08
    ghost.collide(bottomEdge)

    if (gamestate == PLAY) {
        gameover.visible = false
        restart.visible = false

        score = score + Math.round(getFrameRate()/60)

        spawnWindows()

        if (windowsGroup.isTouching(ghost)) {
            windowsGroup.destroyEach()
            ghost.destroy()
            gameState = END
        }

        tower.velocityY = -(4 + 3 * score/100)

        if (tower.y < 0) {
            tower.y = tower.width/2
        }

        if (keyDown("right_arrow")) {
            ghost.x = ghost.x + 2
        }

        if (keyDown("left_arrow")) {
            ghost.x = ghost.x - 2
        }
    }
}