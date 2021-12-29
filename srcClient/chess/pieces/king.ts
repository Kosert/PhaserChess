import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"

export class King extends AbstractPiece {

    readonly type: PieceType = PieceType.King

    constructor(color: Color) {
        super(color)
    }

}
