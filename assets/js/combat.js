const combatPanel = document.querySelector("#combatPanel")

// ========== Validation ==========
const hpValidation = () => {
    // Prioritizes player death before the enemy
    if (player.stats.hp < 1) {
        player.stats.hp = 0;
        addCombatLog(`${player.name} died!`);
        endCombat();
    } else if (enemy.stats.hp < 1) {
        enemy.stats.hp = 0;
        addCombatLog(`${enemy.name} died!`);
        endCombat();
    }
};

// ========== Attack Functions ==========
const playerAttack = () => {
    // Calculates the damage and attacks the enemy
    let damage = player.stats.atk * (player.stats.atk / (player.stats.atk + enemy.stats.def));
    let lifesteal = player.stats.atk * (player.stats.vamp/100);
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= player.stats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1+(player.stats.critDmg/100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    enemy.stats.hp -= damage;
    player.stats.hp += lifesteal;
    addCombatLog(`${player.name} dealt ` + nFormatter(damage) + ` ${dmgtype} to ${enemy.name}.`);
    hpValidation();
    enemyLoadStats();
};

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let damage = enemy.stats.atk * (enemy.stats.atk / (enemy.stats.atk + player.stats.def));
    let lifesteal = enemy.stats.atk * (enemy.stats.vamp/100);
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= enemy.stats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1+(enemy.stats.critDmg/100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    player.stats.hp -= damage;
    enemy.stats.hp += lifesteal;
    addCombatLog(`${enemy.name} dealt ` + nFormatter(damage) + ` ${dmgtype} to ${player.name}.`);
    hpValidation();
    playerLoadStats();
};

// ========== Combat Backlog ==========
const combatBacklog = [];

// Add a log to the combat backlog
const addCombatLog = (message) => {
    combatBacklog.push(message);
    updateCombatLog();
};

// Displays every combat activity
const updateCombatLog = () => {
    let combatLogBox = document.getElementById("combatLogBox");
    combatLogBox.innerHTML = "";

    for (let message of combatBacklog) {
        let logElement = document.createElement("p");
        logElement.textContent = message;
        combatLogBox.appendChild(logElement);
    }

    combatLogBox.scrollTop = combatLogBox.scrollHeight;
};

// Combat Timer
let combatSeconds = 0;
const startCombat = () => {
    battlePanel.style.display = "flex";
    addCombatLog(`${player.name} encountered ${enemy.name}.`);
    playerTimer = setInterval(playerAttack, (1000 / player.stats.atkSpd));
    enemyTimer = setInterval(enemyAttack, (1000 / enemy.stats.atkSpd));
    combatTimer = setInterval(combatCounter, 1000);
};

const endCombat = () => {
    battlePanel.style.display = "flex";
    clearInterval(playerTimer);
    clearInterval(enemyTimer);
    clearInterval(combatTimer);
    combatSeconds = 0;
};

const combatCounter = () => {
    combatSeconds++;
    document.getElementById('timer').innerHTML = new Date(combatSeconds * 1000).toISOString().substring(14, 19);
};