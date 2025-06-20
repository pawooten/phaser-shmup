export const Constants = {
    Dimensions: {
        Game: { width: 800, height: 600 },
        Ship: { width: 32, height: 32 },
        TriangleSmall: { width: 16, height: 16 },
        TriangleMedium: { width: 24, height: 24 },
        TriangleLarge: { width: 32, height: 32 },
    },
    FrameRate: 20,
    Position: {
        Center: { x: 400, y: 300 },
        ShipStart: { x: 400, y: 520 },
    }
};

export enum TriangleType {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
};