const playerNameElement = document.getElementById('player-name');
const playerLvlElement = document.getElementById('player-lvl');
const playerHpElement = document.getElementById('player-hp');
const playerExpElement = document.getElementById('player-exp');
const playerAtkElement = document.getElementById('player-atk');
const playerDefElement = document.getElementById('player-def');
const playerAtkSpdElement = document.getElementById('player-atkspd');
const playerVampElement = document.getElementById('player-vamp');
const playerCrateElement = document.getElementById('player-crate');
const playerCdmgElement = document.getElementById('player-cdmg');

const enemyHpElement = document.getElementById('enemy-hp');

const exp = document.querySelector('#exp');

// Gain exp
exp.addEventListener("click", function () {
    playerExpGain();
});

// ========== Const Functions =========
const enemyLoadStats = () => {
    // Shows proper percentage for respective stats
    let enemyHpPercentage = ((enemy.stats.hp / enemy.stats.hpMax) * 100).toFixed(2);

    enemyHpElement.innerHTML = nFormatter(enemy.stats.hp) + "/" + nFormatter(enemy.stats.hpMax) + " (" + enemyHpPercentage + "%)";
};