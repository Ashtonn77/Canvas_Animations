import { canvas, c } from './main.js';
import { getRandom } from './followingVoid.js';
import { distance, resolveCollision, particles } from './collision.js'


const gravity = 1;
const friction = 0.97;
const colors = ['orange', '#3791A6', '#D97F30', '#D94B2B', '#732626'];

let mouse = {
    x: undefined,
    y: undefined
}

//for floating
let maxRadius = 40;
let colorsArray = ['#281040', '#F2F2F2', '#253659', '#0FA6A6', '#07F2DB'];
//





window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})


export class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;

        //for floating
        this.minRadius = radius;
        this.colors = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        ////

        //for collision
        this.velocity = {
            x: (Math.random() - 0.5) + 2,
            y: (Math.random() - 0.5) + 2
        }
        this.mass = 1;
        this.opacity = 0;

        /////

    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
    }

    update() {

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width ||
            this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    floatDraw() {
        c.beginPath();
        //c.strokeStyle = colors[Math.floor(Math.random() * colors.length)]; 
        c.fillStyle = this.colors;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.stroke();
        c.fill();
    }

    floatUpdate() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interaction
        if (((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50) && ((mouse.y - this.y) < 50 && (mouse.y - this.y) > -50)) {
            if (this.radius < 40) {
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.floatDraw();
    }


    collisionDraw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.save();
        c.globalAlpha = this.opacity;   
        c.fillStyle = this.color;   
        c.fill();
        c.restore();
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
      }
    
      collisionUpdate(particles) {
        this.draw()
    
        for(let i = 0; i < particles.length; i++){
          if(this == particles[i]) continue;
    
          if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius *2 < 0){
            resolveCollision(this, particles[i]);
         }
        }
    
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
          this.velocity.x = -this.velocity.x;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
          this.velocity.y = -this.velocity.y;
        }
    
        if(distance(mouse.x, mouse.y, this.x, this.y) < 80 && this.opacity < 0.2){
          this.opacity += 0.02;
       }else if(this.opacity > 0){
         this.opacity -= 0.02;
         this.opacity = Math.max(0, this.opacity);
       }
    
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    
      }

}

let balls;
export function gravityInit(numberOfItems) {
    balls = [];
    for (let i = 0; i < numberOfItems; i++) {
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
export function gravityAnimate() {
    startGravityAnimation = requestAnimationFrame(gravityAnimate);
    c.fillStyle = '#260119'
    c.fillRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
    })
}

export { startGravityAnimation };