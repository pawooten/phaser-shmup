import { Constants } from "./constants";
import { CreateObjects } from "./create";

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
            shipBody.setVelocityX(-160);
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
            // Handle space key press for firing laser beam or other actions
        }

        shipBody.setVelocity(0, 0);
        ship.anims.play(Constants.Animation.Names.Ship.default);
    };
    return update;
}