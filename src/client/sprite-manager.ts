const sprites = new Map<string, Phaser.GameObjects.Sprite>();
export const SpriteManager = {
  add: (key: string, sprite: Phaser.GameObjects.Sprite) => {
    sprites.set(key, sprite);
  },
  get: (key: string) => {
    return sprites.get(key);
  },
  remove: (key: string) => {
    sprites.delete(key);
  }
};