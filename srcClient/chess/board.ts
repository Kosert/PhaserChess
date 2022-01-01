import { Coordinate } from "../coordinate"
import { Coordinates } from "../coordinates"
import { LetterCoordinate } from "../letter-coordinate"
import { NumberCoordinate } from "../number-coordinate"
import { Color } from "./color"
import { Move } from "./move"
import { PieceType } from "./piece-type"
import { Bishop } from "./pieces/bishop"
import { King } from "./pieces/king"
import { Knight } from "./pieces/knight"
import { Pawn } from "./pieces/pawn"
import { Queen } from "./pieces/queen"
import { Rook } from "./pieces/rook"
import { Square } from "./square"

export class Board {
    private squares: Square[][] = []

    private constructor(initialPosition: Square[][] = null) {
        if (initialPosition) {
            this.squares = initialPosition
        } else {
            LetterCoordinate.values().forEach((letter) => {
                this.squares[letter] = []
                NumberCoordinate.values().forEach((number) => {
                    const coordinate = new Coordinate(letter, number)
                    this.squares[letter][number] = new Square(coordinate)
                })
            })
        }
    }

    getSquare: (coord: Coordinate) => Square = (coord: Coordinate) => {
        return this.squares[coord.letter][coord.number]
    }

    getPossibleMovesFor(square: Square, moveHistory: Move[]): Array<Coordinate> {
        return square.piece.type.movingStrategy(this.getSquare, moveHistory).getPossibleMovesFor(square)
    }

    getAllPieces(color: Color): Square[] {
        return Coordinates.values.map((it) => this.getSquare(it))
            .filter(it => it.piece?.color == color)
    }

    isKingInCheck(kingColor: Color): boolean {
        const enemyColor = Color.inverted(kingColor)
        const kingCoordinate = Coordinates.values.find(it => {
            const piece = this.getSquare(it).piece
            return piece?.color == kingColor && piece.type == PieceType.King
        })
        return this.isFieldAttacked(kingCoordinate, enemyColor)
    }

    isFieldAttacked(coordinate: Coordinate, enemyColor: Color): boolean {
        let enemyPieces: Square[] = []
        Coordinates.values.forEach((it) => {
            const square = this.getSquare(it)
            if (!square.piece) {
                return
            }
            if (square.piece.color == enemyColor) {
                enemyPieces.push(square)
            }
        })
        return enemyPieces.some(sq => { //move history is irrelevant for this check
            return this.getPossibleMovesFor(sq, []).some(it => it.equals(coordinate))
        })
    }

    serialize(): string {
        return JSON.stringify(this.squares)
    }

    static fromSerialized(json: string): Board {
        const squares = JSON.parse(json) as Square[][]
        Coordinates.values.forEach(it => {
            const piece = squares[it.letter][it.number].piece
            if (piece) {
                // @ts-ignore deserialization hax - reassigning the same type, so we don't lose functions
                piece.type = PieceType.byName(piece.type.name)
            }
        })
        return new Board(squares)
    }

    static startingPosition(): Board {
        const board = new Board()
        board.getSquare(Coordinates.A1).piece = new Rook(Color.WHITE, "A1")
        board.getSquare(Coordinates.B1).piece = new Knight(Color.WHITE, "B1")
        board.getSquare(Coordinates.C1).piece = new Bishop(Color.WHITE, "C1")
        board.getSquare(Coordinates.D1).piece = new Queen(Color.WHITE, "D1")
        board.getSquare(Coordinates.E1).piece = new King(Color.WHITE)
        board.getSquare(Coordinates.F1).piece = new Bishop(Color.WHITE, "F1")
        board.getSquare(Coordinates.G1).piece = new Knight(Color.WHITE, "G1")
        board.getSquare(Coordinates.H1).piece = new Rook(Color.WHITE, "H1")
        LetterCoordinate.values().forEach(it => {
            const coordinate = new Coordinate(it, NumberCoordinate.TWO)
            board.getSquare(coordinate).piece = new Pawn(Color.WHITE, coordinate.toString())
        })

        board.getSquare(Coordinates.A8).piece = new Rook(Color.BLACK, "A8")
        board.getSquare(Coordinates.B8).piece = new Knight(Color.BLACK, "B8")
        board.getSquare(Coordinates.C8).piece = new Bishop(Color.BLACK, "C8")
        board.getSquare(Coordinates.D8).piece = new Queen(Color.BLACK, "D8")
        board.getSquare(Coordinates.E8).piece = new King(Color.BLACK)
        board.getSquare(Coordinates.F8).piece = new Bishop(Color.BLACK, "F8")
        board.getSquare(Coordinates.G8).piece = new Knight(Color.BLACK, "G8")
        board.getSquare(Coordinates.H8).piece = new Rook(Color.BLACK, "H8")
        LetterCoordinate.values().forEach(it => {
            const coordinate = new Coordinate(it, NumberCoordinate.SEVEN)
            board.getSquare(coordinate).piece = new Pawn(Color.BLACK, coordinate.toString())
        })

        return board
    }
}
