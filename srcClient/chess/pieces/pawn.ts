import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"
import { Queen } from "./queen"

export class Pawn extends AbstractPiece {

    readonly type: PieceType = PieceType.Pawn

    constructor(color: Color, additionalId: string) {
        super(color, additionalId)
    }

    toQueen(): Queen {
        return new Queen(this.color, this.additionalId)
    }
}
