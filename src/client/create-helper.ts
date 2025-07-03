import { Constants, triangleScales, TriangleType } from "./constants";
import { SpriteManager } from "./sprite-manager";

type Body = Phaser.Physics.Arcade.Body;
type Sprite = Phaser.Physics.Arcade.Sprite;
const initializeTriangle = (triangle: Sprite | undefined): Body | undefined => {
    if (!triangle) {
        return undefined;
    }

    const triangleBody = triangle.body as Body;
    triangleBody.allowGravity = false;

    return triangleBody;
}
export const initializeTriangles = (scene: Phaser.Scene, count: number): Sprite[] => {
    const triangles: Sprite[] = [];
    const maxX = scene.scale.width - Constants.Dimensions.Triangle.width;
    const maxY = scene.scale.height - Constants.Dimensions.Triangle.height;
    for (let i = 0; i < count; i++) {
        const x = Phaser.Math.Between(Constants.Dimensions.Triangle.width, maxX);
        const y = Phaser.Math.Between(Constants.Dimensions.Triangle.height, maxY);
        const type = Phaser.Math.RND.pick([...Object.values(TriangleType)]);
        const scale = triangleScales.get(type) || 1;
        const triangle = scene.physics.add.sprite(x, y, type).setScale(scale).play(type);
        initializeTriangle(triangle);
        triangles.push(triangle);
    }
    return triangles;
}
export const initializeLaserBeams = (scene: Phaser.Scene) => {
    for (const laserBeamName of Constants.Images.LaserBeam.Names) {
        const laserBeamLeftSprite = scene.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.LaserBeam.Names[0]);
        laserBeamLeftSprite.setScale(0.2, 1);
        laserBeamLeftSprite.body.setAllowGravity(false);
        laserBeamLeftSprite.setCollideWorldBounds(true);
        laserBeamLeftSprite.visible = false;

        const laserBeamRightSprite = scene.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.LaserBeam.Names[0]);
        laserBeamRightSprite.setScale(0.2, 1);
        laserBeamRightSprite.body.setAllowGravity(false);
        laserBeamRightSprite.setCollideWorldBounds(true);
        laserBeamRightSprite.visible = false;
        SpriteManager.add(laserBeamName, [laserBeamLeftSprite, laserBeamRightSprite]);

        scene.anims.create({
            key: Constants.Animation.Names.LaserBeam,
            frames: scene.anims.generateFrameNumbers(laserBeamName, Constants.Animation.FrameRanges.ZeroToThree),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
        laserBeamLeftSprite.anims.play(Constants.Animation.Names.LaserBeam);
        laserBeamRightSprite.anims.play(Constants.Animation.Names.LaserBeam);
    }
}

export const createShipAnimations = (scene: Phaser.Scene) => {
    scene.anims.create({
        key: Constants.Animation.Names.Ship.left,
        frames: scene.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.Two),
        frameRate: Constants.FrameRate,
        repeat: Constants.Animation.Loop
    });
    scene.anims.create({
        key: Constants.Animation.Names.Ship.right,
        frames: scene.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.Zero),
        frameRate: Constants.FrameRate,
        repeat: Constants.Animation.Loop
    });
    scene.anims.create({
        key: Constants.Animation.Names.Ship.default,
        frames: scene.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.One),
        frameRate: Constants.FrameRate,
        repeat: Constants.Animation.Loop
    });
}