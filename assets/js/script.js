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
    calculateAdvStats();
    playerLoadStats();
};

// Player
const player = {
    name: 'Red',
    lvl: 1,
    baseStats: {
        hp: 100,
        hpMax: 100,
        mp: 100,
        mpMax: 100,
        str: 10,
        dex: 10,
        vit: 10,
        int: 10
    },
    advStats: {
        atk: 0,
        mAtk: 0,
        def: 0,
        mDef: 0,
        hit: 0,
        eva: 0,
        atkSpd: 1,
        lifesteal: 0,
        critRate: 0,
        critDmg: 0,
    },
    exp: {
        expCurr: 0,
        expMax: 100,
        expCurrLvl: 0,
        expMaxLvl: 100
    },
    inventory: [],
    addToInventory: function (item) {
        this.inventory.push(item);
    },
};

// Enemy
const enemy = {
    name: 'Enemy',
    lvl: 1,
    baseStats: {
        hp: 100,
        hpMax: 100,
        mp: 100,
        mpMax: 100,
        str: 10,
        dex: 10,
        vit: 10,
        int: 10
    },
    advStats: {
        atk: 0,
        mAtk: 0,
        def: 0,
        mDef: 0,
        hit: 0,
        eva: 0,
        atkSpd: 1,
        lifesteal: 0,
        critRate: 0,
        critDmg: 0,
    },
};

// Gain exp
exp.addEventListener("click", function () {
    playerExpGain();
});

// ========== Functions ==========
function calculateAdvStats() {
    player.advStats.atk = player.baseStats.str * 4;
    player.advStats.mAtk = player.baseStats.int * 4;
    player.advStats.def = player.baseStats.vit * 2;
    player.advStats.mDef = player.baseStats.vit * 2;
    player.advStats.hit = player.baseStats.dex * 2;
    player.advStats.eva = player.baseStats.dex * 2;
}

function playerExpGain() {
    let expGain = 50;
    player.exp.expCurr += expGain;
    player.exp.expCurrLvl += expGain;

    while (player.exp.expCurr >= player.exp.expMax) {
        playerLevelUp();
    }
    calculateAdvStats();
    playerLoadStats();
}

// Levels up the player
function playerLevelUp() {
    // Calculates the excess exp and the new exp required to level up
    let expMaxIncrease = Math.floor(((player.exp.expMax * 1.1) + 100) - player.exp.expMax);
    let excessExp = player.exp.expCurr - player.exp.expMax;
    player.exp.expCurrLvl = excessExp;
    player.exp.expMaxLvl = expMaxIncrease;

    // Increase player stats
    player.lvl++;
    player.exp.expMax += expMaxIncrease;
    player.baseStats.hpMax += 50;
    player.baseStats.hp = player.baseStats.hpMax;
    player.baseStats.str += 1;
    player.baseStats.dex += 1;
    player.baseStats.vit += 1;
    player.baseStats.int += 1;
}

function playerLoadStats() {
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
}