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
    }
}

const dungeonStart = () => {
    
}

const dungeonEvent = () => {
    
}

// ========= Dungeon Backlog ==========
const dungeonBacklog = [];

// Displays every dungeon activity
const updateDungeonLog = () => {
    let dungeonLog = document.querySelector("dungeonLog");
    dungeonLog.innerHTML = "";

    for (let message of dungeonBacklog) {
        let logElement = document.createElement("p");
        logElement.textContent = message;
        dungeonLog.appendChild(logElement);
    }

    dungeonLog.scrollTop = dungeonLog.scrollHeight;
};

// Add a log to the dungeon backlog
const addDungeonLog = (message) => {
    dungeonBacklog.push(message);
    updateDungeonLog();
};