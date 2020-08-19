var monkey, monkey_running, banana, banana2, bananaImage, jungle, background, stone, stoneImage, invisibleGround, restartImage, gameOverImage;



var PLAY = 1;
var END = 0;
var gameState = PLAY;

  var lives = 2;

 var score = 0;


function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
 
  
  bananaImage = loadImage("banana.png");
  
  backgroundImage = loadImage("openland.jpg");
  
  stoneImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameover1.png");
  
  restartImage = loadImage("restart1.jpg");
}
function setup() {
  createCanvas(600, 400);
  
  jungle = createSprite(200,200,600,400);
  jungle.addAnimation( "background", backgroundImage);
  jungle.scale = 1.5
  jungle.x = jungle.width/2
  jungle.velocityX = -4;
  

  
  monkey = createSprite(50,330,30,30);
  monkey.addAnimation( "running", monkey_running);
  monkey.scale = 0.05
  monkey.setCollider("circle", 0, 0, 24);
  
  
  
  
  invisibleGround = createSprite(0,365, 600, 40);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100,30,30);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.1;
  gameOver.visible = false
  
  restart = createSprite(300,200,30,30);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  restart.visible = false
  
  bananaGroup = new Group();
  banana2Group = new Group();
  stonesGroup = new Group();
  
}

function draw() {
  background(220);
  
  
  if(gameState === PLAY){
   monkey.collide(invisibleGround); 
    
    
    if(jungle.x < 0){
         jungle.x = jungle.width/2
    }
    
    if(keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -10; 
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnBananas();
    Banana2();
    spawnStones();

    
    if(monkey.isTouching(bananaGroup)){
         score = score + 2
        bananaGroup.destroyEach();
  }
    
     if(monkey.isTouching(banana2Group)){
         score = score + 2
       banana2Group.destroyEach();
  }
   
    
    console.log(gameState);
    
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default: break;
      
  } 
    
    if(monkey.isTouching(stonesGroup)){
      monkey.scale = 0.2;
      lives = lives -1;
      stonesGroup.destroyEach();
    }
    
    if(lives === 0){
      gameState = END;
      monkey.scale = 0.1;
    }
     
  }
  
   else if(gameState === END){
      jungle.velocityX = 0;
      monkey.velocityY = 0;
    
     stonesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     banana2Group.setVelocityXEach(0);
     
     gameOver.visible = true;
     restart.visible = true;
     
     stonesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     banana2Group.setLifetimeEach(-1);
          
  }
  
  
  if(mousePressedOver(restart)){
    reset();
  }
  
   
    
  
   
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 500, 50);
}


function reset(){
  gameState = PLAY;
  score = 0;
  lives = 2;
  bananaGroup.destroyEach();
  banana2Group.destroyEach();
  stonesGroup.destroyEach();
  
  jungle.velocityX = -4;
  
  gameOver.visible = false;
  restart.visible = false;
  
}

function spawnBananas(){
  if(frameCount % 200 === 0){
    banana = createSprite(600,350 ,80,80);
    banana.y = Math.round(random(200,280));
    banana.addImage(bananaImage);
    banana.scale = 0.04;
    banana.velocityX = -3;
    
  
    bananaGroup.add(banana);
    
    
    
  }
  
}


function Banana2(){
  if(frameCount % 180 === 0){
    banana2 = createSprite(600,350,30,30);
    banana2.y = Math.round(random(200,280));
    banana2.addImage(bananaImage);
    banana2.scale = 0.04;
    banana2.velocityX = -3;
    
   
    banana2Group.add(banana2);
    
    
    
  }

}  


function spawnStones(){
  if(frameCount % 130 === 0){
    stones = createSprite(600,350,10,10);
    stones.addImage(stoneImage);
    stones.scale = 0.20;
    stones.velocityX = -5;
    
    stonesGroup.add(stones);
    
    
   
    stones.depth = monkey.depth
    monkey.depth = monkey.depth + 1
  }
}


