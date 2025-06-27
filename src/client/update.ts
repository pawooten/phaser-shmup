import { Constants } from "./constants";
import { CreateObjects } from "./create";
import { SpriteManager } from "./sprite-manager";

type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
export const getUpdate = (createObjects: CreateObjects) => {
    const update: SceneUpdateCallback = function () {
        const ship = createObjects.shipFn();
        if (!ship) {
            console.error(Constants.ErrorMessages.ShipNotDefinedInUpdate);
            return;
        }
        const shipBody = createObjects.shipBodyFn();
        if (!shipBody) {
            console.error(Constants.ErrorMessages.ShipBodyNotDefinedInUpdate);
            return;
        }
        const cursorKeys = createObjects.cursorKeysFn();
        if (!cursorKeys) {
            console.error(Constants.ErrorMessages.CursorKeysNotDefinedInUpdate);
            return;
        }

        if (cursorKeys.left.isDown) {
            ship.anims.play(Constants.Animation.Names.Ship.left, true);
            shipBody.setVelocityX(-Constants.Physics.Speed.Ship);
            return;
        }
        if (cursorKeys.right.isDown) {
            ship.anims.play(Constants.Animation.Names.Ship.right, true);
            shipBody.setVelocityX(Constants.Physics.Speed.Ship);
            return;
        }
        if (cursorKeys.up.isDown) {
            shipBody.setVelocityY(-Constants.Physics.Speed.Ship);
            return;
        }
        if (cursorKeys.down.isDown) {
            shipBody.setVelocityY(Constants.Physics.Speed.Ship);
            return;
        }
        if (cursorKeys.space.isDown) {
            const laserBeamSprite = SpriteManager.get(Constants.Images.LaserBeam.Name);
            if (!laserBeamSprite) {
                console.error(Constants.ErrorMessages.SpriteNotFound, Constants.Images.LaserBeam.Name);
                return;
            }
            laserBeamSprite.setPosition(ship.x, ship.y - Constants.Dimensions.ShipOffset);
            laserBeamSprite.visible = true;
            const laserBeamBody = laserBeamSprite.body as Phaser.Physics.Arcade.Body;
            laserBeamBody.setVelocityY(-Constants.Physics.Speed.LaserBeam);
        }

        shipBody.setVelocity(0, 0);
        ship.anims.play(Constants.Animation.Names.Ship.default);
    };
    return update;
}