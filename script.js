let canvas = document.getElementById('game-board')

canvas.width = 1000;
canvas.height = 700;
backgroundMusic = new sound("./sounds/backgroundMusic.ogg");
backgroundMusic.play();
coinSound = new sound("./sounds/coinSound.wav");
laserShoot = new sound("./sounds/laserShoot.wav");
boom = new sound("./sounds/boom.wav");


let ctx = canvas.getContext('2d')


document.onkeydown = gameControls

let ladies = []
let diamonds = []
let score = document.getElementById('score')
let total = 0;
let health = 3;

// class Road {
//   drawRoad = () => {
//     ctx.fillStyle="#bbb"
//     ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
//   }
// }


class Player {
  constructor(x, y, width, height) {
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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Monster {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.monster = null;
  }
  loadRock = () => {
    let obstacleImg = new Image();
    obstacleImg.src = './images/rock.png'
    obstacleImg.onload = () => {
      this.monster = obstacleImg;
      ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
    }
  }
  loadDiamond = () => {
    let obstacleImg = new Image();
    obstacleImg.src = './images/diamond1.png'
    obstacleImg.onload = () => {
      this.monster = obstacleImg;
      ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
    }
  }

  moveRock = () => {
    //var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    //this.x+=Math.random()*5*plusOrMinus;
    //console.log(this)

    this.y++;
    if (this.y > 700) {
      total -= 100;
      score.innerHTML = total;
      health -= 1;
      console.log(health);

      ladies.shift();
    }
  }

  moveRockLvl2 = () => {
    this.y+=2;
    if (this.y > 700) {
      total -= 100;
      score.innerHTML = total;
      health -= 1;
      console.log(health);

      ladies.shift();
    }
  }
  moveDiamond = () => {
    //var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    //this.x+=Math.random()*5*plusOrMinus;
    //console.log(this)

    this.y++;
    if (this.y > 700) {
      diamonds.shift();
    }
  }

  drawRock = () => {
    ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
  }

  drawDiamond = () => {
    ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
  }

}



let hero = new Player(500, 636, 64, 64) //Make my Player 
hero.loadPlayer()



function scoreTotal() {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ', 490, 30);
  ctx.fillText(total, 550, 30);
  ctx.fillText('Lives:', 10, 30);
  ctx.fillText(health, 68, 30);

 }



function addRock() {
  ladies.push(new Monster(Math.random() * canvas.width - 5, 0, 32, 32))
}
function addDiamond() {
  diamonds.push(new Monster(Math.random() * canvas.width - 5, 0, 32, 32))
}


function drawLadies() {
  ladies.forEach(rock => {
    rock.loadRock()
    rock.moveRock()
    rock.drawRock()


  })
}

function drawLadiesLvl2() {
  ladies.forEach(rock => {
    rock.loadRock()
    rock.moveRockLvl2()
    rock.drawRock()

  })
}


function checkLvl() {
  if (total <= 2000) {
    drawLadies()
  } if (total > 2000) {
    drawLadiesLvl2()
  }
}
function drawGem() {
  diamonds.forEach(gem => {
    gem.loadDiamond()
    gem.moveDiamond()
    gem.drawDiamond()

  })
}

let laserTotal = 2
let lasers = [];

function drawLaser() {

  if (lasers.length)

    for (var i = 0; i < lasers.length; i++) {
      ctx.fillStyle = '#f00';
      ctx.fillRect(lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3])

    }
}

function moveLaser() {
  for (var i = 0; i < lasers.length; i++) {
    if (lasers[i][1] > -11) {
      lasers[i][1] -= 10;
    } else if (lasers[i][1] < -10) {
      lasers.splice(i, 1);
    }
  }

}



function hitTest() {
  let remove = false;
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < ladies.length; j++) {
      console.log(lasers[i][1])
      // if (lasers[i][1] <= ladies[j].y && lasers[i][0] <= ladies[j].x) {

      var rect2 = ladies[j]

      if (lasers[i][0] < rect2.x + rect2.width &&
        lasers[i][0] + lasers[i][2] > rect2.x &&
        lasers[i][1] < rect2.y + rect2.height &&
        lasers[i][1] + lasers[i][3] > rect2.y) {
        remove = true;
        ladies.splice(j, 1);
        boom.play();
        total += 100;
        score.innerHTML = total;
        //  ladies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed]);
      }
    }
    if (remove == true) {
      lasers.splice(i, 1);

      remove = false;
    }
  }
}






function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}





function checkCollision(aframe) {


  for (i = 0; i < ladies.length; i++) {
    var rect1 = hero
    var rect2 = ladies[i]

    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      // collision detected!

      ladies.splice(i, 1);
      total += 100;
      score.innerHTML = total;
      coinSound.play();
      console.log('collision')
      window.cancelAnimationFrame(aframe)
      return true;

    }

    return false;
  }

}

function checkCollision2(aframe) {

  for (i = 0; i < diamonds.length; i++) {
    var rect1 = hero
    var rect2 = diamonds[i]

    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      // collision detected!

      diamonds.splice(i, 1);
      total += 300;
      score.innerHTML = total;
      coinSound.play();
      console.log('collision')
      window.cancelAnimationFrame(aframe)
      return true;

    }

    return false;
  }

}



function gameControls(e) {
  // if(e.key == 'w'&&hero.y>0){
  //   hero.movePlayer('y', -15)
  // }
  // if(e.key == 's'&&hero.y<510){
  //   hero.movePlayer('y', 15)
  // }
  if (e.key == 'D' && hero.x < 934) {
    hero.movePlayer('x', 60)
  }
  if (e.key == 'A' && hero.x > 5) {
    hero.movePlayer('x', -60)
  }

  if(e.key == 'd'&&hero.x<934){
    
    hero.movePlayer('x', 15)
  }
  if(e.key == 'a'&&hero.x>5){
    hero.movePlayer('x' ,-15)
    
  }
  if (e.keyCode == 32 && lasers.length <= laserTotal) {
    lasers.push([hero.x + 25, hero.y - 20, 4, 20]);
    laserShoot.play();
  }


}





let frames = 0;

function animate() { //lifeblood of your canvas app.  This cycle forever, clears everything and redraws everything

  frames++;

  let aframe = window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)


  //road.drawRoad()

  hero.drawPlayer()
  scoreTotal()
  checkLvl()
  drawGem();

  checkCollision();
  checkCollision2();
  moveLaser()
  drawLaser()
  hitTest()



  if (frames % 99 === 0) {

    addRock()

  }
  if (frames % 270 === 0) {

    addDiamond()
  }

  let w = document.getElementById("end");
  let y = document.getElementById("game-board");

  // if(checkCollision(aframe)){ //I hit the Monster 
  //   window.cancelAnimationFrame(aframe)
  // }

  if(health <= 0){
    window.cancelAnimationFrame(aframe);
    //confirm("you lose")
    //if(confirm("you lose")) document.location = 'http://stackoverflow.com/';
  }
  if(health<1){
    w.style.display = "inline-flex";
    y.style.display = "none";
  }

}




//console.log(ladies.length)

function Start() {

  setTimeout(animate, 1000)
}










