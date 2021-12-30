import { Coordinate } from "../../coordinate"
import { LetterCoordinate } from "../../letter-coordinate"
import { NumberCoordinate } from "../../number-coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"
import { Color } from "../color"

export class BishopMovingStrategy extends MovingStrategy {

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const myColor = square.piece.color
        const enemyColor = Color.inverted(square.piece.color)
        const variations: Coordinate[] = []

        const checkCoord = (letter: LetterCoordinate, number: NumberCoordinate) => {
            const coordinate = new Coordinate(letter, number)
            if (coordinate.isOutOfBounds())
                return true

            const newSquare = this.getSquare(coordinate)
            if (newSquare.piece?.color == myColor) {
                return true
            } else if (newSquare.piece?.color == enemyColor) {
                variations.push(coordinate)
                return true
            } else {
                variations.push(coordinate)
                return false
            }
        }

        let letterCounter = square.coordinate.letter
        let numberCounter = square.coordinate.number
        while (true) {
            letterCounter++
            numberCounter++
            if (checkCoord(letterCounter, numberCounter))
                break
        }

        letterCounter = square.coordinate.letter
        numberCounter = square.coordinate.number
        while (true) {
            letterCounter--
            numberCounter++
            if (checkCoord(letterCounter, numberCounter))
                break
        }

        letterCounter = square.coordinate.letter
        numberCounter = square.coordinate.number
        while (true) {
            letterCounter++
            numberCounter--
            if (checkCoord(letterCounter, numberCounter))
                break
        }

        letterCounter = square.coordinate.letter
        numberCounter = square.coordinate.number
        while (true) {
            letterCounter--
            numberCounter--
            if (checkCoord(letterCounter, numberCounter))
                break
        }

        return variations
    }
}
