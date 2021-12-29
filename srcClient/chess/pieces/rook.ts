import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"

export class Rook extends AbstractPiece {

    readonly type: PieceType = PieceType.Rook

    constructor(color: Color, additionalId: string) {
        super(color, additionalId)
    }

}
