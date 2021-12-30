import { Coordinate } from "../coordinate"
import { Color } from "./color"
import { Move } from "./move"
import { BishopMovingStrategy } from "./movingStrategies/bishop-strategy"
import { KingMovingStrategy } from "./movingStrategies/king-strategy"
import { KnightMovingStrategy } from "./movingStrategies/knight-strategy"
import { MovingStrategy } from "./movingStrategies/moving-strategy"
import { PawnMovingStrategy } from "./movingStrategies/pawn-strategy"
import { QueenMovingStrategy } from "./movingStrategies/queen-strategy"
import { RookMovingStrategy } from "./movingStrategies/rook-strategy"
import { Square } from "./square"

export class PieceType {
    static readonly Pawn = new PieceType({
        name: "Pawn",
        points: 1,
        unicodeBlack: "♙",
        unicodeWhite: "♟",
        assetWhite: "pawn_white",
        assetBlack: "pawn_black",
        movingStrategy: (getSquare, getMoveHistory) => new PawnMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly Knight = new PieceType({
        name: "Knight",
        points: 3,
        unicodeBlack: "♘",
        unicodeWhite: "♞",
        assetWhite: "knight_white",
        assetBlack: "knight_black",
        movingStrategy: (getSquare, getMoveHistory) => new KnightMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly Bishop = new PieceType({
        name: "Bishop",
        points: 3,
        unicodeBlack: "♗",
        unicodeWhite: "♝",
        assetWhite: "bishop_white",
        assetBlack: "bishop_black",
        movingStrategy: (getSquare, getMoveHistory) => new BishopMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly Rook = new PieceType({
        name: "Rook",
        points: 5,
        unicodeBlack: "♖",
        unicodeWhite: "♜",
        assetWhite: "rook_white",
        assetBlack: "rook_black",
        movingStrategy: (getSquare, getMoveHistory) => new RookMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly Queen = new PieceType({
        name: "Queen",
        points: 9,
        unicodeBlack: "♕",
        unicodeWhite: "♛",
        assetWhite: "queen_white",
        assetBlack: "queen_black",
        movingStrategy: (getSquare, getMoveHistory) => new QueenMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly King = new PieceType({
        name: "King",
        points: 0,
        unicodeBlack: "♔",
        unicodeWhite: "♚",
        assetWhite: "king_white",
        assetBlack: "king_black",
        movingStrategy: (getSquare, getMoveHistory) => new KingMovingStrategy(getSquare, getMoveHistory)
    })

    static readonly values: PieceType[] = [
        PieceType.Pawn,
        PieceType.Knight,
        PieceType.Bishop,
        PieceType.Rook,
        PieceType.Queen,
        PieceType.King,
    ]

    static byName(name: string): PieceType {
        return this.values.find((it) => it.name == name)
    }

    readonly name: string
    readonly points: number
    readonly unicodeWhite: string
    readonly unicodeBlack: string
    readonly assetWhite: string
    readonly assetBlack: string
    readonly movingStrategy: (getSquare: (coord: Coordinate) => Square, moveHistory: Move[]) => MovingStrategy

    constructor(data: Partial<PieceType>) {
        Object.assign(this, data)
    }

    getUnicode(color: Color): string {
        switch (color) {
            case Color.WHITE:
                return this.unicodeWhite
            case Color.BLACK:
                return this.unicodeBlack
        }
    }

    getAsset(color: Color): string {
        switch (color) {
            case Color.WHITE:
                return this.assetWhite
            case Color.BLACK:
                return this.assetBlack
        }
    }
}
