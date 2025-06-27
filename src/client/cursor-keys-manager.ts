type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
let cursorKeys: CursorKeys | undefined = undefined;
export const CursorKeysManager = {
  getCursorKeys: () => {
    if (!cursorKeys) {
      console.error("Cursor keys are not initialized.");
      return undefined;
    }
    return cursorKeys;
  },
  setCursorKeys: (keys: CursorKeys) => {
    cursorKeys = keys;
  }
};