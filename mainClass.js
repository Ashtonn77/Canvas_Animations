import { canvas, c } from './main.js';

const gravity = 1;
const friction = 0.97;
let maxRadius = 40;
let colorsArray = ['#281040', '#F2F2F2', '#253659', '#0FA6A6', '#07F2DB'];

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

export function getRandom(min, max){
    return Math.random() * (max - min) + min;
}   
        
export function distance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
  
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }


/**utility functions */
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
  
    return rotatedVelocities;
  }
  /**
  * Swaps out two colliding particles' x and y velocities after running through
  * an elastic collision reaction equation
  *
  * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
  * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
  * @return Null | Does not return a value
  */
  
  export function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
  
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;
  
    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
  
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
  
        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;
  
        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);
  
        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
  
        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);
  
        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
  
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
  }
  /**end of utility functions */



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

export { mouse };