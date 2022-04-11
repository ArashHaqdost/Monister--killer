const STRONG_ATTACK_VALUE = 17;
const ATTACK_VALUE = 10;
const MONISTER_ATTACK_VALUE = 14;
const HEAL_VALUE=20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife=true;

adjustHealthBars(chosenMaxLife);

//  start rest function
function rest(){
   currentMonsterHealth = chosenMaxLife;
   currentPlayerHealth = chosenMaxLife;  
   resetGame(chosenMaxLife);
}
//START FUCTION END_ROUND
function endRound(){
  const initialPlayerHealth=currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONISTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentPlayerHealth <=0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth=initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('you dead but the bouns not allow ');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('you won ');
    
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('you lost');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('you have a drow');
  }
  if (currentMonsterHealth<=0 || currentPlayerHealth<=0){
    rest();
  }
}
//satrt functon attackMonster mode
function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
 endRound();
}

//start strong attack handlaer
function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
  endRound();
}
//START ATTACK HANDLER
function attackHandler() {
  attackMonster('ATTACK');
  endRound();
}
//end of attack functions

//start heail function
function healPlayerHandler(){
  let healValue;
  if (currentPlayerHealth>=chosenMaxLife-HEAL_VALUE){
    alert("you can't heal more than max initail health");
    healValue=chosenMaxLife-currentPlayerHealth;
  }else{
    healValue=HEAL_VALUE; 
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth +=HEAL_VALUE;
  endRound();

}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);