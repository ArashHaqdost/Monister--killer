const STRONG_ATTACK_VALUE = 17;
const ATTACK_VALUE = 10;
const MONISTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK='ATTACK';//mode_attack =0;
const MODE_STRONG_ATTACK="STRONG_ATTACK"; //or may 1;
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';
const enteredValidInput = parseInt(
  prompt('enter your life and monister life here :', '')
);

let chosenMaxLife = parseInt(enteredValidInput);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog=[];

adjustHealthBars(chosenMaxLife);
//wirte toLog fuction
function writeToLog(ev,val,monsterHealth,playerHealth){
  let logEntry={
    Event:ev,
    value:val,
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  }
  if (ev===LOG_EVENT_PLAYER_ATTACK){
    logEntry.target='MONSTER';
}else if(ev===LOG_EVENT_PLAYER_STRONG_ATTACK){
  logEntry={
    Event:ev,
    value:val,
    target :'MONSTER',
    finalMonaterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
}else if(ev===LOG_EVENT_MONSTER_ATTACK){
  logEntry={
    Event:ev,
    value:val,
    target:'PLYER',
    finalMonaterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
}else if(ev===LOG_EVENT_PLAYER_HEAL){
  logEntry={
    Event:ev,
    value:val,
    target:'PLAYER',
    finalMonaterHealth:monsterHealth,
    finalPlayerHealth:playerHealth
  };
}else if(ev===LOG_EVENT_GAME_OVER){

  logEntry={
    Event:ev,
    value:val,
    finalMonaterHealth:monsterHealth,
    finalPlayerHealth: playerHealth
  };
}
battleLog.push(logEntry);
}

//  start rest function
function rest() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
//START FUCTION END_ROUND
function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONISTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('you dead but the bouns not allow ');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('you won ');
  writeToLog(LOG_EVENT_GAME_OVER,'PLYER WON',currentMonsterHealth,currentPlayerHealth);

  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('you lost');
  writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);

  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('you have a drow');
  writeToLog(LOG_EVENT_GAME_OVER,'A DRAW',currentMonsterHealth,currentPlayerHealth);

  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    rest();
  }
}
//satrt functon attackMonster mode
function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent=LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);

  endRound();
}

//start strong attack handlaer
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
  endRound();
}
//START ATTACK HANDLER
function attackHandler() {
  attackMonster(MODE_ATTACK);
  endRound();
}
//end of attack functions

//start heail function
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can't heal more than max initail health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);

  endRound();
}
//fucntion print log handlar
function printLogHandler(){
  console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click',printLogHandler)
