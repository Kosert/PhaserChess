import { Coordinate } from "../../coordinate"
import { Move } from "../move"
import { Square } from "../square"

export abstract class MovingStrategy {

    constructor(
        protected getSquare: (coord: Coordinate) => Square,
        protected moveHistory: Move[]
    ) {}

    /**
     * returns a list of moves (target destinations) that could be taken assuming there are no other pieces on board.
     * @param square initial position
     */
    abstract getPossibleMovesFor(square: Square): Array<Coordinate>
}