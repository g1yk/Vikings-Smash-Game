


const hello = () => {
    console.log('hi')
}


class Hero {
    constructor(x, y, hp, weapon) {
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.weapon = weapon;
    }
    loadHero = () => {

    }
}


class Vector {
    constructor(direction, speed) {
        this.setDirection(direction, speed)
    }

setDirection(direction, speed) {
    this.direction = direction;
    this.speed = speed;
    this.x = 0;
    this.y = 0;
    switch (direction) {
        case 'up':
            this.y = -speed;
            break;

        case 'down':
            this.y = speed;
            break;

        case 'right':
            this.x = -speed;
            break;

        case 'left':
            this.x = speed;
            break;
    }
}
}

class Body {
    constructor({ imageName, speed }) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.velocity = new Vector('down', 0); // vector of movement
        this.lastTime = 0; // time of last frame
        this.animations = {}; // container for animations

        const animationSheet = new CharacterSheet({ imageName: imageName });
        "walk_down, walk_up, walk_left, walk_right".split(',').forEach(name => {
            this.animations[name] = animationSheet.getAnimation(name);
    });
    this.stand('down')
}

    walk(direction) { // its making hero walk
        this.velocity.setDirection(direction, this.speed); // set speed
        this.view = this.animations["walk_" + direction]; // choose speed
        this.view.run() // run speed
    }

    stand(direction) { // its making hero stop
        this.velocity.setDirection(direction, 0);
        this.view = this.animations["walk_" + direction];
        this.view.stop();
    }

    update(time) {
        if(this.lastTime == 0) {
            this.lastTime = time;
              return;
        }

        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.x / 1000);
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x),Math.trunc(this.y))
        this.view.update(time);

    }
}


class Player extends Body {

    constructor(control) {
        super({imageName: "player", speed: 50});
        this.control = control
    }
    update(time) {
        if(this.control.up) {
            this.walk('up');
        } else if (this.control.down) {
            this.walk('down'); 
        } else if (this.control.right) {
            this.walk('right'); 
        } else if (this.control.left) {
            this.walk('left'); 
        } else {
            this.stand(this.velocity.direction);
        }

        super.update(time);
    }
}


// export default Hero;