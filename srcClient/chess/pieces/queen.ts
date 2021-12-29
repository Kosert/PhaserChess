import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"

export class Queen extends AbstractPiece {

    readonly type: PieceType = PieceType.Queen

    constructor(color: Color, additionalId: string) {
        super(color, additionalId)
    }

}
