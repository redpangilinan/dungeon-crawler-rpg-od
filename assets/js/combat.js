// ========== Validation ==========
const playerSlain = () => {
    // Soon
}

const enemySlain = () => {
    // Soon
}

const hpValidation = () => {
    // Prioritizes player death before the enemy
    if (player.baseStats.hp < 1) {
        playerSlain();
    } else {
        if (enemy.baseStats.hp < 1) {
            enemySlain();
        }
    }
}

// ========== Combat ==========
const playerAttack = () => {
    // Calculates the damage and attacks the enemy
    let damage = player.advStats.atk * (player.advStats.atk / (player.advStats.atk + enemy.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = Math.round(damage * dmgRange);

    enemy.baseStats.hp -= damage;
    console.log(damage);
}

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let damage = enemy.advStats.atk * (enemy.advStats.atk / (enemy.advStats.atk + player.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = Math.round(damage * dmgRange);

    player.baseStats.hp -= damage;
    console.log(damage);
    playerLoadStats();
}