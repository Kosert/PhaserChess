import { Coordinate } from "../coordinate"
import { Board } from "./board"
import { Color } from "./color"
import { GameState } from "./game-state"
import { Move } from "./move"
import { Square } from "./square"

export class ChessGame {
    private _gameState = GameState.BEFORE_GAME
    private currentBoard = Board.startingPosition()
    private moves: Array<Move> = []

    public get gameState() {
        return this._gameState
    }

    getSquare: (coord: Coordinate) => Square = (coord: Coordinate) => {
        return this.currentBoard.getSquare(coord)
    }

    getLegalMovesFor(coordinate: Coordinate): Array<Coordinate> {
        const square = this.getSquare(coordinate)
        const playerColor = square.piece.color
        const possibleTargets = this.currentBoard.getPossibleMovesFor(square)

        return possibleTargets.filter((it) => {
            const json = this.currentBoard.serialize()
            const boardCopy = Board.fromSerialized(json)
            const from = boardCopy.getSquare(square.coordinate)
            const to = boardCopy.getSquare(it)
            to.piece = from.piece
            from.piece = null

            return !boardCopy.isKingInCheck(playerColor)
        })
    }

    move(from: Coordinate, to: Coordinate) {
        const fromSquare = this.getSquare(from)
        const toSquare = this.getSquare(to)

        toSquare.piece = fromSquare.piece
        fromSquare.piece = null

        const newMove = new Move(from, to, toSquare.piece.type)
        console.log("New move: ", newMove.toString())
        this.moves.push(newMove)

        const movedColor = GameState.getColorToMove(this.gameState)
        const colorToMove = Color.inverted(movedColor)

        const canMove = this.currentBoard.getAllPieces(colorToMove).some(it => this.getLegalMovesFor(it.coordinate).length > 0)
        if (!canMove) {
            this._gameState = GameState.GAME_FINISHED
            if (this.currentBoard.isKingInCheck(colorToMove)) {
                $('#resultToastText').text("Checkmate, winner: " + movedColor)
            } else {
                $('#resultToastText').text("Draw by Stalemate")
            }
            $('#resultToast').toast({ autohide: false })
            $('#resultToast').toast('show')
        }
        else if (movedColor == Color.WHITE) {
            this._gameState = GameState.BLACK_TO_MOVE
        } else {
            this._gameState = GameState.WHITE_TO_MOVE
        }
    }
}
