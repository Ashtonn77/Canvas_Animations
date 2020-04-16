import { canvas, c } from './main.js';

const voidColors = ['#AB05F2', '#7D07F2', '#5207F2', '#23D9B7', '#D7F205'];

export function getRandom(min, max){
    return Math.random() * (max - min) + min;
}

let mouse = {
    x:null,
    y:null
}

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

export function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = getRandom(60, 150);
    this.lastMouseMove = {
        x:x,
        y:y
    }


    this.draw = (lastMove) => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastMove.x, lastMove.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    this.update = () => {
        let lastMove = {
            x: this.x,
            y: this.y
        }

        //allow particles to move in a circular motion
        this.radians += this.velocity;

        //mouse drag effect
        this.lastMouseMove.x += (mouse.x - this.lastMouseMove.x) * 0.05;
        this.lastMouseMove.y += (mouse.y - this.lastMouseMove.y) * 0.05;

        this.x = this.lastMouseMove.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouseMove.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(lastMove);
    }

}

let particles;
export function voidInit(){
    particles = [];
    for(let i = 0; i < 50; i++){
        let radius = Math.random() * 2 + 1;
        let color = voidColors[Math.floor(getRandom(0, voidColors.length))];      
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color));
    }
}

let startVoidAnimate;
export function voidAnimate(){
    startVoidAnimate = requestAnimationFrame(voidAnimate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach( particle => {
        particle.update(c);
    })
}