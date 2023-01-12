// Volume settings
let volume = {
    master: 100 / 100,
    bgm: (80 / 100) / 2,
    sfx: 100 / 100
}

let bgmDungeon;
let bgmBattleMain;
let bgmBattleBoss;
let bgmBattleGuardian;
let sfxEncounter;
let sfxEnemyDeath;
let sfxAttack;
let sfxLevelUp;
let sfxConfirm;
let sfxDecline;
let sfxDeny;
let sfxEquip;
let sfxUnequip;
let sfxOpen;

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

    sfxLevelUp = new Howl({
        src: ['/assets/sfx/level_up.wav'],
        volume: volume.sfx * volume.master
    });

    sfxConfirm = new Howl({
        src: ['/assets/sfx/confirm.wav'],
        volume: volume.sfx * volume.master
    });

    sfxDecline = new Howl({
        src: ['/assets/sfx/decline.wav'],
        volume: volume.sfx * volume.master
    });

    sfxDeny = new Howl({
        src: ['/assets/sfx/deny.wav'],
        volume: volume.sfx * volume.master
    });

    sfxEquip = new Howl({
        src: ['/assets/sfx/equip.wav'],
        volume: volume.sfx * volume.master
    });

    sfxUnquip = new Howl({
        src: ['/assets/sfx/unequip.wav'],
        volume: volume.sfx * volume.master
    });

    sfxOpen = new Howl({
        src: ['/assets/sfx/hover.wav'],
        volume: volume.sfx * volume.master
    });
});