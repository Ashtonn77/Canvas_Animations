import { voidInit, voidAnimate } from './followingVoid.js';
import { gravityInit, gravityAnimate } from './gravity.js';
import { sineWaveAnimate } from './sineWave.js';

let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;



let c = canvas.getContext('2d');

    
    let voidStart = false;
    let gravityStart = false;
    let waveStart = false;

    // //void button
    // let followingVoidBtn = document.getElementById('void');
    // followingVoidBtn.addEventListener('click', function(){
    //     if(!voidStart){
    //         voidInit(50);
    //         voidAnimate();
    //         voidStart = true;            
    //     }
    //     else voidInit();

    // })

    // //gravity button
    // let gravityBtn = document.getElementById('gravity');
    // gravityBtn.addEventListener('click', function(){
    //     if(!gravityStart){
    //         gravityInit(100);
    //         gravityAnimate();
    //         gravityStart = true;
    //     }
    //     else gravityInit();
    // })


    let waveBtn = document.getElementById('wave');
    waveBtn.addEventListener('click', function(){
        if(!waveStart){
            sineWaveAnimate();
            waveStart = true;
        }
    })





let cntrls = document.getElementById('controls');

let menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', function(){
    if(!menuOpen){
        menuBtn.classList.add('open');
        cntrls.classList.add('open');
        menuOpen = true;
    }
    else{
        menuBtn.classList.remove('open');
        cntrls.classList.remove('open');
        menuOpen = false;
    }
})

export { canvas, c };