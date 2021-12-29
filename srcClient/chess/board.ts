import { Coordinate } from "../coordinate"
import { Coordinates } from "../coordinates"
import { LetterCoordinate } from "../letter-coordinate"
import { NumberCoordinate } from "../number-coordinate"
import { Color } from "./color"
import { PieceType } from "./piece-type"
import { King } from "./pieces/king"
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

    getPossibleMovesFor(square: Square): Array<Coordinate> {
        return square.piece.type.movingStrategy(this.getSquare).getPossibleMovesFor(square)
    }

    isKingInCheck(kingColor: Color): boolean {
        const enemyColor = Color.inverted(kingColor)

        let king: Square
        let enemyPieces: Square[] = []
        Coordinates.values.forEach((it) => {
            const square = this.getSquare(it)
            if (!square.piece) {
                return
            }
            
            if (square.piece.color == enemyColor) {
                enemyPieces.push(square)
            } else if (square.piece.type.name == PieceType.King.name) {
                king = square
            }
        })

        return enemyPieces.some(sq => {
            return this.getPossibleMovesFor(sq).some(it => it.equals(king.coordinate))
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
        board.getSquare(Coordinates.E1).piece = new King(Color.WHITE)
        board.getSquare(Coordinates.E8).piece = new King(Color.BLACK)
        return board
    }
}
