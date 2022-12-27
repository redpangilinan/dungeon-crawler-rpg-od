// Player
const player = {
    name: 'Red',
    lvl: 1,
    trait: "Keen",
    baseStats: {
        hp: null,
        hpMax: null,
        mp: null,
        mpMax: null,
        str: null,
        dex: null,
        vit: null,
        int: null
    },
    advStats: {
        atk: 0,
        mAtk: 0,
        def: 0,
        mDef: 0,
        atkSpd: 1,
        castTimeReduction: 0,
        lifesteal: 0,
        mLifesteal: 0,
        reflect: 0,
        critRate: 0,
        critDmg: 0,
    },
    exp: {
        expCurr: 0,
        expMax: 100,
        expCurrLvl: 0,
        expMaxLvl: 100
    },
    equipment: [],
    inventory: [],
};

const playerExpGain = () => {
    let expGain = 1000000;
    player.exp.expCurr += expGain;
    player.exp.expCurrLvl += expGain;

    while (player.exp.expCurr >= player.exp.expMax) {
        playerLevelUp();
    }

    playerLoadStats();
};

// Levels up the player
const playerLevelUp = () => {
    // Exp increase Formula
    if (player.lvl < 100) {
        let expMaxIncrease = Math.floor(((player.exp.expMax * 1.1) + 100) - player.exp.expMax);
        let excessExp = player.exp.expCurr - player.exp.expMax;
        player.exp.expCurrLvl = excessExp;
        player.exp.expMaxLvl = expMaxIncrease;

        // Increase player level and maximum exp
        player.lvl++;
        player.exp.expMax += expMaxIncrease;

        // Calculate stats based on trait then apply it to advanced stats then bring player hp and mp to full
        calculateTraitStats();
        calculateAdvStats();
        player.baseStats.hp = player.baseStats.hpMax;
        player.baseStats.mp = player.baseStats.mpMax;
        playerLoadStats();
    } else {
        expMaxIncrease = 0;
        player.exp.expCurr = player.exp.expMax - 1;
        player.exp.expCurrLvl = player.exp.expMaxLvl - 1;
    }
};

const calculateTraitStats = () => {
    if (player.trait == "Brute") {
        let traitStats = {
            base: {
                str: 15,
                dex: 8,
                vit: 11,
                int: 6
            },
            growth: {
                str: 3,
                dex: 1,
                vit: 3,
                int: 1
            },
        };
        setStats(traitStats);
    }
    if (player.trait == "Keen") {
        let traitStats = {
            base: {
                str: 10,
                dex: 14,
                vit: 7,
                int: 9
            },
            growth: {
                str: 2,
                dex: 3,
                vit: 2,
                int: 1
            },
        };
        setStats(traitStats);
    }
    if (player.trait == "Intelligent") {
        let traitStats = {
            base: {
                str: 5,
                dex: 8,
                vit: 7,
                int: 20
            },
            growth: {
                str: 1,
                dex: 1,
                vit: 2,
                int: 4
            },
        };
        setStats(traitStats);
    }
};

const setStats = (traitStats) => {
    player.baseStats.str = traitStats.base.str + (player.lvl * traitStats.growth.str);
    player.baseStats.dex = traitStats.base.dex + (player.lvl * traitStats.growth.dex);
    player.baseStats.vit = traitStats.base.vit + (player.lvl * traitStats.growth.vit);
    player.baseStats.int = traitStats.base.int + (player.lvl * traitStats.growth.int);
}

// Show inventory
const showInventory = () => {
    // Clear the inventory container
    let playerInventoryList = document.getElementById("playerInventory");
    playerInventoryList.innerHTML = "";

    for (let i = 0; i < player.inventory.length; i++) {
        const item = JSON.parse(player.inventory[i]);

        // Create an element to display the item's name and stats
        let itemDiv = document.createElement('div');
        itemDiv.className = "items";
        itemDiv.innerHTML = `
            <h3>${item.category}</h3>
            <p>Type: ${item.type}</p>
            <p>Rarity: ${item.rarity}</p>
            <ul>
            ${item.stats.map(stat => {
            return `<li>${Object.keys(stat)[0]}: ${stat[Object.keys(stat)[0]]}</li>`;
        }).join('')}
            </ul>
        `;

        // Create an equip button for the item
        let button = document.createElement('button');
        button.innerHTML = 'Equip';
        button.addEventListener('click', function () {
            // Remove the item from the inventory and add it to the equipment
            if (player.equipment.length >= 6) {
                alert("You are fully equipped.");
            } else {
                player.inventory.splice(i, 1);
                player.equipment.push(item);
            }

            playerLoadStats();
        });

        // Append the equip button and item details to the itemDiv
        itemDiv.appendChild(button);

        // Add the itemDiv to the inventory container
        playerInventoryList.appendChild(itemDiv);
    }
};

// Show equipment
const showEquipment = () => {
    // Clear the inventory container
    let playerEquipmentList = document.getElementById("playerEquipment");
    playerEquipmentList.innerHTML = "";

    for (let i = 0; i < player.equipment.length; i++) {
        const item = player.equipment[i];

        // Create an element to display the item's name and stats
        let equipDiv = document.createElement('div');
        equipDiv.className = "items";
        equipDiv.innerHTML = `
            <h3>${item.category}</h3>
            <p>Type: ${item.type}</p>
            <p>Rarity: ${item.rarity}</p>
            <ul>
            ${item.stats.map(stat => {
            return `<li>${Object.keys(stat)[0]}: ${stat[Object.keys(stat)[0]]}</li>`;
        }).join('')}
            </ul>
        `;

        // Create an equip button for the item
        let button = document.createElement('button');
        button.innerHTML = 'Unequip';
        button.addEventListener('click', function () {
            // Remove the item from the inventory and add it to the equipment
            player.equipment.splice(i, 1);
            player.inventory.push(JSON.stringify(item));

            playerLoadStats();
        });

        // Append the equip button and item details to the equipDiv
        equipDiv.appendChild(button);

        // Add the equipDiv to the inventory container
        playerEquipmentList.appendChild(equipDiv);
    }
};