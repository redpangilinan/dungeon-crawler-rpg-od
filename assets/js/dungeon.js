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
        roomLimit: 10,
    },
    limit: {
        floor: 100,
        room: 10,
    },
    settings: {
        enemyBaseLvl: 1,
        enemyLvlGrowth: 5,
        enemyBaseStats: 1,
        enemyScaling: 1.1,
    },
    status: {
        exploring: false,
        paused: true,
        event: false,
    },
    backlog: [],
    runtime: 0,
    action: 0,
};

// ===== Dungeon Setup =====
// Sets up the initial dungeon
const initialDungeonLoad = () => {
    dungeonAction.innerHTML = "Resting...";
    dungeonActivity.innerHTML = "Explore";
    dungeonTime.innerHTML = "00:00:00";
    dungeonTimer = setInterval(dungeonEvent, (1000));
    loadDungeonProgress();
    addDungeonLog("You arrived at the dungeon.");
};

// Enables start and pause on button click
dungeonActivity.addEventListener('click', function() {
    dungeonStartPause();
});

// Start and Pause Functionality
const dungeonStartPause = () => {
    if (!dungeon.status.paused) {
        dungeonAction.innerHTML = "Resting...";
        dungeonActivity.innerHTML = "Explore";
        dungeon.status.exploring = false;
        dungeon.status.paused = true;
    } else {
        dungeonAction.innerHTML = "Exploring...";
        dungeonActivity.innerHTML = "Rest";
        dungeon.status.exploring = true;
        dungeon.status.paused = false;
    }
}

// Counts the total time for the current run and total playtime
const dungeonCounter = () => {
    player.playtime++;
    dungeon.runtime++;
    dungeonTime.innerHTML = new Date(dungeon.runtime * 1000).toISOString().slice(11, 19);
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
    dungeonCounter();
    if (dungeon.status.exploring && !dungeon.status.event) {
        dungeon.action++;
        let eventTypes = ["blessing", "trap", "enemy", "shop"];
        if (dungeon.action > 10) {
            eventTypes.push("nextroom");
        } else if (dungeon.action > 20) {
            eventTypes = ["nextroom"];
        }
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (event) {
            case "nextroom":
                dungeon.status.event = true;
                let choices = `
                <div class="decision-panel">
                    <button id="choice1">Go to next room</button>
                    <button id="choice2">Stay</button>
                </div>`;
                addDungeonLog("You found the door to the next room.", choices);

                document.querySelector("#choice1").addEventListener("click", function() {
                    dungeon.status.event = false;
                    dungeon.progress.room++;
                    dungeon.action = 0;
                    loadDungeonProgress();
                    addDungeonLog("You moved to the next room.");
                });
                document.querySelector("#choice2").addEventListener("click", function() {
                    dungeon.status.event = false;
                    dungeon.action = 5;
                    addDungeonLog("You decided to stay.");
                });
                break;
            case "blessing":
                addDungeonLog("You encountered a blessing.");
                break;
            case "trap":
                addDungeonLog("You encountered a trap.");
                break;
            case "enemy":
                addDungeonLog("You encountered an enemy.");
                break;
            case "shop":
                addDungeonLog("You encountered a shop.");
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
        logElement.textContent = message;
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