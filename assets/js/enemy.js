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
    drops: [],
    image: null
};

const generateRandomEnemy = () => {
    // List of possible enemy names
    const enemyNames = ['Goblin', 'Wolf', 'Slime', 'Orc', 'Troll', 'Spider', 'Zombie', 'Skeleton'];
    const enemyTypes = ['Offensive', 'Defensive', 'Balanced', 'Speedy', 'Lethal'];

    // Generate a random enemy name
    enemy.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    enemy.type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    // Generate random stats for the enemy
    enemy.stats = {
        hp: 0,
        hpMax: randomizeNum(200, 300),
        atk: randomizeNum(50, 80),
        def: randomizeNum(30, 60),
        atkSpd: randomizeDecimal(0.4, 1).toFixed(1),
        vamp: 0,
        critRate: randomizeDecimal(1, 10).toFixed(1),
        critDmg: randomizeDecimal(50, 100).toFixed(1)
    };

    // Level stat scaling
    enemy.stats = enemy.stats + enemy.stats*((dungeon.settings.enemyScaling-1)*enemy.lvl);
    enemy.stats.vamp = 0;

    // Stat modifier for enemy types
    if (enemy.type === 'Offensive') {
        enemy.stats.atk = Math.floor((Math.random() * 100) + 1);
        enemy.stats.atkSpd = 0;
        enemy.stats.critDmg = 0;
    } else if (type === 'Defensive') {
        stats.def += 5;
        stats.hpMax += 50;
    } else if (type === 'Balanced') {
        stats.atk += 3;
        stats.def += 3;
        stats.atkSpd += 0.3;
    } else if (type === 'Speedy') {
        stats.atkSpd += 1;
        stats.critRate += 0.5;
    } else if (type === 'Lethal') {
        stats.critRate += 0.5;
        stats.critDmg += 0.5;
    }
    enemy.stats.hp = enemy.stats.hpMax;
};