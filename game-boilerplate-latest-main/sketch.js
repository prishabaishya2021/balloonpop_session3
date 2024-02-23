var bg,bg2;
var player,player_img;
var playbutton;
var aboutbutton;
var gameState = "wait";
var bullet,bullet_img

function preload(){
    bg=loadImage("assets/balloonpop.gif")
    bg2=loadImage("assets/bg2.jpg")
    player_img=loadImage("assets/gun.png")
    bullet_img=loadImage("assets/bullet.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/play.png")
    playbutton.position(360, 410)
    playbutton.size(190, 100)
    playbutton.hide()

    aboutbutton = createImg("assets/about.png")
    aboutbutton.position(650, 410)
    aboutbutton.size(190, 100)
    aboutbutton.hide()

    player = createSprite(140, 380)
    player.addImage("main", player_img)
    player.visible = false
    player.scale=0.4
}

function draw(){

    if (gameState === "wait") {


        background(bg)
        playbutton.show()
        aboutbutton.show()
        //background_music.play();
    }

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    })

    if (gameState == "about") {
        aboutgame();
    }

    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    if (gameState == "play") {
        //background_music.stop();
        background(bg2)
        player.visible = true

        movement()
    }
    drawSprites()

}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "shoot all the balloons to win\n Use Arrow keys to move up and down and space bar to shoot.",
        textAlign: "center",
        imageUrl: "assets/balloonpop.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's start",
        confirmButtonColor: "blue",
    },

        function () {
            gameState = "wait"
        }
    )

}

function movement() {

    if (player.y <= 60) {
        player.y = 60
    }

    if (player.y >= 550) {
        player.y = 550
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

}

function spawnBullets() {

    bullet = createSprite(player.x + 11, player.y-50, 20, 20);
    bullet.addImage(bullet_img);
    bullet.scale = 0.15;
    bullet.velocityX = 40;

    bullet.depth = player.depth;
    player.depth = player.depth + 1;

    bulletGroup.add(bullet);

}

function keyReleased() {
    if (keyCode === 32) {
        //shootSound.play();
        spawnBullets();
    }
}
