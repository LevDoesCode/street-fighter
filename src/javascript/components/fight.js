import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  let fighter1 = {...firstFighter};
  let fighter2 = {...secondFighter};
  fighter1.health = 10;
  console.log(fighter1, fighter2);
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
}

export function getHitPower(fighter) {
  // return hit power
}

export function getBlockPower(fighter) {
  // return block power
}

// Function to get a random integer including bounds
function randIntegerRange(min, max) {
  return min + Math.round((max - min) * Math.random());
}