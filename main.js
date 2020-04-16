import { voidInit, voidAnimate } from './followingVoid.js';

let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;



let c = canvas.getContext('2d');



voidInit();
voidAnimate();

export { canvas, c };
