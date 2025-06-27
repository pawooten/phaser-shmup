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
        this.add.image(Constants.Position.Center.x, Constants.Position.Center.y, 'sky');

        ship = this.physics.add.sprite(Constants.Position.ShipStart.x, Constants.Position.ShipStart.y, 'ship');
        shipBody = initializeShip(ship);
        if (!shipBody) {
            console.error('Ship body initialization failed');
            return;
        }
        this.anims.create({
            key: 'ship-left',
            frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 2 }),
            frameRate: Constants.FrameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'ship-right',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
            frameRate: Constants.FrameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'ship',
            frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 1 }),
            frameRate: Constants.FrameRate,
            repeat: -1
        });

        const laserBeamSprite = this.physics.add.sprite(Constants.Position.Center.x, Constants.Position.Center.y, 'laser-beam');
        laserBeamSprite.setScale(0.2, 1);

        laserBeamSprite.body.setAllowGravity(false);

        this.anims.create({
            key: 'laser-beam',
            frames: this.anims.generateFrameNumbers('laser-beam', { start: 0, end: 3 }),
            frameRate: Constants.FrameRate,
            repeat: -1
        });
        laserBeamSprite.anims.play('laser-beam');

        for (const triangleType of Object.values(TriangleType)) {
            this.anims.create({
                key: triangleType,
                frames: this.anims.generateFrameNumbers(triangleType, { start: 0, end: 3 }),
                frameRate: Constants.FrameRate,
                repeat: -1
            });
        }
        initializeTriangles(this, 10);
        cursorKeys = this?.input?.keyboard?.createCursorKeys();
    };
    return {
        create, shipFn, shipBodyFn, cursorKeysFn
    };
}
