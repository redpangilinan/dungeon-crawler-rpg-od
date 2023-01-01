window.addEventListener("load", function () {
    // Title Screen Validation
    document.querySelector("#title-screen").addEventListener("click", function () {
        if (player === null) {
            this.style.display = "none";
            runLoad("character-creation", "flex");
        } else {
            this.style.display = "none";
            const player = JSON.parse(localStorage.getItem("playerData"));
            initialLoad(player);
            runLoad("hub", "flex");
            console.log(player);
        }
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
                        atkSpd: 0.8,
                        vamp: 0,
                        critRate: 0,
                        critDmg: 0
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
                    cubes: 0,
                    playtime: 0,
                };
                calculateStats();
                player.stats.hp = player.stats.hpMax;
                saveData();
                document.querySelector("#character-creation").style.display = "none";
                initialLoad(player);
                runLoad("hub", "flex");
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

const initialLoad = (player) => {
    // Header
    document.querySelector("#player-name").innerHTML = `<i class="fas fa-user"></i>${player.name}`
    document.querySelector("#player-gold").innerHTML = `<i class="fas fa-coins" style="color: #FFD700;"></i>${nFormatter(player.gold)}`
    document.querySelector("#player-cubes").innerHTML = `<i class="fas fa-cube" style="color: #A020F0;"></i>${nFormatter(player.cubes)}`

    // Player Stats
    playerHpElement.innerHTML = nFormatter(player.stats.hp) + "/" + nFormatter(player.stats.hpMax);
    playerAtkElement.innerHTML = nFormatter(player.stats.atk);
    playerDefElement.innerHTML = nFormatter(player.stats.def);
    playerAtkSpdElement.innerHTML = (player.stats.atkSpd).toFixed(1);
    playerVampElement.innerHTML = (player.stats.vamp).toFixed(2) + "%";
    playerCrateElement.innerHTML = (player.stats.critRate).toFixed(2) + "%";
    playerCdmgElement.innerHTML = (player.stats.critDmg).toFixed(2) + "%";

    showEquipment();
    showInventory();
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