// Volume settings
let volume = {
    master: 100 / 100,
    bgm: 50 / 100,
    sfx: 100 / 100
}

let bgmDungeon;
let bgmBattleMain;
let bgmBattleBoss;
let bgmBattleGuardian;
let sfxEncounter;
let sfxEnemyDeath;
let sfxAttack;

document.querySelector("#title-screen").addEventListener("click", function () {
    // ===== Bgm =====
    bgmDungeon = new Howl({
        src: ['/assets/bgm/dungeon.wav'],
        volume: volume.bgm * volume.master,
        loop: true
    });

    bgmBattleMain = new Howl({
        src: ['/assets/bgm/battle_main.wav'],
        volume: volume.bgm * volume.master,
        loop: true
    });

    bgmBattleBoss = new Howl({
        src: ['/assets/bgm/battle_boss.mp3'],
        volume: volume.bgm * volume.master,
        loop: true
    });

    bgmBattleGuardian = new Howl({
        src: ['/assets/bgm/battle_guardian.wav'],
        volume: volume.bgm * volume.master,
        loop: true
    });

    // ===== Sfx =====
    sfxEncounter = new Howl({
        src: ['/assets/sfx/encounter.wav'],
        volume: volume.sfx * volume.master
    });

    sfxCombatEnd = new Howl({
        src: ['/assets/sfx/combat_end.wav'],
        volume: volume.sfx * volume.master
    });

    sfxAttack = new Howl({
        src: ['/assets/sfx/attack.wav'],
        volume: volume.sfx * volume.master
    });
});