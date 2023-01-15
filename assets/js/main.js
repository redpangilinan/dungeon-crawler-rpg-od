window.addEventListener("load", function () {
    if (player === null) {
        runLoad("character-creation", "flex");
    } else {
        let target = document.querySelector("#title-screen");
        target.style.display = "flex";
    }

    // Title Screen Validation
    document.querySelector("#title-screen").addEventListener("click", function () {
        this.style.display = "none";
        const player = JSON.parse(localStorage.getItem("playerData"));
        runLoad("dungeon-main", "flex");
        if (player.inCombat) {
            enemy = JSON.parse(localStorage.getItem("enemyData"));
            showCombatInfo();
            startCombat();
        } else {
            bgmDungeon.play();
        }
        if (player.stats.hp == 0) {
            progressReset();
        }
        initialDungeonLoad();
        playerLoadStats();
    });

    // Submit Name
    document.querySelector("#name-submit").addEventListener("submit", function (e) {
        e.preventDefault();
        let playerName = document.querySelector("#name-input").value;

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(playerName)) {
            document.querySelector("#alert").innerHTML = "Your name cannot contain special characters!";
        } else {
            if (playerName.length < 3 || playerName.length > 15) {
                document.querySelector("#alert").innerHTML = "Name should be between 3-15 characters!";
            } else {
                player = {
                    name: playerName,
                    lvl: 1,
                    stats: {
                        hp: null,
                        hpMax: null,
                        atk: null,
                        def: null,
                        pen: null,
                        atkSpd: null,
                        vamp: null,
                        critRate: null,
                        critDmg: null
                    },
                    baseStats: {
                        hp: 500,
                        atk: 100,
                        def: 50,
                        pen: 0,
                        atkSpd: 0.6,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 50
                    },
                    equippedStats: {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        pen: 0,
                        atkSpd: 0,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 0,
                        hpPct: 0,
                        atkPct: 0,
                        defPct: 0,
                        penPct: 0,
                    },
                    bonusStats: {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        atkSpd: 0,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 0
                    },
                    exp: {
                        expCurr: 0,
                        expMax: 100,
                        expCurrLvl: 0,
                        expMaxLvl: 100,
                        lvlGained: 0
                    },
                    inventory: {
                        consumables: [],
                        equipment: []
                    },
                    equipped: [],
                    gold: 0,
                    playtime: 0,
                    kills: 0,
                    deaths: 0,
                    inCombat: false
                };
                calculateStats();
                player.stats.hp = player.stats.hpMax;
                saveData();
                document.querySelector("#character-creation").style.display = "none";
                runLoad("title-screen", "flex");
            }
        }
    });

    // Unequip all items
    document.querySelector("#unequip-all").addEventListener("click", function () {
        sfxOpen.play();

        dungeon.status.exploring = false;
        let dimDungeon = document.querySelector('#dungeon-main');
        dimDungeon.style.filter = "brightness(50%)";
        defaultModalElement.style.display = "flex";
        defaultModalElement.innerHTML = `
        <div class="content">
            <p>Unequip all your items?</p>
            <div class="button-container">
                <button id="unequip-confirm">Unequip</button>
                <button id="unequip-cancel">Cancel</button>
            </div>
        </div>`;
        let confirm = document.querySelector('#unequip-confirm');
        let cancel = document.querySelector('#unequip-cancel');
        confirm.onclick = function () {
            sfxUnequip.play();
            unequipAll();
            continueExploring();
            defaultModalElement.style.display = "none";
            defaultModalElement.innerHTML = "";
            dimDungeon.style.filter = "brightness(100%)";
        };
        cancel.onclick = function () {
            sfxDecline.play();
            continueExploring();
            defaultModalElement.style.display = "none";
            defaultModalElement.innerHTML = "";
            dimDungeon.style.filter = "brightness(100%)";
        };
    });
});

const runLoad = (id, display) => {
    let loader = document.querySelector("#loading");
    loader.style.display = "flex";
    setTimeout(async () => {
        loader.style.display = "none";
        document.querySelector(`#${id}`).style.display = `${display}`;
    }, 1000);
};

const saveData = () => {
    const playerData = JSON.stringify(player);
    const dungeonData = JSON.stringify(dungeon);
    const enemyData = JSON.stringify(enemy);
    localStorage.setItem("playerData", playerData);
    localStorage.setItem("dungeonData", dungeonData);
    localStorage.setItem("enemyData", enemyData);
};

const calculateStats = () => {
    let equipmentAtkSpd = player.baseStats.atkSpd * (player.equippedStats.atkSpd / 100);
    let playerHpEquip = player.baseStats.hp + player.equippedStats.hp;
    let playerAtkEquip = player.baseStats.atk + player.equippedStats.atk;
    let playerDefEquip = player.baseStats.def + player.equippedStats.def;
    let playerAtkSpdEquip = player.baseStats.atkSpd + equipmentAtkSpd + (equipmentAtkSpd * (player.equippedStats.atkSpd / 100));
    let playerVampEquip = player.baseStats.vamp + player.equippedStats.vamp;
    let playerCRateEquip = player.baseStats.critRate + player.equippedStats.critRate;
    let playerCDmgEquip = player.baseStats.critDmg + player.equippedStats.critDmg;

    player.stats.hpMax = Math.round(playerHpEquip + playerHpEquip * (player.bonusStats.hp / 100));
    player.stats.atk = Math.round(playerAtkEquip + playerAtkEquip * (player.bonusStats.atk / 100));
    player.stats.def = Math.round(playerDefEquip + playerDefEquip * (player.bonusStats.def / 100));
    player.stats.atkSpd = playerAtkSpdEquip + playerAtkSpdEquip * (player.bonusStats.atkSpd / 100);
    player.stats.vamp = playerVampEquip + player.bonusStats.vamp;
    player.stats.critRate = playerCRateEquip + player.bonusStats.critRate;
    player.stats.critDmg = playerCDmgEquip + player.bonusStats.critDmg;

    // Caps attack speed to 3
    if (player.stats.atkSpd > 3) {
        player.stats.atkSpd = 3;
    }
};

// Resets the progress back to start
const progressReset = () => {
    player.stats.hp = player.stats.hpMax;
    player.lvl = 1;
    player.exp = {
        expCurr: 0,
        expMax: 100,
        expCurrLvl: 0,
        expMaxLvl: 100,
        lvlGained: 0
    };
    player.bonusStats = {
        hp: 0,
        atk: 0,
        def: 0,
        atkSpd: 0,
        vamp: 0,
        critRate: 0,
        critDmg: 0
    };
    dungeon.progress.floor = 1;
    dungeon.progress.room = 1;
    dungeon.statistics.kills = 0;
    dungeon.status = {
        exploring: false,
        paused: true,
        event: false,
    };
    dungeon.backlog.length = 0;
    dungeon.action = 0;
    dungeon.statistics.runtime = 0;
    combatBacklog.length = 0;
    saveData();
}