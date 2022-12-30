document.querySelector("#title-screen").addEventListener("click", function () {
    if (player.savedata == null) {
        this.style.display = "none";
        runLoad("character-creation", "flex");
    } else {
        this.style.display = "none";
        runLoad("hub", "flex");
    }
});

const runLoad = (id, display) => {
    let loader = document.querySelector("#loading");
    loader.style.display = "flex";
    setTimeout(async () => {
        loader.style.display = "none";
        document.querySelector(`#${id}`).style.display = `${display}`;
    }, 1000);
}