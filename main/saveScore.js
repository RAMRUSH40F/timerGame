"use strict"
let userName='';

function initialSave(level){
    let paramsArr = window.location.search.substring(1).split('&');
    paramsArr.forEach(item=>{
      let keyValue =item.split('=');
      if(keyValue[0] ='name'){
        userName=keyValue[1];
      }
    })
    if(localStorage.getItem(userName+level) == null){
    saveScore(userName,0,level);
    }
  }
  
  function saveScore(name,score,level){
    if(name!=''){

    localStorage.setItem(name+level,score);
    }
  }