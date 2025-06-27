import { CreateObjects } from "./create";

type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
export const getUpdate = (createObjects: CreateObjects) => {
    const update: SceneUpdateCallback = function () {
        const ship = createObjects.shipFn();
        if (!ship) {
            console.error('Ship is not defined in update');
            return;
        }
        const shipBody = createObjects.shipBodyFn();
        if (!shipBody) {
            console.error('Ship body is not defined in update');
            return;
        }
        const cursorKeys = createObjects.cursorKeysFn();
        if (!cursorKeys) {
            console.error('Cursor keys are not defined in update');
            return;
        }

        if (cursorKeys.left.isDown) {
            ship.anims.play('ship-left', true);
            shipBody.setVelocityX(-160);
            return;
        }
        if (cursorKeys.right.isDown) {
            ship.anims.play('ship-right', true);
            shipBody.setVelocityX(160);
            return;
        }
        if (cursorKeys.up.isDown) {
            shipBody.setVelocityY(-160);
            return;
        }
        if (cursorKeys.down.isDown) {
            shipBody.setVelocityY(160);
            return;
        }
        shipBody.setVelocity(0, 0);
        ship.anims.play('ship');
    };
    return update;
}