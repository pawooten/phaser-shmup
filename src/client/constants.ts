export const Constants = {
    Dimensions: {
        Game: { width: 800, height: 600 },
        Ship: { width: 32, height: 32 },
        LaserBeam: { width: 16, height: 32 },
        Triangle: { width: 32, height: 32 }
    },
    EnemyScale: { small: 0.5, medium: 0.75, large: 1 },
    FrameRate: 20,
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