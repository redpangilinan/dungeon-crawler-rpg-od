let player = JSON.parse(localStorage.getItem("playerData"));

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
        calculateStats();
        player.stats.hp = player.stats.hpMax;
        playerLoadStats();
    } else {
        expMaxIncrease = 0;
        player.exp.expCurr = player.exp.expMax - 1;
        player.exp.expCurrLvl = player.exp.expMaxLvl - 1;
    }
};

// Show inventory
const showInventory = () => {
    // Clear the inventory container
    let playerInventoryList = document.getElementById("playerInventory");
    playerInventoryList.innerHTML = "";

    for (let i = 0; i < player.inventory.equipment.length; i++) {
        const item = JSON.parse(player.inventory.equipment[i]);

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
            if (player.equipped.length >= 6) {
                alert("You are fully equipped.");
            } else {
                player.inventory.equipment.splice(i, 1);
                player.equipped.push(item);
            }
            playerLoadStats();
            saveData();
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

    for (let i = 0; i < player.equipped.length; i++) {
        const item = player.equipped[i];

        // Create an element to display the item's name and stats
        let equipDiv = document.createElement('div');
        equipDiv.className = "items";
        equipDiv.innerHTML = `<p class="${item.rarity}">${item.rarity} ${item.category}</p>`;
        equipDiv.addEventListener('click', function () {
            let equipInfo = document.createElement('div');
            // Create an equip button for the item
            let button = document.createElement('button');
            button.innerHTML = 'Unequip';
            button.addEventListener('click', function () {
                // Remove the item from the inventory and add it to the equipment
                player.equipped.splice(i, 1);
                player.inventory.equipment.push(JSON.stringify(item));
                playerLoadStats();
                saveData();
            });

            // Append the equip button and item details to the equipDiv
            equipDiv.appendChild(button);
        });

        // Add the equipDiv to the inventory container
        playerEquipmentList.appendChild(equipDiv);
    }
};

// Apply the equipment stats to the player
const applyEquipmentStats = () => {
    // Reset the equipment stats
    player.equippedStats = {
        hp: 0,
        atk: 0,
        def: 0,
        atkSpd: 0,
        vamp: 0,
        critRate: 0,
        critDmg: 0
    };

    for (let i = 0; i < player.equipped.length; i++) {
        const item = player.equipped[i];

        // Iterate through the stats array and update the player stats
        item.stats.forEach(stat => {
            for (const key in stat) {
                player.equippedStats[key] += stat[key];
            }
        });
    }
    calculateStats();
}

// Refresh the player stats
const playerLoadStats = () => {
    showEquipment();
    showInventory();
    applyEquipmentStats();

    // Shows proper percentage for respective stats
    let playerHpPercentage = ((player.stats.hp / player.stats.hpMax) * 100).toFixed(2);
    // let playerExpPercentage = ((player.exp.expCurrLvl / player.exp.expMaxLvl) * 100).toFixed(2);

    // Displays the stats of the player
    playerNameElement.innerHTML = player.name;
    // playerLvlElement.innerHTML = player.lvl;
    playerHpElement.innerHTML = nFormatter(player.stats.hp) + "/" + nFormatter(player.stats.hpMax) + " (" + playerHpPercentage + "%)";
    // playerExpElement.innerHTML = nFormatter(player.exp.expCurr) + "/" + nFormatter(player.exp.expMax) + " (" + playerExpPercentage + "%)";

    // Stats
    playerAtkElement.innerHTML = nFormatter(player.stats.atk);
    playerDefElement.innerHTML = nFormatter(player.stats.def);
    playerAtkSpdElement.innerHTML = (player.stats.atkSpd).toFixed(1);
    playerVampElement.innerHTML = (player.stats.vamp).toFixed(2) + "%";;
    playerCrateElement.innerHTML = (player.stats.critRate).toFixed(2) + "%";
    playerCdmgElement.innerHTML = (player.stats.critDmg).toFixed(2) + "%";
};