window.addEventListener("click", function () {
    if (player.savedata == null) {
        window.location.href = '/pages/character_creation.html';
    } else {
        window.location.href = '/pages/hub.html';
    }
});