import { canvas, c } from './main.js';
import { Ball, mouse } from './mainClass.js'
      
    let x, y, dx, dy, radius;
    let circleArray = []; 

   export function floatInit(){
    circleArray = []; 
    for(let i = 0; i < 500; i++){
        radius = Math.random() * 4 + 1;
        x = Math.random() * (innerWidth - radius * 4) + radius;
        y = Math.random() * (innerHeight - radius * 4) + radius;
        dx = (Math.random() - 0.5) * 2;
        dy = (Math.random() - 0.5) * 2;           
        circleArray.push(new Ball(x, y, radius, dx, dy, null));
   }
   }

   let startFloatAnimation;
    export function floatAnimate(){
        startFloatAnimation = requestAnimationFrame(floatAnimate);
        c.fillStyle = 'rgba(112,128,144, 0.1)';
        c.fillRect(0, 0, innerWidth, innerHeight);        
        for(let i = 0; i < circleArray.length; i++){
            circleArray[i].floatUpdate();
        }             
    }   

  export {startFloatAnimation};