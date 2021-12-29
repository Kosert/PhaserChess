import { Coordinate } from "../../coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"

export class KnightMovingStrategy extends MovingStrategy {

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const variations: Coordinate[] = []
        const letter = square.coordinate.letter
        const number = square.coordinate.number

        variations.push(new Coordinate(letter + 2, number + 1))
        variations.push(new Coordinate(letter + 2, number - 1))
        variations.push(new Coordinate(letter - 2, number + 1))
        variations.push(new Coordinate(letter - 2, number - 1))
        variations.push(new Coordinate(letter + 1, number + 2))
        variations.push(new Coordinate(letter + 1, number - 2))
        variations.push(new Coordinate(letter - 1, number + 2))
        variations.push(new Coordinate(letter - 1, number - 2))
        return variations.filter(it => !it.isOutOfBounds())
            .filter((it) => this.getSquare(it).piece?.color != square.piece.color)
    }
}
