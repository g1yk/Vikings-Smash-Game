const ctx = document.getElementById("example").getContext('2d');  

    
  
class Game{
    constructor(){
        this.theHero = new Hero(180, 380, 40,50),
        //this.obstacleArray = []
    }

    // spawnObstacle(){
    //     let rX = Math.floor(Math.random() * 400);
    //     let rY = 0;
    //     let rWidth = Math.floor(Math.random() * 50) + 10;
    //     let rHeight = Math.floor(Math.random() * 50) + 10;
    //     let newObstacle = new Obstacle(rX, rY, rWidth, rHeight);
    //     this.obstacleArray.push(newObstacle);
    //     newObstacle.moveDownForever();
    // }

    // clearUnusedObstacles(){
    //     this.obstacleArray.forEach((ob, i)=>{
    //         if(ob.y > 400){
    //             this.obstacleArray.splice(i, 1)
    //         }
    //     })
    // }


    collisionDetect(futureX, futureY){
        let canMove = true;

        this.obstacleArray.forEach((obs)=>{

            console.log(futureX, futureY, this.theHero.width, this.theHero.height, obs.x, obs.y, obs.width, obs.height)

           
        if(futureX + this.theHero.width >= obs.x && futureX <= obs.x + obs.width 
            && futureY + this.theHero.height >= obs.y && futureY <= obs.y + obs.height){
                canMove = false
                score-=300;
                document.querySelector("body > div:nth-child(1) > span").innerText= score
                //alert("game over");
             }
        })
        score+=30;
        document.querySelector("body > div:nth-child(1) > span").innerText= score
        return canMove;
    }
}



class Hero{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }  
}
Hero.prototype.move = moveHero;

const carImg = new Image();
carImg.src = "./images/car.png"




function drawSelf(u, obs){
    if(obs){
        ctx.fillStyle = 'tomato'
        ctx.fillRect(u.x, u.y, u.width, u.height)
    } else{
        ctx.drawImage(carImg, u.x, u.y, u.width, u.height);
    }
    //ctx.fillRect(u.x, u.y, u.width, u.height)
}

let frames = 0;

function mainLoop(){
    frames++;

    ctx.clearRect(0,0,400,600);

    // this is where we draw the hero
    drawSelf(theGame.theHero, false);
    // then we draw all the obstacles
    theGame.obstacleArray.forEach((eachObstacle)=>{
        drawSelf(eachObstacle, true)
    })

    if(frames % 100 === 0){
        theGame.spawnObstacle()
    }

    
    requestAnimationFrame(mainLoop);
}



function moveHero(futureX, futureY){

    if(futureX + this.width <= 400 && futureX >= 0 && futureY + this.height <= 600 && futureY >= 0){
        this.x = futureX;
        this.y = futureY;
    }
    // if(futureX + hero.width >= 400){

    //     hero.x = futureX

    //     setTimeout(()=>{
    //         hero.x -= 30;
    //         hero.width = 35;
    //         hero.height = 35;
    //     },100)
        

    //     setTimeout(()=>{
    //         hero.width = 20;
    //         hero.height = 20;
    //     },200)
    // }
}

let speed = 15;


document.onkeydown = function(e){

 

    // if(e.key === "ArrowUp"){
    //     if(
    //         theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y -speed)
    //     ){
    //         theGame.theHero.move(theGame.theHero.x, theGame.theHero.y -speed)
    //     }

    // }
    // if(e.key === "ArrowDown"){
    //     if(
    //         theGame.collisionDetect(theGame.theHero.x, theGame.theHero.y +speed)
    //     ){
    //         theGame.theHero.move(theGame.theHero.x, theGame.theHero.y +speed)
    //     }
       
    // }
    if(e.key === "ArrowLeft"){
        if(
            theGame.collisionDetect(theGame.theHero.x - speed, theGame.theHero.y)
        ){
            theGame.theHero.move(theGame.theHero.x - speed, theGame.theHero.y)
        }
    }
    if(e.key === "ArrowRight"){
        if(
            theGame.collisionDetect(theGame.theHero.x + speed, theGame.theHero.y)
        ){
            theGame.theHero.move(theGame.theHero.x + speed, theGame.theHero.y)
        }
    }
}
   










class Obstacle{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    moveDownForever(){
       let blah = setInterval(()=>{
        //    each setInterval function gets a unique ID
        // were using blah here to save this ID
            this.y += 10;

            if(this.y > 600){
                clearInterval(blah)
            }

        },100)


    }

}
let score = 0
// let scoreTime = setInterval(()=>{
//     score+=5
//     document.querySelector("body > div:nth-child(1) > span").innerText= score

// },1000)


document.getElementById('start-button').onclick = startGame;


let theGame;

function startGame(){    
    theGame = new Game();
    
    score = 0;
    document.querySelector("body > div:nth-child(1) > span").innerText= score
    mainLoop();
    
}


function scoredown(){}