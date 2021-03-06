import { Coordinate } from "../../coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"
import { LetterCoordinate } from "../../letter-coordinate"
import { NumberCoordinate } from "../../number-coordinate"
import { Color } from "../color"
import { PieceType } from "../piece-type"
import { CoordinateExtra } from "../coordinate-extra"

export class PawnMovingStrategy extends MovingStrategy {

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const variations: Coordinate[] = []
        
        const letter = square.coordinate.letter
        const number = square.coordinate.number
        const myColor = square.piece.color
        const directionDiff = myColor == Color.WHITE ? 1 : -1

        const nextCoordinate = new Coordinate(letter, number + directionDiff)
        if (!this.getSquare(nextCoordinate).piece) {
            variations.push(nextCoordinate)

            const startingPos = myColor == Color.WHITE ? NumberCoordinate.TWO : NumberCoordinate.SEVEN
            if (startingPos == number) {
                const plus2Coordinate = new Coordinate(letter, number + directionDiff * 2)
                if (!this.getSquare(plus2Coordinate).piece) {
                    variations.push(plus2Coordinate)
                }
            }
        }

        const enemyColor = Color.inverted(myColor)
        const captureCoordinates = [
            new Coordinate(letter - 1, number + directionDiff),
            new Coordinate(letter + 1, number + directionDiff)
        ].filter(it => !it.isOutOfBounds())
            .filter((it) => this.getSquare(it).piece?.color == enemyColor)
        variations.push(...captureCoordinates)

        // en passant
        const lastMove = this.moveHistory[this.moveHistory.length - 1]
        if (lastMove) {
            const lastMoveNumberDiff = Math.abs(lastMove.source.number - lastMove.target.number)
            const isPawnOnGoodLine = lastMove.target.number == number
            
            if (lastMove.pieceType == PieceType.Pawn && lastMoveNumberDiff > 1 && isPawnOnGoodLine) {
                if (lastMove.target.letter == letter - 1) {
                    const coord = new CoordinateExtra(letter - 1, number + directionDiff)
                    coord.additionalMove = { from: square.coordinate, to: lastMove.target }
                    variations.push(coord)
                }
                if (lastMove.target.letter == letter + 1) {
                    const coord = new CoordinateExtra(letter + 1, number + directionDiff)
                    coord.additionalMove = { from: square.coordinate, to: lastMove.target }
                    variations.push(coord)
                }
            }
        }

        return variations
    }
}
