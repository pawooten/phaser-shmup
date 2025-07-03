import { Constants, TriangleType } from "./constants";

type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;

export const preload: ScenePreloadCallback = function () {
    this.load.image(Constants.Images.Sky.Name, Constants.Images.Sky.Path);
    this.load.spritesheet(Constants.Images.Ship.Name, Constants.Images.Ship.Path,
        { frameWidth: Constants.Dimensions.Ship.width, frameHeight: Constants.Dimensions.Ship.height });
    for (const laserBeamName of Constants.Images.LaserBeam.Names) {
        this.load.spritesheet(laserBeamName, Constants.Images.LaserBeam.Path,
            { frameWidth: Constants.Dimensions.LaserBeam.width, frameHeight: Constants.Dimensions.LaserBeam.height });
    }
    for (const triangleType of Object.values(TriangleType)) {
        this.load.spritesheet(triangleType, Constants.Images.Triangle.Path, { frameWidth: Constants.Dimensions.Triangle.width, frameHeight: Constants.Dimensions.Triangle.height });
    }
};