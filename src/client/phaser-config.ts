import Phaser from 'phaser';
type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
type GameConfig = Phaser.Types.Core.GameConfig;
type Sprite = Phaser.Physics.Arcade.Sprite;
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

let ship: Sprite | undefined;
let shipBody: Phaser.Physics.Arcade.Body | undefined;
let cursorKeys: CursorKeys | undefined;
const create: SceneCreateCallback = function () {
    this.add.image(400, 300, 'sky');

    ship = this.physics.add.sprite(400, 300, 'ship');
    shipBody = ship.body as Phaser.Physics.Arcade.Body;
    shipBody.allowGravity = false;
    ship.setCollideWorldBounds(true);
    ship.setBounce(0.2);

    this.anims.create({
        key: 'ship-left',
        frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 2 }),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'ship-right',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'ship',
        frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 1 }),
        frameRate: 20,
        repeat: -1
    });

    cursorKeys = this?.input?.keyboard?.createCursorKeys();
};
const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/gradient-sky.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('ship', 'assets/ship.png',
        { frameWidth: 32, frameHeight: 32 });
};
const update: SceneUpdateCallback = function () {
    if (!ship || !shipBody || !cursorKeys) {
        return;
    }

    if (cursorKeys.left.isDown) {
        ship.anims.play('ship-left', true);
        shipBody.setVelocityX(-160);
        return;
    }
    if (cursorKeys.right.isDown) {
        ship.anims.play('ship-right', true);
        shipBody.setVelocityX(160);
        return;
    }
    ship.anims.play('ship');
};
const phaserConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 10 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);