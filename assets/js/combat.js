const combatPanel = document.querySelector("#combatPanel")
let battleEnd = false;

// ========== Validation ==========
const hpValidation = () => {
    // Prioritizes player death before the enemy
    if (player.stats.hp < 1) {
        player.stats.hp = 0;
        addCombatLog(`You died!`);
        endCombat();
    } else if (enemy.stats.hp < 1) {
        enemy.stats.hp = 0;
        addCombatLog(`${enemy.name} died! (${new Date(combatSeconds * 1000).toISOString().substring(14, 19)})`);
        endCombat();
    }
};

// ========== Attack Functions ==========
const playerAttack = () => {
    // Calculates the damage and attacks the enemy
    let damage = player.stats.atk * (player.stats.atk / (player.stats.atk + enemy.stats.def));
    let lifesteal = player.stats.atk * (player.stats.vamp / 100);
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= player.stats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1 + (player.stats.critDmg / 100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    enemy.stats.hp -= damage;
    player.stats.hp += lifesteal;
    if (player.stats.hp > player.stats.hpMax) {
        player.stats.hp = player.stats.hpMax;
    }
    addCombatLog(`${player.name} dealt ` + nFormatter(damage) + ` ${dmgtype} to ${enemy.name}.`);
    hpValidation();
    enemyLoadStats();
};

const enemyAttack = () => {
    // Calculates the damage and attacks the player
    let damage = enemy.stats.atk * (enemy.stats.atk / (enemy.stats.atk + player.stats.def));
    let lifesteal = enemy.stats.atk * (enemy.stats.vamp / 100);
    // Randomizes the damage by 90% - 110%
    let dmgRange = 0.9 + Math.random() * 0.2;
    damage = damage * dmgRange;
    // Check if the attack is a critical hit
    if (Math.floor(Math.random() * 101) <= enemy.stats.critRate) {
        dmgtype = "crit damage";
        damage = Math.round(damage * (1 + (enemy.stats.critDmg / 100)));
    } else {
        dmgtype = "damage";
        damage = Math.round(damage);
    }

    player.stats.hp -= damage;
    enemy.stats.hp += lifesteal;
    if (enemy.stats.hp > enemy.stats.hpMax) {
        enemy.stats.hp = enemy.stats.hpMax;
    }
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
        logElement.innerHTML = message;
        combatLogBox.appendChild(logElement);
    }

    if (battleEnd) {
        let button = document.createElement("div");
        button.innerHTML = `
        <div class="decision-panel">
            <button id="claimReward">Claim</button>
        </div>`;
        combatLogBox.appendChild(button);
    }

    combatLogBox.scrollTop = combatLogBox.scrollHeight;
};

// Combat Timer
let combatSeconds = 0;

const startCombat = () => {
    // Starts the timer for player and enemy attacks along with combat timer
    let dimDungeon = document.querySelector('#dungeon-main');
    dimDungeon.style.filter = "brightness(50%)";

    dungeon.status.event = true;
    combatPanel.style.display = "flex";
    addCombatLog(`You encountered ${enemy.name}.`);

    playerTimer = setInterval(playerAttack, (1000 / player.stats.atkSpd));
    enemyTimer = setInterval(enemyAttack, (1000 / enemy.stats.atkSpd));
    combatTimer = setInterval(combatCounter, 1000);
};

const endCombat = () => {
    // Gives out all the reward and show the claim button
    addCombatLog(`You earned ${enemy.rewards.exp} exp.`)
    playerExpGain();
    addCombatLog(`${enemy.name} dropped <i class="fas fa-coins" style="color: #FFD700;"></i>${enemy.rewards.gold} gold.`)
    player.gold += enemy.rewards.gold;
    playerLoadStats();
    if (enemy.rewards.drop) {
        let itemDrop = createEquipment();
        addCombatLog(`${enemy.name} dropped ${itemDrop}.`)
    }
    battleEnd = true;
    updateCombatLog();
    document.querySelector("#claimReward").addEventListener("click", function () {
        let dimDungeon = document.querySelector('#dungeon-main');
        dimDungeon.style.filter = "brightness(100%)";
        player.stats.hp = player.stats.hpMax;
        player.stats.hpPercent = ((player.stats.hp / player.stats.hpMax) * 100);
        dungeon.status.event = false;
        combatPanel.style.display = "none";
        battleEnd = false;
        combatBacklog.length = 0
    });

    // Stops every timer in combat
    clearInterval(playerTimer);
    clearInterval(enemyTimer);
    clearInterval(combatTimer);
    combatSeconds = 0;
};

const combatCounter = () => {
    combatSeconds++;
};

const showCombatInfo = () => {
    document.querySelector('#combatPanel').innerHTML = `
    <div class="content">
        <div class="battle-info-panel center" id="enemyPanel">
            <p>${enemy.name} Lv.${enemy.lvl}</p>
            <div class="battle-bar empty-bar hp bb-hp">
                <div class="battle-bar current bb-hp" id="enemy-hp-battle">${nFormatter(enemy.stats.hp)}/${nFormatter(enemy.stats.hpMax)}<br>(${enemy.stats.hpPercent}%)</div>
            </div>
            <img src="./assets/sprites/${enemy.image.name}${enemy.image.type}" alt="${enemy.name}" width="${enemy.image.size}">
        </div>
        <div class="battle-info-panel primary-panel">
            <p>${player.name} Lv.${player.lvl}</p>
            <div class="battle-bar empty-bar bb-hp">
                <div class="battle-bar current bb-hp" id="player-hp-battle">${nFormatter(player.stats.hp)}/${nFormatter(player.stats.hpMax)}(${player.stats.hpPercent}%)</div>
            </div>
            <div class="battle-bar empty-bar bb-ab">
                <div class="battle-bar current bb-ab" id="playerAtkBar">action</div>
            </div>
        </div>
        <div class="logBox primary-panel">
            <div id="combatLogBox"></div>
        </div>
    </div>
    `;
}