type Body = Phaser.Physics.Arcade.Body;
type Sprite = Phaser.Physics.Arcade.Sprite;
export const initializeShip = (ship: Sprite | undefined): Body | undefined => {
    if (!ship) {
        return undefined;
    }

    const shipBody = ship.body as Body;
    shipBody.allowGravity = false;
    ship.setCollideWorldBounds(true);
    ship.setBounce(0.2);

    return shipBody;
}