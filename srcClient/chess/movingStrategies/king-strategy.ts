import { Coordinate } from "../../coordinate"
import { LetterCoordinate } from "../../letter-coordinate"
import { NumberCoordinate } from "../../number-coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"

export class KingMovingStrategy extends MovingStrategy {

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const letterVariations = [square.coordinate.letter]
        if (square.coordinate.letter + 1 <= LetterCoordinate.H) 
            letterVariations.push(square.coordinate.letter + 1)
        if (square.coordinate.letter - 1 >= LetterCoordinate.A) 
            letterVariations.push(square.coordinate.letter - 1)

        const numberVariations = [square.coordinate.number]
        if (square.coordinate.number + 1 <= NumberCoordinate.EIGHT)
            numberVariations.push(square.coordinate.number + 1)
        if (square.coordinate.number - 1 >= NumberCoordinate.ONE)
            numberVariations.push(square.coordinate.number - 1)

        const variations: Coordinate[] = []
        letterVariations.forEach((l) => {
            numberVariations.forEach((n) => {
                variations.push(new Coordinate(l, n))
            })
        })

        return variations.filter((it) => it != square.coordinate)
                    .filter((it) => this.getSquare(it).piece?.color != square.piece.color)
    }
}
