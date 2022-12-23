// ========== Validation ==========
const playerSlain = () => {
    // Soon
};

const enemySlain = () => {
    // Soon
};

const hpValidation = () => {
    // Prioritizes player death before the enemy
    if (player.baseStats.hp < 1) {
        playerSlain();
    } else {
        if (enemy.baseStats.hp < 1) {
            enemySlain();
        }
    }
};

// ========== Combat ==========
const playerAttack = () => {
    // Calculates the damage and attacks the enemy
    let damage = player.advStats.atk * (player.advStats.atk / (player.advStats.atk + enemy.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = Math.round(damage * dmgRange);
    action = "Basic Attack";

    enemy.baseStats.hp -= damage;
    addCombatLog(`${player.name} used ${action} on ${enemy.name} and dealt ${damage} damage.`);
};

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let damage = enemy.advStats.atk * (enemy.advStats.atk / (enemy.advStats.atk + player.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = Math.round(damage * dmgRange);
    action = "Basic Attack";

    player.baseStats.hp -= damage;
    addCombatLog(`${enemy.name} used ${action} on ${player.name} and dealt ${damage} damage.`);
    playerLoadStats();
};

// ========== Combat Backlog ==========
const combatBacklog = [];

// Add a message to the backlog and update the display
const addCombatLog = (message) => {
    combatBacklog.push(message);
    updateCombatLog();
};

// Update the message container element with the current messages in the backlog
const updateCombatLog = () => {
    // Clear the message container
    let combatLogBox = document.getElementById("combatLogBox");
    combatLogBox.innerHTML = "";

    // Add the messages to the container
    for (let message of combatBacklog) {
        let logElement = document.createElement("p");
        logElement.textContent = message;
        combatLogBox.appendChild(logElement);
    }

    // Scroll to the bottom of the container
    combatLogBox.scrollTop = combatLogBox.scrollHeight;
};