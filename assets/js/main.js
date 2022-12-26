const playerNameElement = document.getElementById('player-name');
const playerLvlElement = document.getElementById('player-lvl');
const playerHpElement = document.getElementById('player-hp');
const playerMpElement = document.getElementById('player-mp');
const playerStrElement = document.getElementById('player-str');
const playerDexElement = document.getElementById('player-dex');
const playerVitElement = document.getElementById('player-vit');
const playerIntElement = document.getElementById('player-int');
const playerExpElement = document.getElementById('player-exp');
const playerAtkElement = document.getElementById('player-atk');
const playerMatkElement = document.getElementById('player-matk');
const playerDefElement = document.getElementById('player-def');
const playerMdefElement = document.getElementById('player-mdef');
const playerAtkSpdElement = document.getElementById('player-atkspd');
const playerCTRElement = document.getElementById('player-ctr');
const playerCrateElement = document.getElementById('player-crate');
const playerCdmgElement = document.getElementById('player-cdmg');

const enemyHpElement = document.getElementById('enemy-hp');

const exp = document.querySelector('#exp');

window.onload = function () {
    calculateTraitStats();
    calculateAdvStats();

    player.baseStats.hp = player.baseStats.hpMax;
    player.baseStats.mp = player.baseStats.mpMax;
    enemy.baseStats.hp = enemy.baseStats.hpMax;
    enemy.baseStats.mp = enemy.baseStats.mpMax;
    playerLoadStats();
    enemyLoadStats();
    showInventory();
};

// Gain exp
exp.addEventListener("click", function () {
    playerExpGain();
});

// ========== Const Functions ==========
const calculateAdvStats = () => {
    player.advStats.atk = player.baseStats.str * 4;
    player.advStats.mAtk = player.baseStats.int * 4;
    player.advStats.def = (player.baseStats.vit * 2) + (player.baseStats.str * 1);
    player.advStats.mDef = player.baseStats.vit * 2;
    player.advStats.atkSpd = 0.3 + (player.baseStats.dex * 0.005);
    player.advStats.castTimeReduction = player.baseStats.int * 0.03;
    player.advStats.critRate = player.baseStats.dex * 0.02;
    player.advStats.critDmg = 50 + (player.baseStats.dex * 0.2);
    player.baseStats.hpMax = player.baseStats.vit * 40;
    player.baseStats.mpMax = player.baseStats.int * 10;

    enemy.advStats.atk = enemy.baseStats.str * 4;
    enemy.advStats.mAtk = enemy.baseStats.int * 4;
    enemy.advStats.def = (enemy.baseStats.vit * 1) + (enemy.baseStats.str * 1);
    enemy.advStats.def = enemy.baseStats.vit * 2;
    enemy.advStats.mDef = enemy.baseStats.vit * 2;
    enemy.advStats.atkSpd = 0.3 + (enemy.baseStats.dex * 0.005);
    enemy.advStats.castTimeReduction = enemy.baseStats.int * 0.03;
    enemy.advStats.critRate = enemy.baseStats.dex * 0.02;
    enemy.advStats.critDmg = 50 + (enemy.baseStats.dex * 0.2);
    enemy.baseStats.hpMax = enemy.baseStats.vit * 40;
    enemy.baseStats.mpMax = enemy.baseStats.int * 10;
};

const playerLoadStats = () => {
    // Shows proper percentage for respective stats
    let playerHpPercentage = ((player.baseStats.hp / player.baseStats.hpMax) * 100).toFixed(2);
    let playerMpPercentage = ((player.baseStats.mp / player.baseStats.mpMax) * 100).toFixed(2);
    let playerExpPercentage = ((player.exp.expCurrLvl / player.exp.expMaxLvl) * 100).toFixed(2);

    // Displays the stats of the player
    playerNameElement.innerHTML = player.name;
    playerLvlElement.innerHTML = player.lvl;
    playerHpElement.innerHTML = nFormatter(player.baseStats.hp) + "/" + nFormatter(player.baseStats.hpMax) + " (" + playerHpPercentage + "%)";
    playerMpElement.innerHTML = nFormatter(player.baseStats.mp) + "/" + nFormatter(player.baseStats.mpMax) + " (" + playerMpPercentage + "%)";
    playerExpElement.innerHTML = nFormatter(player.exp.expCurr) + "/" + nFormatter(player.exp.expMax) + " (" + playerExpPercentage + "%)";

    // Base Stats
    playerStrElement.innerHTML = player.baseStats.str;
    playerDexElement.innerHTML = player.baseStats.dex;
    playerVitElement.innerHTML = player.baseStats.vit;
    playerIntElement.innerHTML = player.baseStats.int;

    // Advanced Stats
    playerAtkElement.innerHTML = nFormatter(player.advStats.atk);
    playerMatkElement.innerHTML = nFormatter(player.advStats.mAtk);
    playerDefElement.innerHTML = nFormatter(player.advStats.def);
    playerMdefElement.innerHTML = nFormatter(player.advStats.mDef);
    playerAtkSpdElement.innerHTML = (player.advStats.atkSpd).toFixed(1);
    playerCTRElement.innerHTML = (player.advStats.castTimeReduction).toFixed(2) + "%";
    playerCrateElement.innerHTML = (player.advStats.critRate).toFixed(2) + "%";
    playerCdmgElement.innerHTML = (player.advStats.critDmg).toFixed(2) + "%";
};

const enemyLoadStats = () => {
    // Shows proper percentage for respective stats
    let enemyHpPercentage = ((enemy.baseStats.hp / enemy.baseStats.hpMax) * 100).toFixed(2);
    let enemyMpPercentage = ((enemy.baseStats.mp / enemy.baseStats.mpMax) * 100).toFixed(2);

    enemyHpElement.innerHTML = nFormatter(enemy.baseStats.hp) + "/" + nFormatter(enemy.baseStats.hpMax) + " (" + enemyHpPercentage + "%)";
};