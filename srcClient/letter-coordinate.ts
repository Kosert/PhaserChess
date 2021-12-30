export enum LetterCoordinate {
    A = 0,
    B = 1,
    C = 2,
    D = 3,
    E = 4,
    F = 5,
    G = 6,
    H = 7,
}

export namespace LetterCoordinate {
    export function values(): LetterCoordinate[] {
        return [
            LetterCoordinate.A,
            LetterCoordinate.B,
            LetterCoordinate.C,
            LetterCoordinate.D,
            LetterCoordinate.E,
            LetterCoordinate.F,
            LetterCoordinate.G,
            LetterCoordinate.H,
        ]
    }

    export function isOutOfBounds(value: number): boolean {
        return value > LetterCoordinate.H || value < LetterCoordinate.A
    }
}
