const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var Score;
var Counter;
var backgroundImg;
var snow1,snow1_Img;
var obstacle;
var bg,bg1,bg2;
var ice=[];
var snowman,snowman_Img;
var ground;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

function preload(){
  bg=loadImage("snow1.jpg");
  bg1=loadImage("snow2.jpg");
  snow1_Img=loadImage("snow4.webp");
  snowman_Img=loadAnimation("https://i.postimg.cc/1nThmZ1w/imageonline-giftopng-87799-1-removebg-preview.png", "https://i.postimg.cc/v1NS9L2d/imageonline-giftopng-87799-10-removebg-preview.png","https://i.postimg.cc/cgtkcgPt/imageonline-giftopng-87799-11-removebg-preview.png","https://i.postimg.cc/9zTNR9Gv/imageonline-giftopng-87799-12-removebg-preview.png"," https://i.postimg.cc/1g5LDz9D/imageonline-giftopng-87799-2-removebg-preview.png","https://i.postimg.cc/jwBmVQyh/imageonline-giftopng-87799-5-removebg-preview.png","https://i.postimg.cc/7J7cqGVr/imageonline-giftopng-87799-6-removebg-preview.png","https://i.postimg.cc/hh7NL6qZ/imageonline-giftopng-87799-7-removebg-preview.png"," https://i.postimg.cc/KRPVVTjn/imageonline-giftopng-87799-8-removebg-preview.png","https://i.postimg.cc/2q6KVXww/imageonline-giftopng-87799-9-removebg-preview.png"," https://i.postimg.cc/rKkZSpjz/imageonline-giftopng-877997-3-removebg-preview.png","https://i.postimg.cc/sv46KRHm/imageonline-giftopng-877997-4-removebg-preview.png");
  snowman_stand=loadAnimation("https://i.postimg.cc/v1NS9L2d/imageonline-giftopng-87799-10-removebg-preview.png");
  obstacle1 = loadImage("https://i.postimg.cc/f3CsFhgt/obstacle1.png");
  obstacle2 = loadImage("https://i.postimg.cc/zHb1VHDK/obstacle2.png");
  obstacle3 = loadImage("https://i.postimg.cc/pypv04Qr/obstacle3.png");
  obstacle4 = loadImage("https://i.postimg.cc/4nqgjPw5/obstacle4.png");
  obstacle5 = loadImage("https://i.postimg.cc/tY6jb6MH/obstacle5.png");
  obstacle6 = loadImage("https://i.postimg.cc/k2FP6mC1/obstacle6.png");
}
function setup() {
  var Canvas =createCanvas(windowWidth,520);

  engine = Engine.create();
  world = engine.world;

  snow1= createSprite(width/4, height/4, 50, 50);
  snow1.addImage(snow1_Img);
  snow1.scale=0.14;
  snow1.visible=false;

  snowman = createSprite(width/9,height/2);
  snowman.addAnimation("snowman",snowman_Img);
  snowman.addAnimation("snowman_stand",snowman_stand);
  snowman.scale=1.5;
  snowman.visible=false;
  snowman.velocityX=3;
               
  ground=createSprite(width/9,510,1400,20);
  ground.shapecolor="brown";
ground.velocityX=-5;
  ground.visible=false;

bg.velocityX=-5;

  if(frameCount % 1000 === 0){
    for(var i=0; i<=100; i++){
    ice.push(new Snow(random(0,1350), random(0,790)));
    }
    }
    Score=15;
    Counter=0;
    obstaclesGroup = createGroup();
}

function draw() {
 
    background(bg);
    
    Engine.update(engine);   
  snow1.visible=true;
  snowman.visible=true;
  
  for(var i = 0; i<=100; i++){
    ice[i].display();
    ice[i].changePosition();
}
snowman.collide(ground);
Counter=Counter+round(getFrameRate()/50);
console.log(Counter);
if(Counter===2000){
  Score=Score+2;
}
if(Counter===5000){
  Score=Score+5;
}
if(Counter===8000){
  Score=Score+7;
}
if(Counter===10000){
  Score=Score+10;
}
if(snowman.isTouching(obstaclesGroup)){
Score= Score- 1;  
obstaclesGroup.destroyEach();
}
if(snowman.x>=width/1 ){
  snowman.x=width/8;
}




if(ground.x<=width/2){
  ground.x= width/2;
}
spawnObstacles();

  if(keyDown("space") && snowman.y >=height/2.3){
    snowman.velocityY=-12;
    snowman.changeAnimation("snowman_stand");
  }else{
    snowman.changeAnimation("snowman");
  }


  if(snowman.y>height/1){
    snowman.changeAnimation("snowman_stand");
  }
  snowman.velocityY = snowman.velocityY + 0.6;

  

  drawSprites();
  noStroke();
  fill("blue");
  textSize(20);
  text("Score : "+Score,width/1.2,width/12);
}

function spawnObstacles(){
  if (frameCount % 270  === 0){
   obstacle = createSprite(width/1,height/1.2,10,40);
    obstacle.velocityX = -(2 + round(getFrameRate()/45 ));
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     if(obstacle.x<width/1 && obstacle.x>width/9){
       obstaclesGroup.destroyEach();
     }
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
     obstacle.depth=snowman.depth;
     snowman.depth=snowman.depth+1;
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

function keyPressing(){
  if(snowman.y >=height/1.9){
    snowman.velocityY=-15;
    snowman.changeAnimation("snowman_stand");
  }else{
    snowman.changeAnimation("snowman");
  }
}