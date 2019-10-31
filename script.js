
        var canvas = document.getElementById("gameboard");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "green";
        //Left side border
        ctx.fillRect(0,0,40,550);
        //right side border
        ctx.fillRect(510,0,40,550);
        //bottom border
        ctx.fillRect(0,400,550,150);

        // class Person{
        //     constructor(health,direction){
        //         this.health = health
        //     }
        // }
        // class Hero extends Person{}
        // class Mob extends Person{}

        
