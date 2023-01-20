import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  let fighter1 = { ...firstFighter };
  let fighter2 = { ...secondFighter };
  fighter1['isblocking'] = false;
  fighter2['isblocking'] = false;
  const myThis = this;

  return new Promise((resolve) => {
    document.addEventListener('keydown', (event) => {
      if (event.code == controls.PlayerOneAttack) { // Fighter1 tries to attack
        // Check if he can attack, not blocking
        if (!fighter1.isblocking) {
          attackFighter(fighter1, fighter2);
        }
      }
      else if (event.code == controls.PlayerOneBlock) {
        fighter1.isblocking = true;
      }
      else if (event.code == controls.PlayerTwoAttack) {
        if (!fighter2.isblocking) {
          attackFighter(fighter2, fighter1);
        }
      }
      else if (event.code == controls.PlayerTwoBlock) {
        fighter2.isblocking = true;
      }
      console.log("Fighter 1 HP: ", fighter1.health, " Fighter 2 HP: ", fighter2.health);
      // Check if either fighter has 0 o less HP
      if (fighter1.health <= 0) {
        resolve(fighter2);
      }
      if (fighter2.health <= 0) {
        resolve(fighter1);
      }
    });

    // Key up events that release block and special attacks
    document.addEventListener('keyup', (event) => {
      if (event.code == controls.PlayerOneBlock) { // player 1 released the block key
        fighter1.isblocking = false;
      }
      else if (event.code == controls.PlayerTwoBlock) { // player 2 released the block key
        fighter2.isblocking = false;
      }
    })
  });
}

export function getDamage(attacker, defender) {
  let blockPower = 0;
  if (defender.isblocking) {
    blockPower = getBlockPower(defender)
  }
  return Math.max(0, getHitPower(attacker) - blockPower);
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
function attackFighter(playerA, playerB) {
  let damage = getDamage(playerA, playerB);
  playerB.health -= damage;
}

function autoFight(player1, player2, scale) {
  player1.health = player1.health * scale;
  player2.health = player2.health * scale;
  while(player1.health > 0 && player2.health > 0) {
    let rand = randIntegerRange(0, 1);
    if (rand === 0) {
      attackFighter(player1, player2)
    } else {
      attackFighter(player2, player1)
    }
  }
  return player1.health <= 0 ? player2 : player1;
}