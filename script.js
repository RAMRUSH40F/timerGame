"use strict"
function transliterate(word){
    var answer = ""
      , a = {};

   a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";
   a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";
   a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="A";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
   a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
   a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Б"]="B";a["Ю"]="YU";
   a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["б"]="b";a["ю"]="yu";

   for (let i in word){
     if (word.hasOwnProperty(i)) {
       if (a[word[i]] === undefined){
       } else {
         answer += a[word[i]];
       }
     }
   }
   console.log("transliterated:"+answer);
   return answer;
}

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
  document.location='./level1/level1.html?name='+transliterate(nameInput.value);
});
document.querySelector('#level3').addEventListener('click',()=>{
  document.location='./level3/level3.html?name='+transliterate(nameInput.value);
});
document.querySelector('#level2').addEventListener('click',()=>{
  document.location='./level2/level2.html?name='+transliterate(nameInput.value);
});