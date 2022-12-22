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
const playerHitElement = document.getElementById('player-hit');
const playerEvaElement = document.getElementById('player-eva');
const exp = document.querySelector('#exp');

window.onload = function () {
    calculateClassStats();
    calculateAdvStats();

    player.baseStats.hp = player.baseStats.hpMax;
    player.baseStats.mp = player.baseStats.mpMax;
    playerLoadStats();
};

// Gain exp
exp.addEventListener("click", function () {
    playerExpGain();
});

// ========== Const Functions ==========
const calculateAdvStats = () => {
    player.advStats.atk = player.baseStats.str * 6;
    player.advStats.mAtk = player.baseStats.int * 6;
    player.advStats.def = player.baseStats.vit * 2;
    player.advStats.mDef = player.baseStats.vit * 2;
    player.advStats.hit = player.baseStats.dex * 3;
    player.advStats.eva = player.baseStats.dex * 3;
    player.baseStats.hpMax = player.baseStats.vit * 40;
    player.baseStats.mpMax = player.baseStats.int * 10;

    enemy.advStats.atk = enemy.baseStats.str * 6;
    enemy.advStats.mAtk = enemy.baseStats.int * 6;
    enemy.advStats.def = enemy.baseStats.vit * 2;
    enemy.advStats.mDef = enemy.baseStats.vit * 2;
    enemy.advStats.hit = enemy.baseStats.dex * 3;
    enemy.advStats.eva = enemy.baseStats.dex * 3;
    enemy.baseStats.hpMax = enemy.baseStats.vit * 40;
};

const playerLoadStats = () => {
    // Shows proper percentage for respective stats
    playerHpPercentage = ((player.baseStats.hp / player.baseStats.hpMax) * 100).toFixed(2);
    playerMpPercentage = ((player.baseStats.mp / player.baseStats.mpMax) * 100).toFixed(2);
    playerExpPercentage = ((player.exp.expCurrLvl / player.exp.expMaxLvl) * 100).toFixed(2);

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
    playerHitElement.innerHTML = nFormatter(player.advStats.hit);
    playerEvaElement.innerHTML = nFormatter(player.advStats.eva);
};