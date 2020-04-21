import { canvas, c } from './main.js';
import { getRandom } from './followingVoid.js';
import { Ball } from './gravity.js';

const mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
    }
    
    const colors = ['#FFDF1A', '#73124E', '#FF009F', '#1AF2FF', '#09A9B3'];
    
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
    
    
    // Event Listeners
    addEventListener('mousemove', (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    })
    
    addEventListener('resize', () => {
      canvas.width = innerWidth
      canvas.height = innerHeight
    
      init()
    })
    
    export function distance(x1, y1, x2, y2){
      let xDistance = x2 - x1;
      let yDistance = y2 - y1;
    
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
      
    let particles;
    export function collideInit(){
      particles = [];
               
        for(let i = 0; i < 80; i++){
            let radius = getRandom(8, 25);
          let x = getRandom(radius, canvas.width - radius)
          let y = getRandom(radius, canvas.height - radius);
          let color = colors[Math.floor(getRandom(0, colors.length))];
           
          for(let j = 0; j < particles.length; j++){
              if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
                x = getRandom(0, canvas.width)
                y = getRandom(0, canvas.height);
                j = -1;
              }
          }
    
          particles.push(new Ball(x, y, radius, null, null, color))
        }
    }
    
    let startCollideAnimation;
    export function collideAnimate(){
      startCollideAnimation = requestAnimationFrame(collideAnimate);
      c.fillStyle = 'rgba(0 , 0, 0, 0.5)';
      c.fillRect(0, 0, canvas.width, canvas.height);
    
      particles.forEach( particle => {
        particle.collisionUpdate(particles);
      });
    
    }
   
    export {startCollideAnimation, particles };