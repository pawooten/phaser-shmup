type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
export const getUpdate = (createObjects: any) => {
    const update: SceneUpdateCallback = function () {
        if (!createObjects.ship || !createObjects.shipBody || !createObjects.cursorKeys) {
            return;
        }

        if (createObjects.cursorKeys.left.isDown) {
            createObjects.ship.anims.play('ship-left', true);
            createObjects.shipBody.setVelocityX(-160);
            return;
        }
        if (createObjects.cursorKeys.right.isDown) {
            createObjects.ship.anims.play('ship-right', true);
            createObjects.shipBody.setVelocityX(160);
            return;
        }
        if (createObjects.cursorKeys.up.isDown) {
            createObjects.shipBody.setVelocityY(-160);
            return;
        }
        if (createObjects.cursorKeys.down.isDown) {
            createObjects.shipBody.setVelocityY(160);
            return;
        }
        createObjects.shipBody.setVelocity(0, 0);
        createObjects.ship.anims.play('ship');
    };
    return update;
}