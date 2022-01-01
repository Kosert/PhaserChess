import { Coordinate } from "../coordinate";

export class CoordinateExtra extends Coordinate {
    
    additionalMove: {
        from: Coordinate,
        to: Coordinate
    }
}