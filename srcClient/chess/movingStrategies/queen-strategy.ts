import { Coordinate } from "../../coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"
import { RookMovingStrategy } from "./rook-strategy"
import { BishopMovingStrategy } from "./bishop-strategy"

export class QueenMovingStrategy extends MovingStrategy {

    private rookMovingStrategy: RookMovingStrategy
    private bishopMovingStrategy: BishopMovingStrategy

    constructor(protected getSquare: (coord: Coordinate) => Square) {
        super(getSquare)
        this.rookMovingStrategy = new RookMovingStrategy(this.getSquare)
        this.bishopMovingStrategy = new BishopMovingStrategy(this.getSquare)
    }

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const lineMoves = this.rookMovingStrategy.getPossibleMovesFor(square)
        const diagonalMoves = this.bishopMovingStrategy.getPossibleMovesFor(square)
        return lineMoves.concat(diagonalMoves)
    }
}
