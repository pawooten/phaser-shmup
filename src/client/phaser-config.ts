import Phaser from 'phaser';
import { Constants } from './constants';
import { getCreate } from './create';
import { preload } from './preload';
import { getUpdate } from './update';
type GameConfig = Phaser.Types.Core.GameConfig;

const createObjects = getCreate();
const update = getUpdate(createObjects);
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