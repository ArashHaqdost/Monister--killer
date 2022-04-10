const  ATTACK_VALUE=10;
const MONISTER_ATTACK_VALUE=14;

let chosenMaxLife=100;
let currentMonsterHealth=chosenMaxLife;
let currentPlayerHealth=chosenMaxLife;


adjustHealthBars(chosenMaxLife);

function attackHandler(){
  const damage =dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -=damage;
  const playerDamage= dealPlayerDamage(MONISTER_ATTACK_VALUE);
  currentPlayerHealth -=playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth >0){
    alert('you won ');
  }else if(currentPlayerHealth<=0 && currentMonsterHealth >0){
    alert('you lost');
  }else if (currentMonsterHealth<=0 && currentPlayerHealth<=0){
    alert('you have a drow');
  }
}

attackBtn.addEventListener('click',attackHandler);