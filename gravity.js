import { canvas, c } from './main.js';
import { Ball, getRandom } from './mainClass.js'

const colors = ['orange', '#3791A6', '#D97F30', '#D94B2B', '#732626'];

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