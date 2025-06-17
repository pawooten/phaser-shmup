import Phaser from 'phaser';
type SceneCreateCallback = Phaser.Types.Scenes.SceneCreateCallback;
type ScenePreloadCallback = Phaser.Types.Scenes.ScenePreloadCallback;
type SceneUpdateCallback = Phaser.Types.Scenes.SceneUpdateCallback;
type GameConfig = Phaser.Types.Core.GameConfig;
type StaticGroup = Phaser.Physics.Arcade.StaticGroup;
type Sprite = Phaser.Physics.Arcade.Sprite;
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
let platforms: StaticGroup | undefined;
let bombs: Phaser.Physics.Arcade.Group | undefined;
let player: Sprite | undefined;
let stars: Phaser.Physics.Arcade.Group | undefined;
let score = 0;
let scoreText: Phaser.GameObjects.Text | undefined;
let cursorKeys: CursorKeys | undefined;
const create: SceneCreateCallback = function () {
    this.add.image(400, 300, 'sky');
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { font: '32px Arial', color: '#ffffff' };
    scoreText = this.add.text(16, 16, 'Score: 0', textStyle);
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        const gameObject = child as Sprite;
        gameObject.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        return true;
    });
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    const playerBody = player?.body as Phaser.Physics.Arcade.Body;
    playerBody.setGravityY(300);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, function (player, star) {
        const playerSprite = player as Sprite;
        const sprite = star as Sprite;
        sprite.disableBody(true, true);
        score += 10;
        scoreText?.setText('Score: ' + score);

        if (stars?.countActive(true) === 0) {
            for (const star of stars?.getChildren() || []) {
                const sprite = star as Sprite;
                sprite.enableBody(true, sprite.x, 0, true, true);
            }

            const x = (playerSprite.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = bombs?.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 2);

        }
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, (player, bomb) => {
        this.physics.pause();
        const playerSprite = player as Sprite;
        playerSprite.setTint(0xff0000);

        playerSprite.anims.play('turn');

        // gameOver = true;
        scoreText?.setText('Game Over! Final Score: ' + score);
    }, () => { }, this);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursorKeys = this?.input?.keyboard?.createCursorKeys();
};
const preload: ScenePreloadCallback = function () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
};
const update: SceneUpdateCallback = function () {
    if (!player || !player.body || !platforms || !cursorKeys) {
        return;
    }
    if (cursorKeys.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursorKeys.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursorKeys.up.isDown && player.body.touching.down) {
        player.setVelocityY(-660);
    }
};
const phaserConfig: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

export const phaserGame = new Phaser.Game(phaserConfig);