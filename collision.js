import { canvas, c } from './main.js';
import { Ball, getRandom, distance } from './mainClass.js';

    const colors = ['#FFDF1A', '#73124E', '#FF009F', '#1AF2FF', '#09A9B3'];
      
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