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
    let playerDamage = player.advStats.atk*(player.advStats.atk/(player.advStats.atk+enemy.advStats.def));
    enemy.baseStats.hp -= playerDamage();
}

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let enemyDamage = enemy.advStats.atk*(enemy.advStats.atk/(enemy.advStats.atk+player.advStats.def));
    player.baseStats.hp -= enemyDamage();
}