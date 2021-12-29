import { Coordinate } from "../coordinate";

export interface DragCallback {

    onDragStart: (startCoordinate: Coordinate) => void
    onDragEnd: (coordinate: Coordinate) => void
}