// Player
const player = {
    name: 'Red',
    lvl: 1,
    class: "Warrior",
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
        lifesteal: 0,
        critRate: 0,
        critDmg: 0,
    },
    exp: {
        expCurr: 0,
        expMax: 100,
        expCurrLvl: 0,
        expMaxLvl: 100
    },
    equipment: {
        rightHand: null,
        leftHand: null,
        head: null,
        body: null,
        arms: null,
        legs: null,
        accessory1: null,
        accessory2: null
    },
    inventory: [],
};

const playerExpGain = () => {
    let expGain = 5000000;
    player.exp.expCurr += expGain;
    player.exp.expCurrLvl += expGain;

    while (player.exp.expCurr >= player.exp.expMax) {
        playerLevelUp();
    }
    calculateAdvStats();
    playerLoadStats();
};

// Levels up the player
const playerLevelUp = () => {
    // Calculates the excess exp and the new exp required to level up
    let expMaxIncrease = Math.floor(((player.exp.expMax * 1.1) + 100) - player.exp.expMax);
    let excessExp = player.exp.expCurr - player.exp.expMax;
    player.exp.expCurrLvl = excessExp;
    player.exp.expMaxLvl = expMaxIncrease;

    // Increase player level and maximum exp
    player.lvl++;
    player.exp.expMax += expMaxIncrease;

    // Calculate stats based on class then apply it to advanced stats then bring player hp and mp to full
    calculateClassStats();
    calculateAdvStats();
    player.baseStats.hp = player.baseStats.hpMax;
    player.baseStats.mp = player.baseStats.mpMax;
    playerLoadStats();
};

const calculateClassStats = () => {
    if (player.class == "Warrior") {
        let classStats = {
            base: {
                str: 15,
                dex: 8,
                vit: 11,
                int: 6
            },
            growth: {
                str: 3,
                dex: 1,
                vit: 2,
                int: 1
            },
        }; 
        setStats(classStats);
    }
    if (player.class == "Rogue") {
        let classStats = {
            base: {
                str: 10,
                dex: 14,
                vit: 7,
                int: 9
            },
            growth: {
                str: 2,
                dex: 3,
                vit: 1,
                int: 1
            },
        }; 
        setStats(classStats);
    }
    if (player.class == "Mage") {
        let classStats = {
            base: {
                str: 5,
                dex: 8,
                vit: 7,
                int: 20
            },
            growth: {
                str: 1,
                dex: 1,
                vit: 1,
                int: 4
            },
        };
        setStats(classStats);
    }
};

const setStats = (classStats) => {
    player.baseStats.str = classStats.base.str + (player.lvl * classStats.growth.str);
    player.baseStats.dex = classStats.base.dex + (player.lvl * classStats.growth.dex);
    player.baseStats.vit = classStats.base.vit + (player.lvl * classStats.growth.vit);
    player.baseStats.int = classStats.base.int + (player.lvl * classStats.growth.int);
}