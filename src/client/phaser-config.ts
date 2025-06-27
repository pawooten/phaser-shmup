import Phaser from 'phaser';
import { Constants } from './constants';
import { getCreate } from './create';
import { preload } from './preload';
import { getUpdate } from './update';
type GameConfig = Phaser.Types.Core.GameConfig;

const create = getCreate();
if (!create) {
    throw new Error(Constants.ErrorMessages.CreateObjectsNotDefined);
}
const update = getUpdate();
const phaserConfig: GameConfig = {
    type: Phaser.AUTO,
    width: Constants.Dimensions.Game.width,
    height: Constants.Dimensions.Game.height,
    physics: {
        default: Constants.Physics.Type,
        arcade: {
            gravity: Constants.Physics.Gravity,
            debug: false
        }
    },
    scene: {
        preload,
        create: create,
        update
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);