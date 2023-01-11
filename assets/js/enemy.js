// Enemy
let enemy = {
    name: null,
    type: null,
    lvl: 1,
    stats: {
        hp: null,
        hpMax: null,
        atk: 0,
        def: 0,
        atkSpd: 0,
        vamp: 0,
        critRate: 0,
        critDmg: 0
    },
    image: {
        name: null,
        type: null,
        size: null
    },
    drops: []
};

const generateRandomEnemy = () => {
    // List of possible enemy names
    const enemyNames = [
        // Goblin
        'Goblin', 'Goblin Rogue', 'Goblin Mage', 'Goblin Archer',
        // Wolf
        'Wolf', 'Black Wolf', 'Winter Wolf',
        // Slime
        'Slime', 'Angel Slime', 'Knight Slime', 'Crusader Slime',
        // Orc
        'Orc Swordsmaster', 'Orc Axe', 'Orc Archer', 'Orc Mage',
        // Spider
        'Spider', 'Red Spider', 'Green Spider',
        // Skeleton
        'Skeleton Archer', 'Skeleton Swordsmaster', 'Skeleton Knight', 'Skeleton Mage', 'Skeleton Pirate', 'Skeleton Samurai', 'Skeleton Warrior'
    ];
    const enemyTypes = ['Offensive', 'Defensive', 'Balanced', 'Quick', 'Lethal'];
    let selectedEnemies = null;

    // Generate a random enemy name
    enemy.type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    // Generate proper enemy info
    switch (enemy.type) {
        case "Offensive":
            // Select name and apply stats for Offensive enemies
            selectedEnemies = enemyNames.filter(name => [
                'Goblin Mage', 'Goblin Archer',
                'Wolf', 'Black Wolf', 'Winter Wolf',
                'Knight Slime',
                'Orc Swordsmaster', 'Orc Axe', 'Orc Archer', 'Orc Mage',
                'Red Spider',
                'Skeleton Archer', 'Skeleton Swordsmaster', 'Skeleton Mage', 'Skeleton Pirate', 'Skeleton Samurai',
            ].includes(name));
            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
            setEnemyStats(enemy.type);
            break;
        case "Defensive":
            // Select name and apply stats for Defensive enemies
            selectedEnemies = enemyNames.filter(name => [
                'Angel Slime', 'Knight Slime', 'Crusader Slime',
                'Green Spider',
                'Skeleton Knight', 'Skeleton Warrior'
            ].includes(name));
            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
            setEnemyStats(enemy.type);
            break;
        case "Balanced":
            // Select name and apply stats for Balanced enemies
            selectedEnemies = enemyNames.filter(name => [
                'Goblin',
                'Slime', 'Angel Slime', 'Knight Slime',
                'Orc Swordsmaster', 'Orc Axe', 'Orc Archer', 'Orc Mage',
                'Spider',
                'Skeleton Knight', 'Skeleton Warrior'
            ].includes(name));
            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
            setEnemyStats(enemy.type);
            break;
        case "Quick":
            // Select name and apply stats for Quick enemies
            selectedEnemies = enemyNames.filter(name => [
                'Goblin', 'Goblin Rogue', 'Goblin Archer',
                'Wolf', 'Black Wolf', 'Winter Wolf',
                'Orc Swordsmaster',
                'Spider', 'Red Spider', 'Green Spider',
                'Skeleton Swordsmaster', 'Skeleton Pirate', 'Skeleton Samurai'
            ].includes(name));
            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
            setEnemyStats(enemy.type);
            break;
        case "Lethal":
            // Select name and apply stats for Lethal enemies
            selectedEnemies = enemyNames.filter(name => [
                'Goblin Rogue',
                'Wolf', 'Black Wolf', 'Winter Wolf',
                'Orc Swordsmaster', 'Orc Axe',
                'Red Spider',
                'Skeleton Swordsmaster', 'Skeleton Samurai'
            ].includes(name));
            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];
            setEnemyStats(enemy.type);
            break;
    }
}

// Set a randomly generated stat for the enemy
const setEnemyStats = (type) => {
    if (type == "Offensive") {
        enemy.stats = {
            hp: 0,
            hpMax: randomizeNum(180, 250),
            atk: randomizeNum(70, 100),
            def: randomizeNum(20, 50),
            atkSpd: randomizeDecimal(0.45, 0.65),
            vamp: 0,
            critRate: randomizeDecimal(1, 5),
            critDmg: randomizeDecimal(50, 70)
        };
    } else if (type == "Defensive") {
        enemy.stats = {
            hp: 0,
            hpMax: randomizeNum(250, 350),
            atk: randomizeNum(40, 70),
            def: randomizeNum(40, 70),
            atkSpd: randomizeDecimal(0.3, 0.5),
            vamp: 0,
            critRate: randomizeDecimal(1, 2),
            critDmg: randomizeDecimal(50, 55)
        };
    } else if (type == "Balanced") {
        enemy.stats = {
            hp: 0,
            hpMax: randomizeNum(200, 300),
            atk: randomizeNum(50, 80),
            def: randomizeNum(30, 60),
            atkSpd: randomizeDecimal(0.4, 0.6),
            vamp: 0,
            critRate: randomizeDecimal(1, 2),
            critDmg: randomizeDecimal(50, 60)
        };
    } else if (type == "Quick") {
        enemy.stats = {
            hp: 0,
            hpMax: randomizeNum(180, 250),
            atk: randomizeNum(50, 80),
            def: randomizeNum(30, 60),
            atkSpd: randomizeDecimal(0.7, 0.9),
            vamp: 0,
            critRate: randomizeDecimal(1, 5),
            critDmg: randomizeDecimal(50, 70)
        };
    } else if (type == "Lethal") {
        enemy.stats = {
            hp: 0,
            hpMax: randomizeNum(180, 250),
            atk: randomizeNum(70, 100),
            def: randomizeNum(20, 50),
            atkSpd: randomizeDecimal(0.3, 0.5),
            vamp: 0,
            critRate: randomizeDecimal(5, 10),
            critDmg: randomizeDecimal(70, 90)
        };
    }

    // Apply stat scaling for enemies each level
    for (const stat in enemy.stats) {
        if (["hpMax", "atk", "def"].includes(stat)) {
            enemy.stats[stat] += enemy.stats[stat] * ((dungeon.settings.enemyScaling - 1) * enemy.lvl);
        } else if (["atkSpd", "critRate", "critDmg"].includes(stat)) {
            enemy.stats[stat] += enemy.stats[stat] * (((dungeon.settings.enemyScaling - 1) / 4) * enemy.lvl);
        }
    }

    enemy.stats.hp = enemy.stats.hpMax;
}

const setEnemyImg = () => {
    // Apply monster image
    enemy.image.type = '.png';
    switch (enemy.name) {
        // Goblins
        case 'Goblin':
            enemy.image.name = 'goblin';
            enemy.image.size = '50%';
            break;
        case 'Goblin Rogue':
            enemy.image.name = 'goblin_rogue';
            enemy.image.size = '50%';
            break;
        case 'Goblin Archer':
            enemy.image.name = 'goblin_archer';
            enemy.image.size = '50%';
            break;
        case 'Goblin Mage':
            enemy.image.name = 'goblin_mage';
            enemy.image.size = '50%';
            break;

        // Wolf
        case 'Wolf':
            enemy.image.name = 'wolf';
            enemy.image.size = '50%';
            break;
        case 'Black Wolf':
            enemy.image.name = 'wolf_black';
            enemy.image.size = '50%';
            break;
        case 'Winter Wolf':
            enemy.image.name = 'wolf_winter';
            enemy.image.size = '50%';
            break;

        // Slime
        case 'Slime':
            enemy.image.name = 'slime';
            enemy.image.size = '50%';
            break;
        case 'Angel Slime':
            enemy.image.name = 'slime_angel';
            enemy.image.size = '50%';
            break;
        case 'Knight Slime':
            enemy.image.name = 'slime_knight';
            enemy.image.size = '50%';
            break;
        case 'Crusader Slime':
            enemy.image.name = 'slime_crusader';
            enemy.image.size = '50%';
            break;

        // Orc
        case 'Orc Swordsmaster':
            enemy.image.name = 'orc_swordsmaster';
            enemy.image.size = '50%';
            break;
        case 'Orc Axe':
            enemy.image.name = 'orc_axe';
            enemy.image.size = '50%';
            break;
        case 'Orc Archer':
            enemy.image.name = 'orc_archer';
            enemy.image.size = '50%';
            break;
        case 'Orc Mage':
            enemy.image.name = 'orc_mage';
            enemy.image.size = '50%';

        // Spider
        case 'Spider':
            enemy.image.name = 'spider';
            enemy.image.size = '50%';
            break;
        case 'Red Spider':
            enemy.image.name = 'spider_red';
            enemy.image.size = '50%';
            break;
        case 'Green Spider':
            enemy.image.name = 'spider_green';
            enemy.image.size = '50%';
            break;

        // Skeleton
        case 'Skeleton Archer':
            enemy.image.name = 'skeleton_archer';
            enemy.image.size = '50%';
            break;
        case 'Skeleton Swordsmaster':
            enemy.image.name = 'skeleton_swordsmaster';
            enemy.image.size = '50%';
            break;
        case 'Skeleton Knight':
            enemy.image.name = 'skeleton_knight';
            enemy.image.size = '50%';
            break;
        case 'Skeleton Mage':
            if (randomizeNum(1, 2) == 1) {
                enemy.image.name = 'skeleton_mage1';
            } else {
                enemy.image.name = 'skeleton_mage2';
            }
            enemy.image.size = '50%';
            break;
        case 'Skeleton Pirate':
            enemy.image.name = 'skeleton_pirate';
            enemy.image.size = '50%';
            break;
        case 'Skeleton Samurai':
            enemy.image.name = 'skeleton_samurai';
            enemy.image.size = '50%';
            break;
        case 'Skeleton Warrior':
            enemy.image.name = 'skeleton_warrior';
            enemy.image.size = '50%';
            break;
    };
}