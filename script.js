

let canvas = document.getElementById('game-board')

canvas.width = 1000;
canvas.height = 700;
backgroundMusic = new sound("./sounds/backgroundMusic.ogg");
//backgroundMusic.play();
coinSound = new sound("./sounds/coinSound.wav");
laserShoot = new sound("./sounds/laserShoot.wav");
boom = new sound("./sounds/boom.wav");
let diamondcount = 0;
hurtSound = new sound("./sounds/doh.mp3");
deathSound = new sound("./sounds/death.wav");
opening = new sound("./sounds/opening.mp3");
ending = new sound("./sounds/ending.mp3");
drop = new sound("./sounds/incorrect1.mp3")
opening.play();


let ctx = canvas.getContext('2d')


document.onkeydown = gameControls

let ladies = []
let diamonds = []
let bosses = []
let score = document.getElementById('score')
let total = 0;
let health = 10;
let level = 1;
let bossHeath = 25;
let finalscore = document.querySelector("#end > ul > li:nth-child(3) > span")

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

class Boss {
  constructor(x, y, width, height,health) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
  }
  loadBoss = () => {
    let img = new Image();
    img.src = './images/warrior.png'

    img.onload = () => {
      this.img = img;
      this.drawBoss()
    }
  }
  moveBoss = (direction, value) => {
    this[direction] += value;
  }

  drawBoss = () => {
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
      //ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
    }
  }
  loadDiamond = () => {
    let obstacleImg = new Image();
    obstacleImg.src = './images/diamond1.png'
    obstacleImg.onload = () => {
      this.monster = obstacleImg;
      //ctx.drawImage(this.monster, this.x, this.y, this.width, this.height)
    }
  }
  
  loadBoss = () => {
    let img = new Image();
    img.src = './images/warrior.png'

    img.onload = () => {
      this.img = img;
      this.drawBoss()
    }
  }

  moveBoss = (direction, value) => {
    this[direction] += value;
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
      drop.play();
      
      console.log(health);

      ladies.shift();
    }
  }


  moveRockLvl2 = () => {
    this.y += 1.5;
    if (this.y > 700) {
      total -= 100;
      score.innerHTML = total;
      health -= 1;
      console.log(health);

      ladies.shift();
    }
  }

  moveRockLvl3 = () => {
    this.y += 2;
    if (this.y > 700) {
      total -= 100;
      score.innerHTML = total;
      health -= 1;
      console.log(health);

      ladies.shift();
    }
  }

  moveRockLvl4 = () => {
    this.y += 2.5;
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


  drawBoss = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

  }
}






let hero = new Player(500, 636, 64, 64) //Make my Player 
hero.loadPlayer()

let boss = new Monster(490, 30, 64, 64)//makes the boss
boss.loadBoss()




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}






function scoreTotal() {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ', 490, 30);
  ctx.fillText(total, 550, 30);
  ctx.fillText('Lives:', 10, 30);
  ctx.fillText(health, 68, 30);
  ctx.fillText('Level: ', 10, 55);
  ctx.fillText(level, 70, 55);
}

function highScore() {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ', 490, 30);
  ctx.fillText(total, 550, 30);
  ctx.fillText('Lives:', 10, 30);
  ctx.fillText(health, 68, 30);
  ctx.fillText('Level: ', 10, 55);
  ctx.fillText(level, 70, 55);
}

function addRock() {
  ladies.push(new Monster(Math.random() * canvas.width - 5, 0, 32, 32))
}
function addDiamond() {
  diamonds.push(new Monster(Math.random() * canvas.width - 5, 0, 32, 32))
}

function addBoss(){
  bosses.push(new Monster(Math.random() * canvas.width - 5, 0, 32, 32))
}

function drawBosses(){
  bosses.forEach(boss=>{
    boss.loadBoss()
    boss.moveBoss()
    boss.drawBoss()
    // 
    
    
    
  }
    )
}
//DRAWING ROCKS and diamonds

function drawGem() {
  diamonds.forEach(gem => {
    gem.loadDiamond()
    gem.moveDiamond()
    gem.drawDiamond()

  })
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
function drawLadiesLvl3() {
  ladies.forEach(rock => {
    rock.loadRock()
    rock.moveRockLvl3()
    rock.drawRock()

  })
}
function drawLadiesLvl4() {
  ladies.forEach(rock => {
    rock.loadRock()
    rock.moveRockLvl4()
    rock.drawRock()

  })
}


function checkLvl() {  // LEVELS
  if (total <= 3999) {
    drawLadies()
    drawBosses()
  } 

  if (total >= 4000) {

    drawLadiesLvl2()
    level = 2
  } 
  if (total>=5000) {
    drawLadiesLvl3()
    level = 3
    } 
    if (total >= 8499) {
      drawLadiesLvl4()
      level = 4
    }
  
}

//LASERS AND BOSS LASER


let laserTotal = 2
let lasers = [];

let bossLaserTotal = 0
let bossLasers = [];

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


function drawBossLaser() {

  if (bossLasers.length)

    for (var i = 0; i < bossLasers.length; i++) {
      ctx.fillStyle = '#f01';
      ctx.fillRect(bossLasers[i][0], bossLasers[i][1], bossLasers[i][2], bossLasers[i][3])

    }
}

function moveBossLaser() {
  for (var i = 0; i < bossLasers.length; i++) {
    if (bossLasers[i][1] < 670) {
      bossLasers[i][1] += 10;
    } else if (bossLasers[i][1] >= 670) {
      bossLasers.splice(i, 1);              // but here after its 670, its working 
    }
  }
}

function bossHitTest() {  // BOSS CAN HIT US NOW
  let remove = false;
  for (var i = 0; i < bossLasers.length; i++) {

    // console.log(bossLasers[i][1])
    // if (bossLasers[i][1] <= ladies[j].y && bossLasers[i][0] <= ladies[j].x) {

    var rect2 = hero

    if (bossLasers[i][0] < rect2.x + rect2.width &&
      bossLasers[i][0] + bossLasers[i][2] > rect2.x &&
      bossLasers[i][1] < rect2.y + rect2.height &&
      bossLasers[i][1] + bossLasers[i][3] > rect2.y) {
      remove = true;
      console.log('HIT')
      bossLasers.splice(i, 1);  // this is not working, and i don't know why

    }
  }
  if (remove == true) {
    health -= 1
    
    bossLasers.splice(i, 0);

    remove = false;
  }
}



function hitTest() {  // CHECKING IF LASERS HIT THE ROCK
  let remove = false;
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < ladies.length; j++) {
      // console.log(lasers[i][1])
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


function hitEnemyTest() {  // FOR KILLING BOSS
  let remove = false;
  for (var i = 0; i < lasers.length; i++) {

    // console.log(lasers[i][1])
    // if (lasers[i][1] <= ladies[j].y && lasers[i][0] <= ladies[j].x) {

    var rect2 = boss

    if (lasers[i][0] < rect2.x + rect2.width &&
      lasers[i][0] + lasers[i][2] > rect2.x &&
      lasers[i][1] < rect2.y + rect2.height &&
      lasers[i][1] + lasers[i][3] > rect2.y) {
      remove = true;
      lasers.splice(i, 1);

      hurtSound.play();
      total += 25;
      score.innerHTML = total;
      //  ladies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed]);
    }
  }
  if (remove == true) {
    lasers.splice(i, 1);


    bossHeath -= 1
    console.log(bossHeath)
    if (bossHeath == 0) {
      deathSound.play();
      boss = false
    }
    remove = false;
  }
}


function moveAuto() {        // FUNCTION FOR MOVING BOSS

  function moveBossR() {
    if (boss.x < 934) {
      boss.moveBoss('x', 5)
    }
  }
  function moveBossL() {
    if (boss.x > 5) {
      boss.moveBoss('x', -5)

    }
  }

  if (getRandomInt(0, 2) == 0) {
    moveBossR()
    if (frames % 50 === 0) {

      bossLasers.push([boss.x + 25, boss.y + 20, 4, 20])
      console.log(frames, bossLasers.length)
      laserShoot.play()

    }



    // setTimeout(() => {
    //   lasers.push([boss.x + 25, boss.y + 20, 4, 20])
    //   console.log(lasers.length)
    // }, 1000 )


  }
  if (getRandomInt(0, 2) == 1) {
    moveBossL()
    //setTimeout(() => {lasers.push([boss.x + 25, boss.y + 20, 4, 20])}, 10000);
    //setTimeout(laserShoot.play(), 10000 )
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
      diamondcount++
      if (diamondcount % 5 === 0) {
        health++
      }

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

  if (e.key == 'd' && hero.x < 934) {

    hero.movePlayer('x', 15)
  }
  if (e.key == 'a' && hero.x > 5) {
    hero.movePlayer('x', -15)

  }
  if (e.key == 'o' && hero.x > 5) {
    health=0;

  }
  if (e.keyCode == 32 && lasers.length <= laserTotal) {
    lasers.push([hero.x + 25, hero.y - 20, 4, 20]);
    laserShoot.play();
  }

}
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
var relativeX = e.clientX - canvas.offsetLeft-30;
if(relativeX > 0 && relativeX < canvas.width) {
  hero.x = relativeX;
}



}





let frames = 0;

function animate() {

  frames++;

  let aframe = window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)




  hero.drawPlayer()
  scoreTotal()




  checkLvl()


  drawBossLaser()

  drawGem();
  bossHitTest()
  hitEnemyTest()



  checkCollision();
  checkCollision2();
  moveLaser()
  drawLaser()
  hitTest()

if(boss){
  boss.drawBoss()
    
  moveAuto()
  moveBossLaser()
}
else{
  
  bossLasers = [];
}





if (frames % 99 === 0) {
 //addBoss();
  addRock()

  }
  if(level === 2&&frames%70===0)
  { 
    addRock()
    
    
  }
  if(level ===3&&frames%60===0)
  { 
    addRock()
    
  }
  if(level ===4&&frames%40===0)
  { 
    addRock()
   
  }
if(frames%270===0){
  addDiamond()
}



  if (health < 1) {
    //checks if you lost
    window.cancelAnimationFrame(aframe);
    end.style.display = "inline-flex";
    gameboard.style.display = "none";
    playAgain.style.display = "inline-flex";
    finalscore.innerHTML = total;
    
    
    ending.play();
  }

}





let end = document.getElementById("end");
let gameboard = document.getElementById("game-board");
let playAgain = document.getElementById("play-again");
let startscreen = document.getElementById("splashScreen");
let scoreb = document.getElementById("score");
let startButton = document.getElementById("startButton");


function restart() {
  //reloads the page
  ending.stop();
  location.reload();
  

}

function swapScreens() {
//changes screens to show gameboard and hide others
  if (startscreen.style.display === "none") {
  startscreen.style.display = "block";
 } else {
   startscreen.style.display = "none";
  }
  if (gameboard.style.display === "none") {
  gameboard.style.display = "inline-flex";
 } else {
   gameboard.style.display = "block";
  }
  if (scoreb.style.display === "none") {
    scoreb.style.display = "block";
  } 
}


//console.log(ladies.length)

function Start() {
opening.stop();
  setTimeout(animate, 1000)
  
}








