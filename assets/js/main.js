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
};

// Gain exp
exp.addEventListener("click", function () {
    playerExpGain();
});

// ========== Const Functions ==========
const calculateAdvStats = () => {
    player.baseStats.hpMax = (player.baseStats.vit * 40) + player.equippedStats.hp;
    player.baseStats.mpMax = (player.baseStats.int * 10) + player.equippedStats.mp;
    player.advStats.atk = (player.baseStats.str * 4) + player.equippedStats.atk;
    player.advStats.mAtk = (player.baseStats.int * 4) + player.equippedStats.mAtk;
    player.advStats.def = (player.baseStats.vit * 2) + (player.baseStats.str * 1) + player.equippedStats.def;
    player.advStats.mDef = (player.baseStats.vit * 2) + player.equippedStats.mDef;
    player.advStats.atkSpd = (0.3 + (player.baseStats.dex * 0.005)) + player.equippedStats.atkSpd;
    player.advStats.castTimeReduction = (player.baseStats.int * 0.03) + player.equippedStats.castTimeReduction;
    player.advStats.critRate = (player.baseStats.dex * 0.02) + player.equippedStats.critRate;
    player.advStats.critDmg = (50 + (player.baseStats.dex * 0.2)) + player.equippedStats.critDmg;
    
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

const enemyLoadStats = () => {
    // Shows proper percentage for respective stats
    let enemyHpPercentage = ((enemy.baseStats.hp / enemy.baseStats.hpMax) * 100).toFixed(2);
    let enemyMpPercentage = ((enemy.baseStats.mp / enemy.baseStats.mpMax) * 100).toFixed(2);

    enemyHpElement.innerHTML = nFormatter(enemy.baseStats.hp) + "/" + nFormatter(enemy.baseStats.hpMax) + " (" + enemyHpPercentage + "%)";
};