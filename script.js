let canvas = document.getElementById('game-board')

canvas.width = 1000;
canvas.height = 1000;

let ctx = canvas.getContext('2d')

document.onkeydown = gameControls

let ladies = []



// class Road {
//   drawRoad = () => {
//     ctx.fillStyle="#bbb"
//     ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
//   }
// }


class Player {
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  loadPlayer = () => {
    let img = new Image();
    img.src = './images/warrior.png'
    
    img.onload = () => {
      this.img = img; 
      this.drawPlayer()
    }
  }
  movePlayer = (direction, value) => {
    this[direction] += value; 
  }
  drawPlayer = () => {
    ctx.drawImage(this.img, this.x,this.y,this.width,this.height)
  }
} 

class Monster {
  constructor(x,y, width, height){
      this.x =x;
      this.y =y;
      this.width = width;
      this.height = height;
      this.monster = null;
  }
  loadMonster = () =>{
    let obstacleImg = new Image(); 
    obstacleImg.src = './images/rock.png'
    obstacleImg.onload = () => {
      this.monster = obstacleImg; 
      ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
    }
  }

  moveMonster = () => {
    //var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    //this.x+=Math.random()*5*plusOrMinus;
    console.log(this)

    this.y++;
    if(this.y >600){
      
      ladies.shift();
    }
  }

  drawMonster = () => {
    ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
  }

}


// let road = new Road() 

let hero = new Player(250, 400, 64, 64) //Make my Player 
hero.loadPlayer()



function addMonster(){
  ladies.push(new Monster(Math.random()*canvas.width, 0, 32, 32))
}


function drawLadies() {
  ladies.forEach(girl=> {
    girl.loadMonster()
    girl.moveMonster()
    girl.drawMonster()

  })
}





function checkCollision(aframe) {
  ladies.forEach((Monster) => { //loop thru every Monster
    var rect1 = hero
    var rect2 = Monster
  
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
        // collision detected!
        console.log('collision')
        window.cancelAnimationFrame(aframe)
        return true;

    }
    // if(rect2.y >500){
    //   Monster.splice(Monster,1)
    // }
    return false;
  })

}

function gameControls(e) {
  if(e.key == 'w'&&hero.y>0){
    hero.movePlayer('y', -10)
  }
  if(e.key == 's'&&hero.y<510){
    hero.movePlayer('y', 10)
  }
  if(e.key == 'd'&&hero.y<540){
    hero.movePlayer('x', 10)
  }
  if(e.key == 'a'&&hero.y>0){
    hero.movePlayer('x' ,-10)
  }

}





let score = document.getElementById('score')
console
let frames = 0; 

function animate() { //lifeblood of your canvas app.  This cycle forever, clears everything and redraws everything

  frames++;

  let aframe = window.requestAnimationFrame(animate)
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight)


  //road.drawRoad()

  hero.drawPlayer()

  drawLadies()

  checkCollision();
//   ctx.fillStyle = "green";
//   //Left side border
// ctx.fillRect(0,0,40,550);
// //right side border
// ctx.fillRect(510,0,40,550);
// //bottom border
// ctx.fillRect(0,500,550,150);


  if(frames % 99 === 0){
    score.innerText = frames/33;
    addMonster()
  }
  if(frames % 66 === 0){
     score.innerText = frames/33;

  // if(checkCollision(aframe)){ //I hit the Monster 
  //   window.cancelAnimationFrame(aframe)
    
  }
  
  console.log(ladies.length)

}


//Start button 
setTimeout(animate, 1000)











 

