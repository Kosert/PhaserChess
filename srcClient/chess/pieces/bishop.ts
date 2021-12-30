import { Color } from "../color"
import { PieceType } from "../piece-type"
import { AbstractPiece } from "./abstract-piece"

export class Bishop extends AbstractPiece {

    readonly type: PieceType = PieceType.Bishop

    constructor(color: Color, additionalId: string) {
        super(color, additionalId)
    }

}
