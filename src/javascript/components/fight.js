import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  let fighter1 = { ...firstFighter };
  let fighter2 = { ...secondFighter };
  fighter1['isblocking'] = false;
  fighter2['isblocking'] = false;

  return new Promise((resolve) => {
    document.addEventListener('keyup' , () => {resolve(autoFight(fighter1, fighter2, 1))});
  });
}

export function getDamage(attacker, defender) {
  return Math.max(0, getHitPower(attacker) - getBlockPower(defender));
}

export function getHitPower(fighter) {
  let criticalHitChance = randIntegerRange(1, 2);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = randIntegerRange(1, 2);
  return fighter.defense * dodgeChance;
}

// Function to get a random integer including bounds
function randIntegerRange(min, max) {
  return min + Math.round((max - min) * Math.random());
}

// Function to reduce the health from a player
function getHit(player1, player2) {
  let damage = getDamage(player2, player1);
  player1.health -= damage;
}

function autoFight(player1, player2, scale) {
  player1.health = player1.health * scale;
  player2.health = player2.health * scale;
  while(player1.health > 0 && player2.health > 0) {
    let rand = randIntegerRange(0, 1);
    if (rand === 0) {
      getHit(player1, player2)
    } else {
      getHit(player2, player1)
    }
  }
  return player1.health <= 0 ? player2 : player1;
}