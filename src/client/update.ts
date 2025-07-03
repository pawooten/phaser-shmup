import { Constants } from "./constants";
import { CursorKeysManager } from "./cursor-keys-manager";
import { getSpriteName, SpriteManager } from "./sprite-manager";
type Body = Phaser.Physics.Arcade.Body;
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;
type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
export const getUpdate = () => {
    const update: SceneUpdateCallback = function () {
        const ship = SpriteManager.get<Sprite>(Constants.Images.Ship.Name);
        if (!ship) {
            console.error(Constants.ErrorMessages.ShipNotDefinedInUpdate);
            return;
        }
        const shipBody = ship.body as Body;
        if (!shipBody) {
            console.error(Constants.ErrorMessages.ShipBodyNotDefinedInUpdate);
            return;
        }
        const cursorKeys = CursorKeysManager.getCursorKeys();
        if (!cursorKeys) {
            console.error(Constants.ErrorMessages.CursorKeysNotDefinedInUpdate);
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(cursorKeys.space)) {
            fireLaserBeam(ship, cursorKeys);
        }

        if (cursorKeys.left.isDown && !cursorKeys.right.isDown) {
            ship.anims.play(Constants.Animation.Names.Ship.left, true);
            shipBody.setVelocityX(-Constants.Physics.Speed.Ship);
            return;
        }
        if (cursorKeys.right.isDown && !cursorKeys.left.isDown) {
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

        shipBody.setVelocity(0, 0);
        ship.anims.play(Constants.Animation.Names.Ship.default);
    };
    return update;
}
const fireLaserBeam = (ship: Sprite, cursorKeys: CursorKeys) => {
    const spriteName = getSpriteName();
    const laserBeamSprites = SpriteManager.get<Sprite[]>(spriteName);
    if (!laserBeamSprites) {
        console.error(Constants.ErrorMessages.SpriteNotFound, spriteName);
        return;
    }
    const [leftBeamSprite, rightBeamSprite] = laserBeamSprites;
    const leftBeamPosition = { x: ship.x - Constants.Dimensions.ShipOffset.x, y: ship.y - Constants.Dimensions.ShipOffset.y };
    const rightBeamPosition = { x: ship.x + Constants.Dimensions.ShipOffset.x, y: ship.y - Constants.Dimensions.ShipOffset.y };
    if (cursorKeys.left.isDown && !cursorKeys.right.isDown) {
        rightBeamPosition.y -= Constants.Dimensions.ShipTurningOffset;
    }
    if (cursorKeys.right.isDown && !cursorKeys.left.isDown) {
        leftBeamPosition.y -= Constants.Dimensions.ShipTurningOffset;
    }
    leftBeamSprite.setPosition(leftBeamPosition.x, leftBeamPosition.y);
    leftBeamSprite.visible = true;
    const leftBeamBody = leftBeamSprite.body as Body;
    leftBeamBody.setVelocityY(-Constants.Physics.Speed.LaserBeam);
    rightBeamSprite.setPosition(rightBeamPosition.x, rightBeamPosition.y);
    rightBeamSprite.visible = true;
    const rightBeamBody = rightBeamSprite.body as Body;
    rightBeamBody.setVelocityY(-Constants.Physics.Speed.LaserBeam);

};
