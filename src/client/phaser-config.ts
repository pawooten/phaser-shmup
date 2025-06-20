import Phaser from 'phaser';
import { Constants } from './constants';
import { getCreate } from './create';
import { preload } from './preload';
type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
type GameConfig = Phaser.Types.Core.GameConfig;

const createObjects = getCreate();

const update: SceneUpdateCallback = function () {
    if (!createObjects.ship || !createObjects.shipBody || !createObjects.cursorKeys) {
        return;
    }

    if (createObjects.cursorKeys.left.isDown) {
        createObjects.ship.anims.play('ship-left', true);
        createObjects.shipBody.setVelocityX(-160);
        return;
    }
    if (createObjects.cursorKeys.right.isDown) {
        createObjects.ship.anims.play('ship-right', true);
        createObjects.shipBody.setVelocityX(160);
        return;
    }
    if (createObjects.cursorKeys.up.isDown) {
        createObjects.shipBody.setVelocityY(-160);
        return;
    }
    if (createObjects.cursorKeys.down.isDown) {
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