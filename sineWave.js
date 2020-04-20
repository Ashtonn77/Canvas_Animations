import { canvas, c } from './main.js';


    let frequency = 0.02;
    let increment = frequency;
    export function sineWaveAnimate(){
      requestAnimationFrame(sineWaveAnimate);
    
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
     c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    
    for(let i = 0; i < canvas.width; i++){
      c.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01 + increment) * 200);
    }
    c.strokeStyle = 'hsl(0, 50%, 50%)';
    c.stroke()
    increment += frequency;
    }
    
    