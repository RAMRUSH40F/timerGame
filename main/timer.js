"use strict"

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function timer(seconds,endfunction){
  let time=seconds;
  let timerId = setTimeout(function tick() {
    time--;
    if(time>0){
    timerId = setTimeout(tick, 1000,time); 
    }else{
      endfunction();
    }
  }, 0,time);

}