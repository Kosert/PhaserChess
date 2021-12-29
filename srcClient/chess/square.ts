import { Coordinate } from "../coordinate";
import { AbstractPiece } from "./pieces/abstract-piece";

export class Square {

    piece?: AbstractPiece

    constructor(readonly coordinate: Coordinate) {}

}