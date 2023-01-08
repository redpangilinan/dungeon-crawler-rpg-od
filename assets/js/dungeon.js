let dungeon = {
    rating: 500,
    grade: "E",
    timer: 0,
    progress: {
        floor: 1,
        room: 1
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
    backlog: []
}

// ===== Dungeon Main Functions =====
let dungeonSeconds = 0;
let dungeonActivity = document.querySelector("#dungeonActivity");
let dungeonAction = document.querySelector("#dungeonAction");
let exploring = false;
let paused = true;

// Sets up the initial dungeon
const initialDungeonLoad = () => {
    dungeonAction.innerHTML = "Resting...";
    addDungeonLog("You arrived at the dungeon.");
    document.querySelector('#dungeonTime').innerHTML = "00:00:00"
    dungeonTimer = setInterval(dungeonEvent, (1000));
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

const dungeonCounter = () => {
    dungeonSeconds++;
    document.querySelector("#dungeonTime").innerHTML = new Date(dungeonSeconds * 1000).toISOString().slice(11, 19);
};

const dungeonEvent = () => {
    dungeonCounter();
    if (exploring) {
        const eventTypes = ["up", "blessing", "trap", "enemy", "shop"];
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (event) {
            case "up":
                addDungeonLog("You went up a room.");
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
const updateDungeonLog = () => {
    let dungeonLog = document.querySelector("#dungeonLog");
    dungeonLog.innerHTML = "";

    for (let message of dungeon.backlog) {
        let logElement = document.createElement("p");
        logElement.textContent = message;
        dungeonLog.appendChild(logElement);
    }

    dungeonLog.scrollTop = dungeonLog.scrollHeight;
};

// Add a log to the dungeon backlog
const addDungeonLog = (message) => {
    dungeon.backlog.push(message);
    updateDungeonLog();
};