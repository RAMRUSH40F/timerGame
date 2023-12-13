"use strict"
let modalContent = document.querySelector('.modal-content');
document.querySelector('#start-game').addEventListener('click',()=>{
    modal.style.display='none';
    let difficulty = document.querySelector('#difficulty');  
    difficulty = difficulty.options[difficulty.selectedIndex].value;
    main(difficulty);
  })
  
  document.querySelector('#back').addEventListener('click',()=>{
    document.location='../index.html'
  });

  document.querySelector('#back1').addEventListener('click',()=>{
    document.location='../index.html'
  });
  initialSave(2);