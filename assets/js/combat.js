// ========== Validation ==========
const hpValidation = () => {
    // Prioritizes player death before the enemy
    if (player.baseStats.hp < 1) {
        player.baseStats.hp = 0;
        addCombatLog(`${player.name} died!`);
        endCombat();
    } else if (enemy.baseStats.hp < 1) {
        enemy.baseStats.hp = 0;
        addCombatLog(`${enemy.name} died!`);
        endCombat();
    }
};

// ========== Attack Functions ==========
const playerAttack = () => {
    // Calculates the damage and attacks the enemy
    let damage = player.advStats.atk * (player.advStats.atk / (player.advStats.atk + enemy.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= player.advStats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1+(player.advStats.critDmg/100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    enemy.baseStats.hp -= damage;
    addCombatLog(`${player.name} dealt ` + nFormatter(damage) + ` ${dmgtype} to ${enemy.name}.`);
    hpValidation();
    enemyLoadStats();
};

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let damage = enemy.advStats.atk * (enemy.advStats.atk / (enemy.advStats.atk + player.advStats.def));
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= enemy.advStats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1+(enemy.advStats.critDmg/100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    player.baseStats.hp -= damage;
    addCombatLog(`${enemy.name} dealt ` + nFormatter(damage) + ` ${dmgtype} to ${player.name}.`);
    hpValidation();
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

// Combat Timer
let combatSeconds = 0;
const startCombat = () => {
    addCombatLog(`${player.name} encountered ${enemy.name}.`);
    playerTimer = setInterval(playerAttack, (1000 / player.advStats.atkSpd));
    enemyTimer = setInterval(enemyAttack, (1000 / enemy.advStats.atkSpd));
    combatTimer = setInterval(combatCounter, 1000);
};

const endCombat = () => {
    clearInterval(playerTimer);
    clearInterval(enemyTimer);
    clearInterval(combatTimer);
    combatSeconds = 0;
};

const combatCounter = () => {
    combatSeconds++;
    document.getElementById('timer').innerHTML = new Date(combatSeconds * 1000).toISOString().substring(14, 19);
};