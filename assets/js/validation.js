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
        initialDungeonLoad();
        if (player.inCombat) {
            generateRandomEnemy();
            showCombatInfo();
            startCombat();
        }
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
                        atkSpd: null,
                        vamp: null,
                        critRate: null,
                        critDmg: null
                    },
                    baseStats: {
                        hp: 500,
                        atk: 100,
                        def: 50,
                        atkSpd: 0.6,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 50
                    },
                    equippedStats: {
                        hp: 0,
                        atk: 0,
                        def: 0,
                        atkSpd: 0,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 0
                    },
                    bonusStats: [],
                    exp: {
                        expCurr: 0,
                        expMax: 100,
                        expCurrLvl: 0,
                        expMaxLvl: 100
                    },
                    inventory: {
                        consumables: [],
                        equipment: []
                    },
                    equipped: [],
                    gold: 0,
                    playtime: 0,
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
});

const runLoad = (id, display) => {
    let loader = document.querySelector("#loading");
    loader.style.display = "flex";
    setTimeout(async () => {
        loader.style.display = "none";
        document.querySelector(`#${id}`).style.display = `${display}`;
    }, 1000);
}

const saveData = () => {
    let playerData = JSON.stringify(player);
    localStorage.setItem("playerData", playerData);
}

const calculateStats = () => {
    player.stats.hpMax = player.baseStats.hp + player.equippedStats.hp;
    player.stats.atk = player.baseStats.atk + player.equippedStats.atk;
    player.stats.def = player.baseStats.def + player.equippedStats.def;
    player.stats.atkSpd = player.baseStats.atkSpd + player.equippedStats.atkSpd;
    player.stats.vamp = player.baseStats.vamp + player.equippedStats.vamp;
    player.stats.critRate = player.baseStats.critRate + player.equippedStats.critRate;
    player.stats.critDmg = player.baseStats.critDmg + player.equippedStats.critDmg;
};