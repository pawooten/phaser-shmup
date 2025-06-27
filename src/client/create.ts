import { Constants, TriangleType } from "./constants";
import { initializeShip, initializeTriangles } from "./create-helper";

type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
export const getCreate = () => {
    let ship: Phaser.Physics.Arcade.Sprite | undefined;
    let shipBody: Phaser.Physics.Arcade.Body | undefined;
    let cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    const shipFn = () => ship;
    const shipBodyFn = () => shipBody;
    const cursorKeysFn = () => cursorKeys;
    const create: SceneCreateCallback = function () {
        this.add.image(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.Sky.Name);

        ship = this.physics.add.sprite(Constants.Position.ShipStart.x, Constants.Position.ShipStart.y, Constants.Images.Ship.Name);
        shipBody = initializeShip(ship);
        if (!shipBody) {
            console.error(Constants.ErrorMessages.ShipBodyInitializationFailed);
            return;
        }
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

        const laserBeamSprite = this.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, Constants.Images.LaserBeam.Name);
        laserBeamSprite.setScale(0.2, 1);

        laserBeamSprite.body.setAllowGravity(false);

        this.anims.create({
            key: Constants.Animation.Names.LaserBeam,
            frames: this.anims.generateFrameNumbers(Constants.Images.LaserBeam.Name, Constants.Animation.FrameRanges.ZeroToThree),
            frameRate: Constants.FrameRate,
            repeat: Constants.Animation.Loop
        });
        laserBeamSprite.anims.play(Constants.Animation.Names.LaserBeam);

        for (const triangleType of Object.values(TriangleType)) {
            this.anims.create({
                key: triangleType,
                frames: this.anims.generateFrameNumbers(triangleType, Constants.Animation.FrameRanges.ZeroToThree),
                frameRate: Constants.FrameRate,
                repeat: Constants.Animation.Loop
            });
        }
        initializeTriangles(this, 10);
        cursorKeys = this?.input?.keyboard?.createCursorKeys();
    };
    return {
        create, shipFn, shipBodyFn, cursorKeysFn
    };
}
