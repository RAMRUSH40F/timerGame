"use strict"
//DOM элементы
let startButton = document.querySelector("#start-level1");
let lamp1 = document.querySelector("#lamp1");
let stand1 = document.querySelector("#stand1");
let lamp2 = document.querySelector("#lamp2");
let stand2 = document.querySelector("#stand2");
let info = document.querySelector(".info");
let lampBlock1 = document.querySelector("#lamp-block1");
let lampBlock2 = document.querySelector("#lamp-block2");
let modal =  document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let difficulty = document.querySelector('#difficulty');
//Выбор ламп
let playerSelectState=false;
//Выбор второй ламы
let selectSecondLamp=false;
//начальное время
let playerTime =0;
//итоговое время
let timeResult = 0;
//эталонное время
let timeIdeal = 0;
//Допуск(зависит от сложности)
let tolerance =1;

initialSave(1);

//игра
startButton.addEventListener("click",()=>{

  startButton.disabled =true;

    let time = getRandomArbitrary(2,4);

    State0();

    timer(time,()=>{

      State1();
      let time = getRandomArbitrary(3,7);

      timeIdeal = time;

      timer(time,()=>{

        State2();

        timer(3,()=>{

          State3();

        });
      })
    });

});
//первая лампа
lampBlock1.addEventListener("click",()=>{
  if(playerSelectState){
    State1();
    playerTime = new Date(); 
    selectSecondLamp=true;
  }
});
//вторая лампа
lampBlock2.addEventListener("click",()=>{
  if(playerSelectState && selectSecondLamp){
    timeResult = (new Date()-playerTime)/1000;
    State2();
    GameEnd();
  }
});

document.querySelector('#start-game').addEventListener('click',()=>{
  modal.style.display='none';
  tolerance = difficulty.options[difficulty.selectedIndex].value;
  StateStart();
})

document.querySelector('#back').addEventListener('click',()=>{
  document.location='../main/index.html'
});
document.querySelector('#back1').addEventListener('click',()=>{
  document.location='../main/index.html'
});




function StateStart(){
  lamp1.src = "../img/laml.png";
  stand1.src = "../img/stand.png";
  lamp2.src = "../img/laml.png";
  stand2.src = "../img/stand.png";
  playerSelectState = false;
  selectSecondLamp= false;
  info.textContent ='НАЖМИТЕ НА КНОПКУ ДЛЯ НАЧАЛА ИГРЫ';
  startButton.disabled =false;
}

function State0(){
  info.textContent = 'Запомните время между загорающимеся лампочками';
}
function State1(){
  lamp1.src = "../img/laml_on.png";
  stand1.src = "../img/stand_on.png";
}
function State2(){
  lamp2.src = "../img/laml_on.png";
  stand2.src = "../img/stand_on.png";
}
function State3(){
  lamp1.src = "../img/laml.png";
  stand1.src = "../img/stand.png";
  lamp2.src = "../img/laml.png";
  stand2.src = "../img/stand.png";
  info.textContent = 'Посчитайте время которое проходит между зажиганиями двух лампочек, а затем попробуйте зажечь лампочки с тем же промежутком времени';
  playerSelectState = true;
}

function GameEnd(){
  modal.style.display='flex';
  modal.classList.add('modal-open');

  let result = Math.abs(timeIdeal-timeResult);

  if(Math.abs(timeIdeal-timeResult)<tolerance/10){
    result=100;
  }else{

    if(Math.abs(timeIdeal-timeResult)<tolerance){

    result = (tolerance-Math.abs(timeIdeal-timeResult))/tolerance*100

    }else{
      result = 0;
    }
  }

  if(Number(localStorage.getItem(userName+'1'))<Math.round(result)){
    saveScore(userName,Math.round(result),1);
  }
	
  modalContent.querySelector('.modal-content-text').innerHTML=`
  <p>Результат ${Math.round(result)} из 100 </p>
  `;
  if(result==0){
	  modalContent.querySelector('.modal-content-text').innerHTML=`
	  <p>Вы проиграли. Попробуйте еще раз. </p>
	  `;
	}
}