import { Constants } from "./constants";

type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
export const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/gradient-sky.png');
    this.load.spritesheet('ship', 'assets/ship.png',
        { frameWidth: Constants.Dimensions.Ship.width, frameHeight: Constants.Dimensions.Ship.height });
    this.load.spritesheet('triangle-large', 'assets/triangle.png',
        { frameWidth: Constants.Dimensions.TriangleLarge.width, frameHeight: Constants.Dimensions.TriangleLarge.height });
};