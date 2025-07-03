export const Constants = {
    Animation: {
        FrameRanges: { Zero: { start: 0, end: 0 }, One: { start: 1, end: 1 }, Two: { start: 2, end: 2 }, ZeroToThree: { start: 0, end: 3 } },
        Loop: -1,
        Names: {
            Ship: { left: 'ship-left', right: 'ship-right', default: 'ship' },
            LaserBeam: 'laser-beam',
            Triangle: {
                small: 'triangle-small',
                medium: 'triangle-medium',
                large: 'triangle-large'
            }
        }
    },
    Dimensions: {
        Game: { width: 800, height: 600 },
        Ship: { width: 32, height: 32 },
        ShipOffset: { x: 9, y: 18 },
        ShipTurningOffset: 10,
        LaserBeam: { width: 16, height: 32 },
        Triangle: { width: 32, height: 32 }
    },
    EnemyScale: { small: 0.5, medium: 0.75, large: 1 },
    ErrorMessages: {
        CreateObjectsNotDefined: 'Create objects are not defined',
        ShipBodyInitializationFailed: 'Ship body initialization failed',
        ShipNotDefinedInUpdate: 'Ship is not defined in update',
        ShipBodyNotDefinedInUpdate: 'Ship body is not defined in update',
        CursorKeysNotDefinedInUpdate: 'Cursor keys are not defined in update',
        SpriteNotFound: 'Sprite not found',
    },
    FrameRate: 20,
    Physics: { Type: 'arcade', Gravity: { x: 0, y: 10 }, Speed: { Ship: 160, LaserBeam: 300 } },
    Images: {
        Sky: { Name: 'sky', Path: 'assets/gradient-sky.png' },
        Ship: { Name: 'ship', Path: 'assets/ship.png' },
        LaserBeam: { Names: ['laser-beam-01', 'laser-beam-02', 'laser-beam-03'], Path: 'assets/laser-beam.png' },
        Triangle: { Name: 'triangle', Path: 'assets/triangle.png' },
    },
    Position: {
        Center: { x: 400, y: 300 },
        ShipStart: { x: 400, y: 520 },
    }
};

export enum TriangleType {
    Small = 'triangle-small',
    Medium = 'triangle-medium',
    Large = 'triangle-large',
};
export const triangleScales = new Map<TriangleType, number>([
    [TriangleType.Small, Constants.EnemyScale.small],
    [TriangleType.Medium, Constants.EnemyScale.medium],
    [TriangleType.Large, Constants.EnemyScale.large],
]);