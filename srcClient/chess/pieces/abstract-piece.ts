import { Coordinate } from "../../coordinate";
import { Color } from "../color";
import { PieceType } from "../piece-type";

export class AbstractPiece {

    readonly type: PieceType
    
    constructor(readonly color: Color, private additionalId: string = "") {

    }
    
    pieceId(): string {
        return this.color + "_" + this.type.name + "_" + this.additionalId
    }

}