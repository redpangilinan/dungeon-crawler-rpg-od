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

const equipmentIcon = (equipment) => {
    if (equipment == "Sword") {
        return '<i class="ra ra-relic-blade"></i>';
    } else if (equipment == "Axe") {
        return '<i class="ra ra-axe"></i>';
    } else if (equipment == "Hammer") {
        return '<i class="ra ra-flat-hammer"></i>';
    } else if (equipment == "Dagger") {
        return '<i class="ra ra-bowie-knife"></i>';
    } else if (equipment == "Flail") {
        return '<i class="ra ra-chain"></i>';
    } else if (equipment == "Scythe") {
        return '<i class="ra ra-scythe"></i>';
    } else if (equipment == "Plate") {
        return '<i class="ra ra-vest"></i>';
    } else if (equipment == "Chain") {
        return '<i class="ra ra-vest"></i>';
    } else if (equipment == "Leather") {
        return '<i class="ra ra-vest"></i>';
    } else if (equipment == "Tower") {
        return '<i class="ra ra-shield"></i>';
    } else if (equipment == "Kite") {
        return '<i class="ra ra-heavy-shield"></i>';
    } else if (equipment == "Buckler") {
        return '<i class="ra ra-round-shield"></i>';
    } else if (equipment == "Great Helm") {
        return '<i class="ra ra-knight-helmet"></i>';
    } else if (equipment == "Horned Helm") {
        return '<i class="ra ra-helmet"></i>';
    }
}

const showItemInfo = (item, icon, type, i) => {
    let itemInfo = document.querySelector("#equipmentInfo");
    let target = null;
    if (type == "Equip") {
        target = "#inventory";
    } else if (type == "Unequip") {
        target = "#dungeon-main";
    }
    let dimContainer = document.querySelector(`${target}`);
    itemInfo.style.display = "flex";
    dimContainer.style.filter = "brightness(50%)";
    itemInfo.innerHTML = `
            <div class="content">
                <h3 class="${item.rarity}">${icon}${item.rarity} ${item.category}</h3>
                <ul>
                ${item.stats.map(stat => {
        return `<li>${Object.keys(stat)[0]}: ${stat[Object.keys(stat)[0]]}</li>`;
    }).join('')}
                </ul>
                <div class="button-container">
                    <button id="un-equip">${type}</button>
                    <button id="discard">Discard</button>
                    <button id="close-item-info">Close</button>
                </div>
            </div>`;

    // Equip button for the item
    let unEquip = document.querySelector("#un-equip");
    unEquip.addEventListener('click', function () {
        if (type == "Equip") {
            // Remove the item from the inventory and add it to the equipment
            itemInfo.style.display = "none";
            dimContainer.style.filter = "brightness(100%)";
            if (player.equipped.length >= 6) {
                alert("You are fully equipped.");
            } else {
                player.inventory.equipment.splice(i, 1);
                player.equipped.push(item);
            }
            playerLoadStats();
            saveData();
        } else if (type == "Unequip") {
            // Remove the item from the equipment and add it to the inventory
            itemInfo.style.display = "none";
            dimContainer.style.filter = "brightness(100%)";
            player.equipped.splice(i, 1);
            player.inventory.equipment.push(JSON.stringify(item));
            playerLoadStats();
            saveData();
        }
    });

    // Close item info
    let close = document.querySelector("#close-item-info");
    close.addEventListener('click', function () {
        itemInfo.style.display = "none";
        dimContainer.style.filter = "brightness(100%)";
    });
}

// Show inventory
const showInventory = () => {
    // Clear the inventory container
    let playerInventoryList = document.getElementById("playerInventory");
    playerInventoryList.innerHTML = "";

    if (player.inventory.equipment.length == 0) {
        playerInventoryList.innerHTML = "There are no items available.";
    }

    for (let i = 0; i < player.inventory.equipment.length; i++) {
        const item = JSON.parse(player.inventory.equipment[i]);

        // Create an element to display the item's name
        let itemDiv = document.createElement('div');
        let icon = equipmentIcon(item.category);
        itemDiv.className = "items";
        itemDiv.innerHTML = `<p class="${item.rarity}">${icon}${item.rarity} ${item.category}</p>`;
        itemDiv.addEventListener('click', function () {
            let type = "Equip";
            showItemInfo(item, icon, type, i);
        });

        // Add the itemDiv to the inventory container
        playerInventoryList.appendChild(itemDiv);
    }
};

// Show equipment
const showEquipment = () => {
    // Clear the inventory container
    let playerEquipmentList = document.getElementById("playerEquipment");
    playerEquipmentList.innerHTML = "";

    // Show a message if a player has no equipment
    if (player.equipped.length == 0) {
        playerEquipmentList.innerHTML = "You haven't equipped anything.";
    }

    for (let i = 0; i < player.equipped.length; i++) {
        const item = player.equipped[i];

        // Create an element to display the item's name
        let equipDiv = document.createElement('div');
        let icon = equipmentIcon(item.category);
        equipDiv.className = "items";
        equipDiv.innerHTML = `<p class="${item.rarity}">${icon}${item.rarity} ${item.category}</p>`;
        equipDiv.addEventListener('click', function () {
            let type = "Unequip";
            showItemInfo(item, icon, type, i);
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

const openInventory = () => {
    let openInv = document.querySelector('#inventory');
    let dimDungeon = document.querySelector('#dungeon-main');
    openInv.style.display = "flex";
    dimDungeon.style.filter = "brightness(50%)";
};

const closeInventory = () => {
    let openInv = document.querySelector('#inventory');
    let dimDungeon = document.querySelector('#dungeon-main');
    openInv.style.display = "none";
    dimDungeon.style.filter = "brightness(100%)";
};