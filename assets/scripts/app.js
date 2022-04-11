const STRONG_ATTACK_VALUE = 17;
const ATTACK_VALUE = 10;
const MONISTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

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
  const playerDamage = dealPlayerDamage(MONISTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('you won ');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('you lost');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('you have a drow');
  }
}
//start strong attack handlaer
function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}
//START ATTACK HANDLER
function attackHandler() {
  attackMonster('ATTACK');
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
