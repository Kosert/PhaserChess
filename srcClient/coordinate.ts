import { LetterCoordinate } from "./letter-coordinate"
import { NumberCoordinate } from "./number-coordinate"

export class Coordinate {
    constructor(readonly letter: LetterCoordinate, readonly number: NumberCoordinate) {}

    isOutOfBounds(): boolean {
        return LetterCoordinate.isOutOfBounds(this.letter) || NumberCoordinate.isOutOfBounds(this.number)
    }

    equals(other: Coordinate): boolean {
        return this.letter == other.letter && this.number == other.number
    }

    get2SquaresInDirectionOf(direction: LetterCoordinate): Coordinate[] {
        let letters: LetterCoordinate[]
        if (this.letter < direction) {
            letters = [this.letter + 1, this.letter + 2]
        } else {
            letters = [this.letter - 1, this.letter - 2]
        }
        return letters.filter(it => !LetterCoordinate.isOutOfBounds(it))
            .map(it => new Coordinate(it, this.number))
    }

    toString(): string {
        const letterString = LetterCoordinate[this.letter]
        const numberString = (this.number + 1).toString()
        return letterString + numberString
    }
}
