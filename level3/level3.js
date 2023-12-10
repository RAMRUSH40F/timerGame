"use strict"

let modal =  document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let bombTimer =document.querySelector('.bomb-timer');
let redButton=document.querySelector('.red-button');
let gate1 = document.querySelector('#gate1');
let gate2 = document.querySelector('#gate2');
let info = document.querySelector(".info");

let gateSpeed = 0;

let defuseState =false;
let bombDefused =false;

let startTime =0;
let timeIdeal=0;

initialSave(3)

document.querySelector('#start-game').addEventListener('click',()=>{
    modal.style.display='none';
    gateSpeed = difficulty.options[difficulty.selectedIndex].value;
    gate1.style.animation =``
    gate2.style.animation =``
    defuseState=false;
    bombDefused=false;
    bombTimer.textContent='0:00';
  })
  
  document.querySelector('#back').addEventListener('click',()=>{
    document.location='../main/index.html'
  });

  document.querySelector('#back1').addEventListener('click',()=>{
    document.location='../main/index.html'
  });

redButton.addEventListener('click',()=>{
    if(defuseState){
        bombDefused=true;
        GameEnd();

    }else{
    State1();
    startTime = new Date;
    let time = getRandomArbitrary(5,10);
    timeIdeal=time;
    timer(time,()=>{});
    close(time*gateSpeed);
    defuseState=true;
    }
});
  
function timer(seconds,endfunction){
    let time=seconds*100;
    let timerId = setTimeout(function tick() {
      bombTimer.textContent=Math.floor(time/100)+':'+time%100;
      time--;
      if(time>=0 && !bombDefused){
      timerId = setTimeout(tick, 10,time,seconds); 
      }else{
        endfunction();
      }
    }, 0,time,seconds);
  
  }
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

  function close(n){
    gate1.style.animation =`gate1 linear ${n}s`
    gate1.style.animationFillMode = 'forwards';
    gate2.style.animation =`gate2 linear ${n}s`
    gate2.style.animationFillMode = 'forwards';
  }

  function State1(){
    info.textContent='Для того, чтобы разминировать бомбу, нужно нажать на кнопку как можно ближе к концу таймера'
  }

  function GameEnd(){
    modal.style.display='flex';
    let timeResult = (new Date() - startTime)/1000;
    let result = Math.abs(timeIdeal-timeResult);

    if(Math.abs(timeIdeal-timeResult)<0.1){
        result=100;
      }else{
        console.log(Math.abs(timeIdeal-timeResult));
        if(Math.abs(timeIdeal-timeResult)<1){
            console.log(Math.abs(timeIdeal-timeResult));
        result = (1-Math.abs(timeIdeal-timeResult))*100;
        }else{
          result = 0;
        }
      }
      if(Number(localStorage.getItem(userName+'3'))<Math.round(result)){
        saveScore(userName,Math.round(result),3);
      }

    modalContent.querySelector('.modal-content-text').innerHTML=`
  <p>Результат ${Math.round(result)} из 100 </p>
  `;
  if(result==0){
	  modalContent.querySelector('.modal-content-text').innerHTML=`
  <p>Неправильно разминировали. Попробуйте еще раз.</p>
  `;
	  
  }

  }