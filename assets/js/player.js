let player = JSON.parse(localStorage.getItem("playerData"));
let inventoryOpen = false;

const playerExpGain = () => {
    let expGain = enemy.rewards.exp;
    player.exp.expCurr += expGain;
    player.exp.expCurrLvl += expGain;

    while (player.exp.expCurr >= player.exp.expMax) {
        playerLevelUp();
    }

    playerLoadStats();
};

// Levels up the player
const playerLevelUp = () => {
    sfxLevelUp.play();

    // Calculates the excess exp and the new exp required to level up
    let expMaxIncrease = Math.floor(((player.exp.expMax * 1.1) + 100) - player.exp.expMax);
    let excessExp = player.exp.expCurr - player.exp.expMax;
    player.exp.expCurrLvl = excessExp;
    player.exp.expMaxLvl = expMaxIncrease;

    // Increase player level and maximum exp
    player.lvl++;
    player.exp.expMax += expMaxIncrease;

    // Calculate stats based on trait then apply it to advanced stats then bring player hp and mp to full
    calculateStats();
    player.stats.hp = player.stats.hpMax;
    playerLoadStats();
    addCombatLog(`You leveled up! (Lv.${player.lvl - 1} > Lv.${player.lvl})`)
};

// Refresh the player stats
const playerLoadStats = () => {
    showEquipment();
    showInventory();
    applyEquipmentStats();

    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    if (player.stats.hp > player.stats.hpMax) {
        player.stats.hp = player.stats.hpMax;
    }
    player.stats.hpPercent = ((player.stats.hp / player.stats.hpMax) * 100).toFixed(2).replace(rx, "$1");
    player.exp.expPercent = ((player.exp.expCurrLvl / player.exp.expMaxLvl) * 100).toFixed(2).replace(rx, "$1");

    if (player.inCombat || playerDead) {
        const playerCombatHpElement = document.querySelector('#player-hp-battle');
        const playerExpElement = document.querySelector('#player-exp-bar');
        const playerInfoElement = document.querySelector('#player-combat-info');
        playerCombatHpElement.innerHTML = `&nbsp${nFormatter(player.stats.hp)}/${nFormatter(player.stats.hpMax)}(${player.stats.hpPercent}%)`;
        playerCombatHpElement.style.width = `${player.stats.hpPercent}%`;
        playerExpElement.style.width = `${player.exp.expPercent}%`;
        playerInfoElement.innerHTML = `${player.name} Lv.${player.lvl} (${player.exp.expPercent}%)`;
    }

    // Header
    document.querySelector("#player-name").innerHTML = `<i class="fas fa-user"></i>${player.name} Lv.${player.lvl}`;
    document.querySelector("#player-exp").innerHTML = `<p>Exp</p> ${nFormatter(player.exp.expCurr)}/${nFormatter(player.exp.expMax)} (${player.exp.expPercent}%)`;
    document.querySelector("#player-gold").innerHTML = `<i class="fas fa-coins" style="color: #FFD700;"></i>${nFormatter(player.gold)}`;

    // Player Stats
    playerHpElement.innerHTML = `${nFormatter(player.stats.hp)}/${nFormatter(player.stats.hpMax)} (${player.stats.hpPercent}%)`;
    playerAtkElement.innerHTML = nFormatter(player.stats.atk);
    playerDefElement.innerHTML = nFormatter(player.stats.def);
    playerAtkSpdElement.innerHTML = (player.stats.atkSpd).toFixed(1).replace(rx, "$1");
    playerVampElement.innerHTML = (player.stats.vamp).toFixed(1).replace(rx, "$1") + "%";
    playerCrateElement.innerHTML = (player.stats.critRate).toFixed(1).replace(rx, "$1") + "%";
    playerCdmgElement.innerHTML = (player.stats.critDmg).toFixed(1).replace(rx, "$1") + "%";
};

// Opens inventory
const openInventory = () => {
    sfxOpen.play();

    dungeon.status.exploring = false;
    let scroll = document.querySelector('#playerInventory')
    scroll.scrollBottom - scroll.clientHeight;

    inventoryOpen = true;
    let openInv = document.querySelector('#inventory');
    let dimDungeon = document.querySelector('#dungeon-main');
    openInv.style.display = "flex";
    dimDungeon.style.filter = "brightness(50%)";
};

// Closes inventory
const closeInventory = () => {
    sfxDecline.play();

    let openInv = document.querySelector('#inventory');
    let dimDungeon = document.querySelector('#dungeon-main');
    openInv.style.display = "none";
    dimDungeon.style.filter = "brightness(100%)";
    inventoryOpen = false;
    if (!dungeon.status.paused) {
        dungeon.status.exploring = true;
    }
};

// Continue exploring if inventory is not open and the game is not paused
const continueExploring = () => {
    if (!inventoryOpen && !dungeon.status.paused) {
        dungeon.status.exploring = true;
    }
};

const lvlupPopup = () => {
    const lvlupPanel = document.querySelector("#lvlupPanel");
    const lvlupSelect = document.querySelector("#lvlupSelect");
    lvlupPanel.style.display = "flex";
    lvlupSelect.innerHTML = `
        <h1>Level Up!</h1>
        <div class="content-head">
            <h4>Remaining: 0</h4>
            <button id="lvlReroll">Reroll 1/1</button>
        </div>
    `;
    let stats = ["hp", "atk", "def", "atkSpd", "vamp", "critRate", "critDmg"];
    let percentage = 3;
    let selectedStats = [];

    while (selectedStats.length < 4) {
        let randomIndex = Math.floor(Math.random() * stats.length);
        if (!selectedStats.includes(stats[randomIndex])) {
            selectedStats.push(stats[randomIndex]);
        }
    }

    for (let i = 1; i <= 4; i++) {
        let button = document.createElement("button");
        button.id = "lvlSlot" + i;

        let h3 = document.createElement("h3");
        h3.innerText = selectedStats[i - 1];
        button.appendChild(h3);

        let p = document.createElement("p");
        p.innerText = "Increase " + selectedStats[i - 1] + " by " + percentage + "%.";
        button.appendChild(p);

        button.addEventListener("click", function () {
            player.bonusStats[selectedStats[i - 1]] += percentage;
        });

        lvlupSelect.appendChild(button);
    }
}