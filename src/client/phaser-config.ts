import Phaser from 'phaser';
type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
type GameConfig = Phaser.Types.Core.GameConfig;

const create: SceneCreateCallback = function () {
    this.add.image(400, 300, 'sky');
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
    scene: {
        preload,
        create,
        update: () => { }
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);