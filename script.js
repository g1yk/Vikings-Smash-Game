

var myGamePiece;
var myObstacle;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle  = new component(10, 200, "green", 300, 120);    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.querySelector("canvas"),
    start : function() {
        this.canvas.width = 550;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
//Left side border
ctx.fillRect(0,0,40,550);
//right side border
ctx.fillRect(510,0,40,550);
//bottom border
ctx.fillRect(0,400,550,150);

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
//Left side border
ctx.fillRect(0,0,40,550);
//right side border
ctx.fillRect(510,0,40,550);
//bottom border
ctx.fillRect(0,440,550,150);
    }
    // this.crashWith = function(otherobj) {
    //     var myleft = this.x;
    //     var myright = this.x + (this.width);
    //     var mytop = this.y;
    //     var mybottom = this.y + (this.height);
    //     var otherleft = otherobj.x;
    //     var otherright = otherobj.x + (otherobj.width);
    //     var othertop = otherobj.y;
    //     var otherbottom = otherobj.y + (otherobj.height);
    //     var crash = true;
    //     if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
    //         crash = false;
    //     }
    //     return crash;
    // }
}

function updateGameArea() {
    
        myGameArea.clear();
        myObstacle.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
    }


function moveup() {
    if(myGamePiece.y>0)
    myGamePiece.y-=5; 
    else
    myGamePiece.y+= 0;
}

function movedown() {
    if(myGamePiece.y<400)
    myGamePiece.y+=5; 
    else{
        myGamePiece.y+= 0;
        console.log("can't move")
    }
}

function moveleft() {
    if(myGamePiece.x>40)
    myGamePiece.x-=5; 
    else
    myGamePiece.x += 0;
}

function moveright() {
    if(myGamePiece.x<510)
    myGamePiece.x+=5; 
    else
    myGamePiece.x += 0;
}

// function clearmove() {
//     myGamePiece.speedX = 0; 
//     myGamePiece.speedY = 0; 
// }

function logKey(e) {
    switch (e.key) {
        case 'w':
            moveup();
            break;
        case 's':
            movedown()
            break;
        case 'a':
            moveleft()
            break;
        case 'd':
            moveright()
            break;
        default:
            break;      
    }
}

document.addEventListener('keydown', logKey);