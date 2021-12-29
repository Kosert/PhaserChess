import { Color } from "../chess/color";
import { PieceType } from "../chess/piece-type";
import { Coordinate } from "../coordinate";

export class PieceInfo {

    constructor(
        readonly type: PieceType,
        readonly color: Color,
        public coordinate: Coordinate,
        readonly pieceId: string
    ) {}

}