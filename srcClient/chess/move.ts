import { Coordinate } from "../coordinate"
import { PieceType } from "./piece-type"

export class Move {
    constructor(
        readonly source: Coordinate,
        readonly target: Coordinate,
        readonly pieceType: PieceType
    ) { }

    toString(): string {
        return this.pieceType.unicodeWhite + this.target.toString()
    }
}
