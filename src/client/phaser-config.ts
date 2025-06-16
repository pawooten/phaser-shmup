import Phaser from 'phaser';
type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
type GameConfig = Phaser.Types.Core.GameConfig;
type StaticGroup = Phaser.Physics.Arcade.StaticGroup;
let platforms: StaticGroup | undefined;
const create: SceneCreateCallback = function () {
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
};
const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
};
const phaserConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update: () => { }
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);