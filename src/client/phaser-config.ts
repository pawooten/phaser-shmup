import Phaser from 'phaser';
import { Constants } from './constants';
import { initializeShip, initializeTriangles } from './create-helper';
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
    this.add.image(Constants.Position.Center.x, Constants.Position.Center.y, 'sky');

    ship = this.physics.add.sprite(Constants.Position.ShipStart.x, Constants.Position.ShipStart.y, 'ship');
    shipBody = initializeShip(ship);
    if (!shipBody) {
        console.error('Ship body initialization failed');
        return;
    }
    this.anims.create({
        key: 'ship-left',
        frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 2 }),
        frameRate: Constants.FrameRate,
        repeat: -1
    });
    this.anims.create({
        key: 'ship-right',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
        frameRate: Constants.FrameRate,
        repeat: -1
    });
    this.anims.create({
        key: 'ship',
        frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 1 }),
        frameRate: Constants.FrameRate,
        repeat: -1
    });
    this.anims.create({
        key: 'triangle-large',
        frames: this.anims.generateFrameNumbers('triangle-large', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    initializeTriangles(this, 10);
    cursorKeys = this?.input?.keyboard?.createCursorKeys();
};
const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/gradient-sky.png');
    this.load.spritesheet('ship', 'assets/ship.png',
        { frameWidth: Constants.Dimensions.Ship.width, frameHeight: Constants.Dimensions.Ship.height });
    this.load.spritesheet('triangle-large', 'assets/triangle.png',
        { frameWidth: Constants.Dimensions.TriangleLarge.width, frameHeight: Constants.Dimensions.TriangleLarge.height });
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
    if (cursorKeys.up.isDown) {
        shipBody.setVelocityY(-160);
        return;
    }
    if (cursorKeys.down.isDown) {
        shipBody.setVelocityY(160);
        return;
    }
    shipBody.setVelocity(0, 0);
    ship.anims.play('ship');
};
const phaserConfig: GameConfig = {
    type: Phaser.AUTO,
    width: Constants.Dimensions.Game.width,
    height: Constants.Dimensions.Game.height,
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