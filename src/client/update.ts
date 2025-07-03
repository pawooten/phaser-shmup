import { Constants } from "./constants";
import { CursorKeysManager } from "./cursor-keys-manager";
import { SpriteManager } from "./sprite-manager";
type Body = Phaser.Physics.Arcade.Body;
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
            const spriteName = getSpriteName();
            console.log(`Firing laser beam: ${spriteName}`);
            const laserBeamSprites = SpriteManager.get<Sprite[]>(spriteName);
            if (!laserBeamSprites) {
                console.error(Constants.ErrorMessages.SpriteNotFound, spriteName);
                return;
            }
            const [leftBeamSprite, rightBeamSprite] = laserBeamSprites;
            leftBeamSprite.setPosition(ship.x - Constants.Dimensions.ShipOffset.x, ship.y - Constants.Dimensions.ShipOffset.y);
            leftBeamSprite.visible = true;
            const leftBeamBody = leftBeamSprite.body as Body;
            leftBeamBody.setVelocityY(-Constants.Physics.Speed.LaserBeam);
            rightBeamSprite.setPosition(ship.x + Constants.Dimensions.ShipOffset.x, ship.y - Constants.Dimensions.ShipOffset.y);
            rightBeamSprite.visible = true;
            const rightBeamBody = rightBeamSprite.body as Body;
            rightBeamBody.setVelocityY(-Constants.Physics.Speed.LaserBeam);
        }

        shipBody.setVelocity(0, 0);
        ship.anims.play(Constants.Animation.Names.Ship.default);
    };
    return update;
}

let index = 0;
const getSpriteName = (): string => {
    index++;
    if (index === Constants.Images.LaserBeam.Names.length) {
        index = 0;
    }
    return Constants.Images.LaserBeam.Names[index];
}