export enum NumberCoordinate {
    ONE = 0,
    TWO = 1,
    THREE = 2,
    FOUR = 3,
    FIVE = 4,
    SIX = 5,
    SEVEN = 6,
    EIGHT = 7
}

export namespace NumberCoordinate {
    export function values(): NumberCoordinate[] {
        return [
            NumberCoordinate.ONE,
            NumberCoordinate.TWO,
            NumberCoordinate.THREE,
            NumberCoordinate.FOUR,
            NumberCoordinate.FIVE,
            NumberCoordinate.SIX,
            NumberCoordinate.SEVEN,
            NumberCoordinate.EIGHT
        ]
    }
    
    export function isOutOfBounds(value: number): boolean {
        return value > NumberCoordinate.EIGHT || value < NumberCoordinate.ONE
    }
}
