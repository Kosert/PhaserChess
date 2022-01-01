import { Coordinate } from "../coordinate"
import { Color } from "./color"
import { PieceType } from "./piece-type"
import { AbstractPiece } from "./pieces/abstract-piece"

export class Move {

    constructor(
        readonly source: Coordinate,
        readonly target: Coordinate,
        readonly pieceId: string,
        readonly pieceType: PieceType,
        readonly color: Color,
    ) {}

    toString(): string {
        return this.pieceType.unicodeWhite + this.target.toString()
    }

    static create(source: Coordinate, target: Coordinate, piece: AbstractPiece): Move {
        return new Move(source, target, piece.pieceId(), piece.type, piece.color)
    }
}
