import { canvas, c } from './main.js';
import { getRandom } from './followingVoid.js';


const gravity = 1;
const friction = 0.97;
const colors = ['orange', '#3791A6', '#D97F30', '#D94B2B', '#732626'];

export class Ball{
    constructor(x, y, radius, dx, dy, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;        
        this.color = color;
        
    }

    draw(){
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
    }

    update(){

        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
        }
  
        if(this.x + this.radius + this.dx > canvas.width ||
            this.x - this.radius <= 0){
            this.dx = -this.dx;
        }  
  
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let balls;
export function gravityInit(numberOfItems){
    balls = [];
    for(let i = 0; i < numberOfItems; i++){
        let radius = getRandom(8, 30);
        let x = getRandom(radius, canvas.width - radius);
        let y = getRandom(0, canvas.height - radius);
        let dx = getRandom(-2, 2);
        let dy = getRandom(-2, 2);
        let color = colors[Math.floor(getRandom(0, colors.length))];
        balls.push(new Ball(x, y, radius, dx, dy, color))
    }
}

let startGravityAnimation;
export function gravityAnimate(){
    startGravityAnimation = requestAnimationFrame(gravityAnimate);
    c.fillStyle = '#260119'
    c.fillRect(0, 0, canvas.width, canvas.height);
    balls.forEach( ball => {
        ball.update();
    })
}
