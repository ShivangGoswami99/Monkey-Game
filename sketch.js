var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var score = 0;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup,ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
monkey = createSprite(50,335,20,20);
monkey.addAnimation("monkey", monkey_running);
monkey.scale = 0.15;

ground = createSprite(400,395,800,30);
ground.velocityX = -4;
ground.shapeColor = "green";
ground.x = ground.width/2;

foodGroup = new Group();
obstaclesGroup = new Group();
}

function draw(){
  background("lightblue");
  textSize(20);
  stroke("black");
  
  textFont("TimesNewRoman");  
  text("Score: "+score,200,50);
  
 
  
  
  if(gameState===PLAY){
    
    
    
  score = score+Math.round(World.frameCount/100);
  if(ground.x > 0){
  ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y>333){
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY + 1;
  
   bananas();
  obstacles();
  
  if(monkey.isTouching(foodGroup)){
   foodGroup.destroyEach(); 
   score+=1000;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    gameState = END;
    
  }
  
  }
  
  else if(gameState===END){
    text("GAME OVER",200,200);
    monkey.destroy();
    ground.velocityX = 0;
    foodGroup.setVisibleEach(false);
    obstaclesGroup.setVisibleEach(false);
  }
  
  
  monkey.collide(ground);
   
    
 drawSprites();
 
}
  
  
   


function bananas(){
 if(World.frameCount%80===0){
   var banana = createSprite(400,200);
   banana.addAnimation("Banana",bananaImage);
   banana.scale = 0.05;
   banana.velocityX = -8;
   //console.log(banana.y);
  banana.y = random(150,225);
   monkey.depth = banana.depth +1;
   banana.lifetime = 100;
 foodGroup.add(banana);
 }
   
}


function obstacles(){
  if(World.frameCount%300===0){
    var obstacle = createSprite(400,355);
    obstacle.addAnimation("Stone",obstacleImage);
    obstacle.scale =0.2; 
    obstacle.velocityX = -8;
    obstacle.setCollider("circle",0,0)
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
 
    }
  
}



