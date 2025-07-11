import { Constants } from "./constants";

type Sprite = Phaser.Physics.Arcade.Sprite;
const sprites = new Map<string, Sprite | Sprite[]>();
export const SpriteManager = {
  add: (key: string, sprite: Sprite | Sprite[]) => {
    sprites.set(key, sprite);
  },
  get: <T extends Sprite | Sprite[]>(key: string) => {
    return sprites.get(key) as T;
  },
  remove: (key: string) => {
    sprites.delete(key);
  }
};

function* createSpriteNameCycler(): Generator<string, never, unknown> {
  let index = 0;
  while (true) {
    yield Constants.Images.LaserBeam.Names[index % Constants.Images.LaserBeam.Names.length];
    index++;
  }
}

const spriteNameCycler = createSpriteNameCycler();
export const getSpriteName = (): string => {
  return spriteNameCycler.next().value;
}