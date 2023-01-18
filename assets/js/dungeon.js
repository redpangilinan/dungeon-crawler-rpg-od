const dungeonActivity = document.querySelector("#dungeonActivity");
const dungeonAction = document.querySelector("#dungeonAction");
const dungeonTime = document.querySelector("#dungeonTime");
const floorCount = document.querySelector("#floorCount");
const roomCount = document.querySelector("#roomCount");

let dungeon = {
    rating: 500,
    grade: "E",
    progress: {
        floor: 1,
        room: 1,
        floorLimit: 100,
        roomLimit: 5,
    },
    settings: {
        enemyBaseLvl: 1,
        enemyLvlGap: 5,
        enemyBaseStats: 1,
        enemyScaling: 1.1,
    },
    status: {
        exploring: false,
        paused: true,
        event: false,
    },
    statistics: {
        kills: 0,
        runtime: 0,
    },
    backlog: [],
    action: 0,
};

// ===== Dungeon Setup =====
// Sets up the initial dungeon
const initialDungeonLoad = () => {
    if (localStorage.getItem("dungeonData") !== null) {
        dungeon = JSON.parse(localStorage.getItem("dungeonData"));
        dungeon.status = {
            exploring: false,
            paused: true,
            event: false,
        };
        updateDungeonLog();
    }
    loadDungeonProgress();
    dungeonTime.innerHTML = new Date(dungeon.statistics.runtime * 1000).toISOString().slice(11, 19);
    dungeonAction.innerHTML = "Resting...";
    dungeonActivity.innerHTML = "Explore";
    dungeonTime.innerHTML = "00:00:00";
    dungeonTimer = setInterval(dungeonEvent, 1000);
    playTimer = setInterval(dungeonCounter, 1000);
};

// Enables start and pause on button click
dungeonActivity.addEventListener('click', function () {
    dungeonStartPause();
});

// Start and Pause Functionality
const dungeonStartPause = () => {
    if (!dungeon.status.paused) {
        sfxPause.play();

        dungeonAction.innerHTML = "Resting...";
        dungeonActivity.innerHTML = "Explore";
        dungeon.status.exploring = false;
        dungeon.status.paused = true;
    } else {
        sfxUnpause.play();

        dungeonAction.innerHTML = "Exploring...";
        dungeonActivity.innerHTML = "Rest";
        dungeon.status.exploring = true;
        dungeon.status.paused = false;
    }
}

// Counts the total time for the current run and total playtime
const dungeonCounter = () => {
    player.playtime++;
    dungeon.statistics.runtime++;
    dungeonTime.innerHTML = new Date(dungeon.statistics.runtime * 1000).toISOString().slice(11, 19);
    saveData();
};

// Loads the floor and room count
const loadDungeonProgress = () => {
    if (dungeon.progress.room > dungeon.progress.roomLimit) {
        dungeon.progress.room = 1;
        dungeon.progress.floor++;
    }
    floorCount.innerHTML = `Floor ${dungeon.progress.floor}`;
    roomCount.innerHTML = `Room ${dungeon.progress.room}`;
}

// ========== Events in the Dungeon ==========
const dungeonEvent = () => {
    if (dungeon.status.exploring && !dungeon.status.event) {
        dungeon.action++;
        let choices;
        let eventTypes = ["treasure", "enemy", "enemy", "nothing", "nothing", "nothing", "nothing"];
        if (dungeon.action > 2 && dungeon.action < 6) {
            eventTypes.push("nextroom");
        } else if (dungeon.action > 5) {
            eventTypes = ["nextroom"];
        }
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (event) {
            case "nextroom":
                dungeon.status.event = true;
                choices = `
                    <div class="decision-panel">
                        <button id="choice1">Enter</button>
                        <button id="choice2">Ignore</button>
                    </div>`;
                if (dungeon.progress.room == dungeon.progress.roomLimit) {
                    addDungeonLog("You found the door to the boss room.", choices);
                } else {
                    addDungeonLog("You found a door.", choices);
                }
                document.querySelector("#choice1").onclick = function () {
                    sfxConfirm.play();
                    if (dungeon.progress.room == dungeon.progress.roomLimit) {
                        incrementRoom();
                        generateRandomEnemy("guardian");
                        showCombatInfo();
                        startCombat(bgmBattleGuardian);
                        addCombatLog(`Floor Guardian ${enemy.name} is blocking your way.`);
                        addDungeonLog("You moved to the next floor.");
                    } else {
                        let eventRoll = randomizeNum(1, 3);
                        if (eventRoll == 1) {
                            incrementRoom();
                            generateRandomEnemy("door");
                            showCombatInfo();
                            startCombat(bgmBattleMain);
                            addCombatLog(`You got ambushed by ${enemy.name}.`);
                            addDungeonLog("You moved to the next floor.");
                        } else if (eventRoll == 2) {
                            incrementRoom();
                            choices = `
                            <div class="decision-panel">
                                <button id="choice1">Open the chest</button>
                                <button id="choice2">Ignore</button>
                            </div>`;
                            addDungeonLog(`You moved to the next room and found a treasure chamber. There is a <i class="fa fa-toolbox"></i>Chest inside.`, choices);
                            document.querySelector("#choice1").onclick = function () {
                                let eventRoll = randomizeNum(1, 2);
                                if (eventRoll == 1) {
                                    generateRandomEnemy("chest");
                                    showCombatInfo();
                                    startCombat(bgmBattleMain);
                                    addCombatLog(`You got ambushed by ${enemy.name}.`);
                                    addDungeonLog(`You got ambushed by ${enemy.name}.`)
                                } else {
                                    sfxConfirm.play();
                                    if (dungeon.progress.floor == 1) {
                                        addDungeonLog("The chest is empty.");
                                    } else {
                                        let eventRoll = randomizeNum(1, 2);
                                        if (eventRoll == 1) {
                                            createEquipmentPrint();
                                        } else {
                                            addDungeonLog("The chest is empty.");
                                        }
                                    }
                                    dungeon.status.event = false;
                                }
                            }

                        } else {
                            dungeon.status.event = false;
                            incrementRoom();
                            addDungeonLog("You moved to the next room.");
                        }
                    }
                };
                document.querySelector("#choice2").onclick = function () {
                    sfxConfirm.play();

                    dungeon.status.event = false;
                    dungeon.action = 0;
                    addDungeonLog("You ignored it and decided to move on.");
                };
                break;
            case "treasure":
                dungeon.status.event = true;
                choices = `
                <div class="decision-panel">
                    <button id="choice1">Open the chest</button>
                    <button id="choice2">Ignore</button>
                </div>`;
                addDungeonLog(`You found a treasure chamber. There is a <i class="fa fa-toolbox"></i>Chest inside.`, choices);
                document.querySelector("#choice1").onclick = function () {
                    let eventRoll = randomizeNum(1, 2);
                    if (eventRoll == 1) {
                        generateRandomEnemy("chest");
                        showCombatInfo();
                        startCombat(bgmBattleMain);
                        addCombatLog(`You got ambushed by ${enemy.name}.`);
                        addDungeonLog(`You got ambushed by ${enemy.name}.`)
                    } else {
                        sfxConfirm.play();
                        if (dungeon.progress.floor == 1) {
                            addDungeonLog("The chest is empty.");
                        } else {
                            let eventRoll = randomizeNum(1, 2);
                            if (eventRoll == 1) {
                                let itemDrop = createEquipment();
                                addDungeonLog(`You got ${itemDrop}.`)
                            } else {
                                addDungeonLog("The chest is empty.");
                            }
                        }
                        dungeon.status.event = false;
                    }
                }
                document.querySelector("#choice2").onclick = function () {
                    sfxConfirm.play();

                    dungeon.status.event = false;
                    dungeon.action = 0;
                    addDungeonLog("You ignored it and decided to move on.");
                };
                break;
            case "nothing":
                let eventRoll = randomizeNum(1, 5);
                if (eventRoll == 1) {
                    addDungeonLog("You explored and found nothing.");
                } else if (eventRoll == 2) {
                    addDungeonLog("You found an empty chest.");
                } else if (eventRoll == 3) {
                    addDungeonLog("You found a monster corpse.");
                } else if (eventRoll == 4) {
                    addDungeonLog("You found a corpse.");
                } else if (eventRoll == 5) {
                    addDungeonLog("There is nothing in this area.");
                }
                break;
            case "enemy":
                dungeon.status.event = true;
                choices = `
                <div class="decision-panel">
                    <button id="choice1">Engage</button>
                    <button id="choice2">Flee</button>
                </div>`;
                generateRandomEnemy();
                addDungeonLog(`You encountered ${enemy.name}.`, choices);
                player.inCombat = true;
                document.querySelector("#choice1").onclick = function () {
                    showCombatInfo();
                    startCombat(bgmBattleMain);
                    addCombatLog(`You encountered ${enemy.name}.`);
                    updateDungeonLog();
                }
                document.querySelector("#choice2").onclick = function () {
                    let eventRoll = randomizeNum(1, 2);
                    if (eventRoll == 1) {
                        sfxConfirm.play();
                        addDungeonLog(`You managed to flee.`);
                        player.inCombat = false;
                        dungeon.status.event = false;
                    } else {
                        addDungeonLog(`You failed to escape!`);
                        showCombatInfo();
                        startCombat(bgmBattleMain);
                        addCombatLog(`You encountered ${enemy.name}.`);
                        addCombatLog(`You failed to escape!`);
                    }
                }
                break;
        }
    }
}

// ========= Dungeon Backlog ==========
// Displays every dungeon activity
const updateDungeonLog = (choices) => {
    let dungeonLog = document.querySelector("#dungeonLog");
    dungeonLog.innerHTML = "";

    for (let message of dungeon.backlog) {
        let logElement = document.createElement("p");
        logElement.innerHTML = message;
        dungeonLog.appendChild(logElement);
    }

    // If the event has choices, display it
    if (typeof choices !== 'undefined') {
        let eventChoices = document.createElement("div");
        eventChoices.innerHTML = choices;
        dungeonLog.appendChild(eventChoices);
    }

    dungeonLog.scrollTop = dungeonLog.scrollHeight;
};

// Add a log to the dungeon backlog
const addDungeonLog = (message, choices) => {
    dungeon.backlog.push(message);
    updateDungeonLog(choices);
};

// Dungeon Progression
const incrementRoom = () => {
    dungeon.progress.room++;
    dungeon.action = 0;
    loadDungeonProgress();
}