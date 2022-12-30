window.addEventListener("load", function () {
    // Title Screen Validation
    document.querySelector("#title-screen").addEventListener("click", function () {
        if (JSON.parse(localStorage.getItem("playerData")) === null) {
            this.style.display = "none";
            runLoad("character-creation", "flex");
        } else {
            this.style.display = "none";
            runLoad("hub", "flex");
            const player = JSON.parse(localStorage.getItem("playerData"));
            console.log(player);
        }
    });

    // Submit Name
    document.querySelector("#name-submit").addEventListener("submit", function (e) {
        e.preventDefault();
        let playerName = document.querySelector("#name-input").value;

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(playerName)) {
            document.querySelector("#alert").innerHTML = "Your name cannot contain special characters!";
        } else {
            if (playerName.length < 3 || playerName.length > 15) {
                document.querySelector("#alert").innerHTML = "Name should be between 3-15 characters!";
            } else {
                player.name = playerName;
                let playerData = JSON.stringify(player);
                localStorage.setItem("playerData", playerData)
                document.querySelector("#character-creation").style.display = "none";
                runLoad("hub", "flex");
            }
        }
    });
});

const runLoad = (id, display) => {
    let loader = document.querySelector("#loading");
    loader.style.display = "flex";
    setTimeout(async () => {
        loader.style.display = "none";
        document.querySelector(`#${id}`).style.display = `${display}`;
    }, 1000);
}