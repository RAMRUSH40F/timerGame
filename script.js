"use strict"
let score = document.querySelector('.score');
let nameInput = document.querySelector('#name-input');
let nameArr =[];
let el;

for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
    
    if(nameArr.find(item=>item.key === key.substring(0,key.length-1))==undefined){
      nameArr.push({
      key:key.substring(0,key.length-1),
      value:localStorage.getItem(key),
    });
    }else{
      nameArr.find(item=>item.key = key.substring(0,key.length-1)).value=Number(nameArr.find(item=>item.key = key.substring(0,key.length-1)).value)+Number(localStorage.getItem(key));
    }
  }

  nameArr.forEach(item=>{
    let userScore = document.createElement('p');
    userScore.innerHTML = `${item.key} : ${item.value}`;
    score.append(userScore);
  });


document.querySelector('#level1').addEventListener('click',()=>{
  document.location='../level1/level1.html?name='+nameInput.value;
});
document.querySelector('#level3').addEventListener('click',()=>{
  document.location='../level3/level3.html?name='+nameInput.value;
});
document.querySelector('#level2').addEventListener('click',()=>{
  document.location='../level2/level2.html?name='+nameInput.value;
});