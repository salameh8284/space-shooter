var bg
var ss,ssing
var gamestate='play'
var edges
var laser,laserGroup
var alien,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,alienGroup
var score = 0
function preload(){
bg=loadImage('assets/bj2.jpeg')
ssing=loadImage("assets/ss.png")
a1=loadImage('assets/a1.png')
a2=loadImage('assets/a2.png')
a3=loadImage('assets/a3.png')
a4=loadImage('assets/a4.png')
a5=loadImage('assets/a5.png')
a6=loadImage('assets/a6.png')
a7=loadImage('assets/a7.png')
a8=loadImage('assets/a8.png')
a9=loadImage('assets/a9.png')
a10=loadImage('assets/a10.png')
}

function setup(){
createCanvas(1600,800) 
ss=createSprite(100,400)
ss.addImage(ssing)
ss.scale=0.4
edges=createEdgeSprites()
laserGroup=new Group()
alienGroup=new Group()
}

function draw(){
background(bg)
drawSprites()
fill(255)
textSize(30)
text("score :"+score,50,50)
if(gamestate=="play"){
if(keyDown(UP_ARROW)){
ss.y-=5

}
if(keyDown(DOWN_ARROW)){
    ss.y+=5
    
    }
    ss.collide(edges[2])
    ss.collide(edges[3])

if(keyDown('space')){
releaseLaser()

}
spawnAliens()
laserGroup.isTouching(alienGroup,destroyAlien)

if(alienGroup.isTouching(ss)){
gamestate="end"


}
}
if(gamestate==='end'){
gameover()


}


}

function spawnAliens(){
if(frameCount%150===0){
    var ran=random(100,700)
alien = createSprite(1600,ran)
alien.velocityX=-7
var ranimg=Math.round(random(1,10))
switch(ranimg){
case 1:
    alien.addImage(a1)
    alien.scale=0.5
break
case 2:
    alien.addImage(a2)
    alien.scale=0.9
break
case 3:
    alien.addImage(a3)
    alien.scale=0.7
break
case 4:
    alien.addImage(a4)
    alien.scale=0.8
break
case 5:
    alien.addImage(a5)
    alien.scale=0.5
break
case 6:
    alien.addImage(a6)
    alien.scale=0.5
break
case 7:
    alien.addImage(a7)
    alien.scale=0.3
break
case 8:
    alien.addImage(a8)
    alien.scale=0.4
break
case 9:
    alien.addImage(a9)
    alien.scale=0.3
break
case 10:
    alien.addImage(a10)
    alien.scale=0.4
break

}
alien.lifetime=1600/7
alienGroup.add(alien)


}

}
function releaseLaser(){
laser = createSprite(200,ss.position.y,60,5)
laser.shapeColor='red'
laser.velocityX=10
laser.lifetime = 160
laserGroup.add(laser)
}
function destroyAlien(laser,alien){
alien.destroy()
laserGroup.destroyEach()
score+=10               

}
function gameover(){
alienGroup.destroyEach(
    swal({
title:'game over',
text:'try again ',
imageUrl:'assets/bj3.jpeg',
imageSize:'150x150',
confirmButtonText:'play again'

    },
    function(isConfirm){
if(isConfirm){
    location.reload()
}

    }
    )
)

}