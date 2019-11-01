let canvas = document.getElementById('game-board')

canvas.width = 550;
canvas.height = 550;

let ctx = canvas.getContext('2d')

document.onkeydown = gameControls

let ladies = []



class Road {
  drawRoad = () => {
    ctx.fillStyle="#bbb"
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
  }
}


class Car {
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  loadCar = () => {
    let img = new Image();
    img.src = './images/warrior.png'
    
    img.onload = () => {
      this.img = img; 
      this.drawCar()
    }
  }
  moveCar = (direction, value) => {
    this[direction] += value; 
  }
  drawCar = () => {
    ctx.drawImage(this.img, this.x,this.y,this.width,this.height)
  }
} 

class Lady {
  constructor(x,y, width, height){
      this.x =x;
      this.y =y;
      this.width = width;
      this.height = height;
      this.lady = null;
  }
  loadLady = () =>{
    let obstacleImg = new Image(); 
    obstacleImg.src = './images/woman.png'
    obstacleImg.onload = () => {
      this.lady = obstacleImg; 
      ctx.drawImage(this.lady, this.x, this.y, this.width, this.height)
    }
  }

  moveLady = () => {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.x+=Math.random()*5*plusOrMinus;
    this.y++;
  }

  drawLady = () => {
    ctx.drawImage(this.lady, this.x, this.y, this.width, this.height)
  }

}


let road = new Road() 

let camero = new Car(250, 400, 40, 80) //Make my car 
camero.loadCar()



function addLady(){
  ladies.push(new Lady(Math.random()*canvas.width, 0, 40, 50))
}


function drawLadies() {
  ladies.forEach(girl=> {
    girl.loadLady()
    girl.moveLady()
    girl.drawLady()

  })
}





function checkCollision(aframe) {
  ladies.forEach((lady) => { //loop thru every lady
    var rect1 = camero
    var rect2 = lady
  
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
    //   Lady.splice(lady,1)
    // }
    return false;
  })

}

function gameControls(e) {
  if(e.key == 'ArrowUp'&&camero.y>0){
    camero.moveCar('y', -10)
  }
  if(e.key == 'ArrowDown'&&camero.y<510){
    camero.moveCar('y', 10)
  }
  if(e.key == 'ArrowRight'&&camero.y<540){
    camero.moveCar('x', 10)
  }
  if(e.key == 'ArrowLeft'&&camero.y>0){
    camero.moveCar('x' ,-10)
  }

}





let score = document.getElementById('score')
console
let frames = 0; 

function animate() { //lifeblood of your canvas app.  This cycle forever, clears everything and redraws everything

  frames++;

  let aframe = window.requestAnimationFrame(animate)
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight)


  road.drawRoad()

  camero.drawCar()

  drawLadies()

  ctx.fillStyle = "green";
  //Left side border
ctx.fillRect(0,0,40,550);
//right side border
ctx.fillRect(510,0,40,550);
//bottom border
ctx.fillRect(0,500,550,150);


  if(frames % 66 === 0){
    score.innerText = frames/33;
    addLady()
  }

  if(checkCollision(aframe)){ //I hit the lady 
    window.cancelAnimationFrame(aframe)
    
  }
  
  

}


//Start button 
setTimeout(animate, 1000)











 

