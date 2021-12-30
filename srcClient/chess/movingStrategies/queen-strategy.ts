import { Coordinate } from "../../coordinate"
import { MovingStrategy } from "./moving-strategy"
import { Square } from "../square"
import { RookMovingStrategy } from "./rook-strategy"
import { BishopMovingStrategy } from "./bishop-strategy"
import { Move } from "../move"

export class QueenMovingStrategy extends MovingStrategy {

    private rookMovingStrategy: RookMovingStrategy
    private bishopMovingStrategy: BishopMovingStrategy

    constructor(getSquare: (coord: Coordinate) => Square, moveHistory: Move[]) {
        super(getSquare, moveHistory)
        this.rookMovingStrategy = new RookMovingStrategy(getSquare, moveHistory)
        this.bishopMovingStrategy = new BishopMovingStrategy(getSquare, moveHistory)
    }

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        const lineMoves = this.rookMovingStrategy.getPossibleMovesFor(square)
        const diagonalMoves = this.bishopMovingStrategy.getPossibleMovesFor(square)
        return lineMoves.concat(diagonalMoves)
    }
}
