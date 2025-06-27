import { Constants, TriangleType } from "./constants";
import { initializeTriangles } from "./create-helper";
import { CursorKeysManager } from "./cursor-keys-manager";
import { SpriteManager } from "./sprite-manager";

type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
export const getCreate = (): SceneCreateCallback | undefined => {
    const create: SceneCreateCallback = function () {
        this.add.image(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.Sky.Name);

        const ship = this.physics.add.sprite(Constants.Position.ShipStart.x, Constants.Position.ShipStart.y, Constants.Images.Ship.Name);
        SpriteManager.add(Constants.Images.Ship.Name, ship);
        createShipAnimations.call(this);

        const laserBeamLeftSprite = this.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.LaserBeam.Name);
        laserBeamLeftSprite.setScale(0.2, 1);
        laserBeamLeftSprite.body.setAllowGravity(false);
        laserBeamLeftSprite.setCollideWorldBounds(true);
        laserBeamLeftSprite.visible = false;

        const laserBeamRightSprite = this.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.LaserBeam.Name);
        laserBeamRightSprite.setScale(0.2, 1);
        laserBeamRightSprite.body.setAllowGravity(false);
        laserBeamRightSprite.setCollideWorldBounds(true);
        laserBeamRightSprite.visible = false;
        SpriteManager.add(Constants.Images.LaserBeam.Name, [laserBeamLeftSprite, laserBeamRightSprite]);

        this.anims.create({
            key: Constants.Animation.Names.LaserBeam,
            frames: this.anims.generateFrameNumbers(Constants.Images.LaserBeam.Name, Constants.Animation.FrameRanges.ZeroToThree),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
        laserBeamLeftSprite.anims.play(Constants.Animation.Names.LaserBeam);
        laserBeamRightSprite.anims.play(Constants.Animation.Names.LaserBeam);

        for (const triangleType of Object.values(TriangleType)) {
            this.anims.create({
                key: triangleType,
                frames: this.anims.generateFrameNumbers(triangleType, Constants.Animation.FrameRanges.ZeroToThree),
                frameRate: Constants.FrameRate,
                repeat: Constants.Animation.Loop
            });
        }
        initializeTriangles(this, 10);
        const cursorKeys = this?.input?.keyboard?.createCursorKeys();
        if (!cursorKeys) {
            console.error(Constants.ErrorMessages.CursorKeysNotDefinedInUpdate);
            return;
        }
        CursorKeysManager.setCursorKeys(cursorKeys);
    };
    return create;

    function createShipAnimations(this: Phaser.Scene) {
        this.anims.create({
            key: Constants.Animation.Names.Ship.left,
            frames: this.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.Two),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
        this.anims.create({
            key: Constants.Animation.Names.Ship.right,
            frames: this.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.Zero),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
        this.anims.create({
            key: Constants.Animation.Names.Ship.default,
            frames: this.anims.generateFrameNumbers(Constants.Images.Ship.Name, Constants.Animation.FrameRanges.One),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
    }
}