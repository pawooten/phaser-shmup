import { Constants, TriangleType } from "./constants";

type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;

export const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/gradient-sky.png');
    this.load.spritesheet('ship', 'assets/ship.png',
        { frameWidth: Constants.Dimensions.Ship.width, frameHeight: Constants.Dimensions.Ship.height });

    for (const triangleType of Object.values(TriangleType)) {
        this.load.spritesheet(triangleType, 'assets/triangle.png', { frameWidth: Constants.Dimensions.Triangle.width, frameHeight: Constants.Dimensions.Triangle.height });
    }
};