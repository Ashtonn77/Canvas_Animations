import { voidInit, voidAnimate, startVoidAnimate } from './followingVoid.js';
import { gravityInit, gravityAnimate, startGravityAnimation } from './gravity.js';
import { sineWaveAnimate, startWaveSnimation } from './sineWave.js';
import { floatInit, floatAnimate, startFloatAnimation } from './floating.js';
import { collideInit, collideAnimate, startCollideAnimation } from './collision.js';

let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

let c = canvas.getContext('2d');
    
    let voidStart = false;
    let gravityStart = false;
    let waveStart = false;
    let floatStart = false;
    let collisionStart = false;

    function switchAndCancel(cancelOne, cancelTwo, cancelThree, cancelFour){        
            cancelAnimationFrame(cancelOne)           
            cancelAnimationFrame(cancelTwo);
            cancelAnimationFrame(cancelThree);
            cancelAnimationFrame(cancelFour);
             
    }

    // //void button
    let followingVoidBtn = document.getElementById('void');
    followingVoidBtn.addEventListener('click', function(){
        if(!voidStart){
            voidInit(50);
            voidAnimate();
            voidStart = true;
            switchAndCancel(startWaveSnimation, startGravityAnimation, 
                startCollideAnimation, startFloatAnimation);
                floatStart = false;
                collisionStart = false;
                gravityStart = false;
                waveStart = false; 
       }
        else voidInit();

    })

    // //gravity button
    let gravityBtn = document.getElementById('gravity');
    gravityBtn.addEventListener('click', function(){
        if(!gravityStart){
            gravityInit(100);
            gravityAnimate();
            gravityStart = true;
            switchAndCancel(startWaveSnimation, startVoidAnimate, 
                startCollideAnimation, startFloatAnimation);
                floatStart = false;
                collisionStart = false;
                voidStart = false;
                waveStart = false;               
        }
        else gravityInit();
    })


    // //wave button
    let waveBtn = document.getElementById('wave');
    waveBtn.addEventListener('click', function(){
        if(!waveStart){
            sineWaveAnimate();
            waveStart = true;
            switchAndCancel(startGravityAnimation, startVoidAnimate, 
                startCollideAnimation, startFloatAnimation);
                floatStart = false;
                collisionStart = false;
                voidStart = false;
                gravityStart = false;            
        }
        else sineWaveAnimate();
    })

    // //float
    let floatBtn = document.getElementById('floating');
    floatBtn.addEventListener('click', function(){
        if(!floatStart){
            floatInit();
            floatAnimate();
            floatStart = true;
            switchAndCancel(startGravityAnimation, startVoidAnimate, 
                startCollideAnimation, startWaveSnimation);
                waveStart = false;
                collisionStart = false;
                voidStart = false;
                gravityStart = false;            
        }
        else floatInit();
    })


    let collideBtn = document.getElementById('collision');
    collideBtn.addEventListener('click', function(){
        if(!collisionStart){
            collideInit();
            collideAnimate();
            collisionStart = true;
            switchAndCancel(startGravityAnimation, startVoidAnimate, 
                startFloatAnimation, startWaveSnimation); 
                waveStart = false;
                floatStart = false;
                voidStart = false;
                gravityStart = false;          
        }
        else coliideInit();
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