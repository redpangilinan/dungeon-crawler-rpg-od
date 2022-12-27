const createEquipment = () => {
    const equipment = {
        category: "",
        attribute: "",
        type: "",
        rarity: "",
        stats: []
    };

    // Generate random equipment attribute
    const equipmentAttributes = ["Physical", "Magic", "Defense"];
    equipment.attribute = equipmentAttributes[Math.floor(Math.random() * equipmentAttributes.length)];

    // Generate random equipment name and type based on attribute
    if (equipment.attribute == "Physical") {
        const equipmentCategories = ["Sword", "Axe", "Dagger", "Flail", "Scythe"];
        equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        equipment.type = "Weapon";
    } else if (equipment.attribute == "Magic") {
        const equipmentCategories = ["Wand", "Staff", "Rod"];
        equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        equipment.type = "Weapon";
    } else if (equipment.attribute == "Defense") {
        const equipmentTypes = ["Armor", "Shield"];
        equipment.type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        if (equipment.type == "Armor") {
            const equipmentCategories = ["Plate", "Chain", "Leather"];
            equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        } else if (equipment.type == "Shield") {
            const equipmentCategories = ["Tower", "Kite", "Buckler"];
            equipment.category = equipmentCategories[Math.floor(Math.random() * equipmentCategories.length)];
        }
    }

    // Generate random equipment rarity
    const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
    equipment.rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Determine number of times to loop based on equipment rarity
    let loopCount;
    switch (equipment.rarity) {
        case "Common":
            loopCount = 2;
            break;
        case "Uncommon":
            loopCount = 3;
            break;
        case "Rare":
            loopCount = 4;
            break;
        case "Epic":
            loopCount = 5;
            break;
        case "Legendary":
            loopCount = 6;
            break;
    }

    // Generate and append random stats to the stats array
    const physicalStats = ["str", "dex", "atk", "atkSpd", "lifesteal", "critRate", "critDmg"];
    const damageyStats = ["str", "atk", "lifesteal", "critRate", "critDmg"];
    const speedyStats = ["dex", "atk", "atkSpd", "lifesteal", "critRate", "critDmg"];
    const magicStats = ["int", "mAtk", "castTimeReduction", "mLifesteal"];
    const defenseStats = ["hpMax", "mpMax", "vit", "def", "mDef", "reflect"];
    let statTypes;
    if (equipment.attribute == "Physical") {
        if (equipment.category == "Axe" || equipment.category == "Scythe") {
            statTypes = damageyStats;
        } else if (equipment.category == "Dagger" || equipment.category == "Flail") {
            statTypes = speedyStats;
        } else {
            statTypes = physicalStats;
        }
    } else if (equipment.attribute == "Magic") {
        statTypes = magicStats;
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
    player.inventory.push(JSON.stringify(equipment));
    showInventory();
    showEquipment();
};