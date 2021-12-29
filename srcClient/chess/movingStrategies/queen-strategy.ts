import { Coordinate } from "../../coordinate"
import { LetterCoordinate } from "../../letter-coordinate"
import { NumberCoordinate } from "../../number-coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"

export class QueenMovingStrategy extends MovingStrategy {

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        throw new Error("Not Implemented")
    }
}
