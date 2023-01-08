const dungeonActivity = document.querySelector("#dungeonActivity");
const dungeonAction = document.querySelector("#dungeonAction");
const dungeonTime = document.querySelector("#dungeonTime");
const floorCount = document.querySelector("#floorCount");
const roomCount = document.querySelector("#roomCount");

let dungeon = {
    rating: 500,
    grade: "E",
    timer: 0,
    progress: {
        floor: 1,
        room: 1,
        floorLimit: 100,
        roomLimit: 10,
    },
    limit: {
        floor: 100,
        room: 10
    },
    difficulty: {
        enemyBaseLvl: 1,
        enemyBaseStats: 1,
        enemyGrowth: 1.1,
    },
    backlog: [],
    runtime: 0
}
let exploring = false;
let paused = true;
let decision = false;

// ===== Dungeon Setup =====
// Sets up the initial dungeon
const initialDungeonLoad = () => {
    dungeonAction.innerHTML = "Resting...";
    dungeonActivity.innerHTML = "Explore";
    dungeonTime.innerHTML = "00:00:00";
    dungeonTimer = setInterval(dungeonEvent, (1500));
    loadDungeonProgress();
    addDungeonLog("You arrived at the dungeon.");
};

// Enables start and pause on button click
dungeonActivity.addEventListener('click', function() {
    dungeonStartPause();
});

// Start and Pause Functionality
const dungeonStartPause = () => {
    if (!paused) {
        dungeonAction.innerHTML = "Resting...";
        dungeonActivity.innerHTML = "Explore";
        exploring = false;
        paused = true;
    } else {
        dungeonAction.innerHTML = "Exploring...";
        dungeonActivity.innerHTML = "Rest";
        exploring = true;
        paused = false;
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
    if (exploring && !decision) {
        const eventTypes = ["nextroom", "blessing", "trap", "enemy", "shop"];
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (event) {
            case "nextroom":
                decision = true;
                let choices = `
                <div class="decision-panel">
                    <button id="choice1">Go to next room</button>
                    <button id="choice2">Stay</button>
                </div>`;
                addDungeonLog("You found the door to the next room.", choices);

                document.querySelector("#choice1").addEventListener("click", function() {
                    dungeon.progress.room++;
                    loadDungeonProgress();
                    addDungeonLog("You moved to the next room.");
                    decision = false;
                });
                document.querySelector("#choice2").addEventListener("click", function() {
                    addDungeonLog("You decided to stay.");
                    decision = false;
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