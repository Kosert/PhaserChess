import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"

export class Pawn extends AbstractPiece {

    readonly type: PieceType = PieceType.Pawn

    constructor(color: Color, additionalId: string) {
        super(color, additionalId)
    }

}
