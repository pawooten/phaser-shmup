import { Constants, triangleScales, TriangleType } from "./constants";

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
const initializeTriangle = (triangle: Sprite | undefined): Body | undefined => {
    if (!triangle) {
        return undefined;
    }

    const triangleBody = triangle.body as Body;
    triangleBody.allowGravity = false;

    return triangleBody;
}
export const initializeTriangles = (scene: Phaser.Scene, count: number): Sprite[] => {
    const triangles: Sprite[] = [];
    const maxX = scene.scale.width - Constants.Dimensions.Triangle.width;
    const maxY = scene.scale.height - Constants.Dimensions.Triangle.height;
    for (let i = 0; i < count; i++) {
        const x = Phaser.Math.Between(Constants.Dimensions.Triangle.width, maxX);
        const y = Phaser.Math.Between(Constants.Dimensions.Triangle.height, maxY);
        const type = Phaser.Math.RND.pick([...Object.values(TriangleType)]);
        const scale = triangleScales.get(type) || 1;
        const triangle = scene.physics.add.sprite(x, y, type).setScale(scale).play(type);
        initializeTriangle(triangle);
        triangles.push(triangle);
    }
    return triangles;
}