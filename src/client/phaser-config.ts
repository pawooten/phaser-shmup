import Phaser from 'phaser';
import { Constants } from './constants';
import { getCreate } from './create';
type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
type GameConfig = Phaser.Types.Core.GameConfig;

const createObjects = getCreate();
const cursorKeys = createObjects.cursorKeys;
const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/gradient-sky.png');
    this.load.spritesheet('ship', 'assets/ship.png',
        { frameWidth: Constants.Dimensions.Ship.width, frameHeight: Constants.Dimensions.Ship.height });
    this.load.spritesheet('triangle-large', 'assets/triangle.png',
        { frameWidth: Constants.Dimensions.TriangleLarge.width, frameHeight: Constants.Dimensions.TriangleLarge.height });
};
const update: SceneUpdateCallback = function () {
    if (!createObjects.ship || !createObjects.shipBody || !cursorKeys) {
        return;
    }

    if (cursorKeys.left.isDown) {
        createObjects.ship.anims.play('ship-left', true);
        createObjects.shipBody.setVelocityX(-160);
        return;
    }
    if (cursorKeys.right.isDown) {
        createObjects.ship.anims.play('ship-right', true);
        createObjects.shipBody.setVelocityX(160);
        return;
    }
    if (cursorKeys.up.isDown) {
        createObjects.shipBody.setVelocityY(-160);
        return;
    }
    if (cursorKeys.down.isDown) {
        createObjects.shipBody.setVelocityY(160);
        return;
    }
    createObjects.shipBody.setVelocity(0, 0);
    createObjects.ship.anims.play('ship');
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
        create: createObjects.create,
        update
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);