import { LetterCoordinate } from "./letter-coordinate"
import { NumberCoordinate } from "./number-coordinate"

export class Coordinate {
    constructor(readonly letter: LetterCoordinate, readonly number: NumberCoordinate) {}

    equals(other: Coordinate): boolean {
        return this.letter == other.letter && this.number == other.number
    }

    toString(): string {
        const letterString = LetterCoordinate[this.letter]
        const numberString = (this.number + 1).toString()
        return letterString + numberString
    }
}
