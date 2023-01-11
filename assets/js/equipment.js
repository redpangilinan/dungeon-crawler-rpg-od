const createEquipment = () => {
    const equipment = {
        category: "",
        attribute: "",
        type: "",
        rarity: "",
        stats: [],
        icon: null,
    };

    // Generate random equipment attribute
    const equipmentAttributes = ["Damage", "Defense"];
    equipment.attribute = equipmentAttributes[Math.floor(Math.random() * equipmentAttributes.length)];

    // Generate random equipment name and type based on attribute
    if (equipment.attribute == "Damage") {
        const equipmentCategories = ["Sword", "Axe", "Hammer", "Dagger", "Flail", "Scythe"];
        equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        equipment.type = "Weapon";
    } else if (equipment.attribute == "Defense") {
        const equipmentTypes = ["Armor", "Shield", "Helmet"];
        equipment.type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        if (equipment.type == "Armor") {
            const equipmentCategories = ["Plate", "Chain", "Leather"];
            equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        } else if (equipment.type == "Shield") {
            const equipmentCategories = ["Tower", "Kite", "Buckler"];
            equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        } else if (equipment.type == "Helmet") {
            const equipmentCategories = ["Great Helm", "Horned Helm"];
            equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        }
    }

    // Generate random equipment rarity
    const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical"];
    equipment.rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Determine number of times to loop based on equipment rarity
    let loopCount;
    switch (equipment.rarity) {
        case "Common":
            loopCount = 3;
            break;
        case "Uncommon":
            loopCount = 4;
            break;
        case "Rare":
            loopCount = 5;
            break;
        case "Epic":
            loopCount = 6;
            break;
        case "Legendary":
            loopCount = 7;
            break;
        case "Mythical":
            loopCount = 8;
            break;
    }

    // Generate and append random stats to the stats array
    const physicalStats = ["atk", "atkSpd", "vamp", "critRate", "critDmg"];
    const damageyStats = ["atk", "atk", "critRate", "critDmg", "critDmg"];
    const speedyStats = ["atkSpd", "atkSpd", "vamp", "critRate", "critDmg"];
    const defenseStats = ["hp", "hp", "def", "def", "atk"];
    let statTypes;
    if (equipment.attribute == "Damage") {
        if (equipment.category == "Axe" || equipment.category == "Scythe" || equipment.category == "Hammer") {
            statTypes = damageyStats;
        } else if (equipment.category == "Dagger" || equipment.category == "Flail") {
            statTypes = speedyStats;
        } else {
            statTypes = physicalStats;
        }
    } else if (equipment.attribute == "Defense") {
        statTypes = defenseStats;
    }
    for (let i = 0; i < loopCount; i++) {
        let statType = statTypes[Math.floor(Math.random() * statTypes.length)];
        let statValue = Math.floor(Math.random() * 100);

        // Check if stat type already exists in stats array
        let statExists = false;
        for (let j = 0; j < equipment.stats.length; j++) {
            if (Object.keys(equipment.stats[j])[0] == statType) {
                statExists = true;
                break;
            }
        }

        // If stat type already exists, add values together
        if (statExists) {
            for (let j = 0; j < equipment.stats.length; j++) {
                if (Object.keys(equipment.stats[j])[0] == statType) {
                    equipment.stats[j][statType] += statValue;
                    break;
                }
            }
        }
        // If stat type does not exist, add new stat to stats array
        else {
            equipment.stats.push({ [statType]: statValue });
        }
    }
    player.inventory.equipment.push(JSON.stringify(equipment));

    saveData();
    showInventory();
    showEquipment();

    return (`<span class="${equipment.rarity}">${equipmentIcon(equipment.category)}${equipment.rarity} ${equipment.category}</span>`);
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
};