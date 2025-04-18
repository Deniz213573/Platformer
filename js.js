var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var gameTime = 0;
// player
var player = {x:160, y:340, width:100, height:100,xSpeed:0, ySpeed:0}
var player2 = {x:0, y:423, width:700, height:80,xSpeed:0, ySpeed:0}
var enemy = new Block(canvas.width,canvas.height - 50 - 100,50,100,-5)
function Block(x,y,width,height,xSpeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}
function Platform(x,y,width,height,xSpeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}
function drawPlatform(block){
    var img = new Image();
    img.src = "Earth.png"
    context.drawImage(img,block.x ,block.y,block.width,block.height);
}
var platform1 = new Platform(0,canvas.height - 50,canvas.width,50,-3);
var platform2 = new Platform(canvas.width,canvas.height - 50,canvas.width,50,-3);
function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    var pic1 = new Image();
    pic1.src = "block.png";
    context.drawImage(pic1,enemy.x, enemy.y, enemy.width, enemy.height);
    // context.clearRect(0,0,canvas.width,canvas.height);
    // context.fiilStyle = "black";
    // context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    var pic = new Image();
    pic.src = "Dan.png";
    context.drawImage(pic,player.x,player.y,player.width,player.height);
    drawPlatform(platform1);
    drawPlatform(platform2);
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Пройдено:" + gameTime, 10,30);
}
function updateGame(){
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    if (player.y >= canvas.height- player.height-50 ){
        player.y = canvas.height - player.height - 50;
        player.ySpeed = 0;
    }
    enemy.x += enemy.xSpeed

    if (enemy.x < 0 - enemy.width){
        enemy.x = canvas.width;
        enemy.width = Math.floor(Math.random()*100) + 50;
        enemy.height = Math.floor(Math.random()*200) + 50;
        enemy.y = canvas.height - 50 - enemy.height;
        enemy.xSpeed = (Math.floor(Math.random()*5) + 3)*-1;
    }
    platform1.x += platform1.xSpeed;
    platform2.x += platform2.xSpeed;
    if (platform1.x < 0-platform1.width){
        platform1.x = platform2.width - 10
    }
    if (platform2.x < 0-platform2.width){
        platform2.x = platform1.width- 10
    }
    gameTime ++;
}
function checkCollision(){
    if (player.x + player.width > enemy.x && player.x < enemy.x + enemy.width && player.y + player.height > enemy.y &&  player.y < enemy.y+ enemy.height){
        modal.style.display = "block";
        document.getElementById("message").innerHTML = "Проигрыш. Пройдено: " + gameTime
        game.stop();
    }
}
var modal = document.getElementById("myModal")
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
        location.reload()
    }
}
function onKeyPress(event){
    const key = event.key.toLowerCase();
    if(key === "a"){
        player.xSpeed = -5;
    }
    if(key === "d"){
        player.xSpeed = 5
    }
    if (key === " "){
        player.ySpeed =  -8
    }
}
function onKeyRelease(event){
    const key = event.key.toLowerCase();
    if(key === "a"|| key === "d"){
        player.xSpeed = 0;
    }
    if (key === " "){
        player.ySpeed =  5;
    }
}
window.addEventListener("keyup", onKeyRelease);
window.addEventListener("keydown", onKeyPress);
function tick(){
    checkCollision();
    updateGame();
    draw();
    game = window.setTimeout(tick, 1000/60);
}
tick()