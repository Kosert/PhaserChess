import { Coordinate } from "../coordinate"
import { NumberCoordinate } from "../number-coordinate"
import { Board } from "./board"
import { Color } from "./color"
import { CoordinateExtra } from "./coordinate-extra"
import { GameState } from "./game-state"
import { Move } from "./move"
import { PieceType } from "./piece-type"
import { Pawn } from "./pieces/pawn"
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
        const possibleTargets = this.currentBoard.getPossibleMovesFor(square, this.moves)

        // castling
        // king did not move
        // the king is not in check
        // rook did not move
        // the squares between the king and the rook involved are unoccupied
        // the king does not cross over or end on a square attacked by an enemy piece
        const isKingSelected = square.piece.type == PieceType.King
        const isKingInCheck = this.currentBoard.isKingInCheck(playerColor)
        const didKingMove = this.moves.some(it => it.pieceType == PieceType.King && it.color == playerColor)
        if (isKingSelected && !isKingInCheck && !didKingMove) {
            const allMyPieces = this.currentBoard.getAllPieces(playerColor)
            const enemyColor = Color.inverted(playerColor)
            const king = allMyPieces.find(it => it.piece.type == PieceType.King)
            const rooks = allMyPieces.filter(it => it.piece.type == PieceType.Rook)
            rooks.forEach(rook => {
                const didRookMove = this.moves.some(it => it.pieceId == rook.piece.pieceId())
                const between = king.coordinate.get2SquaresInDirectionOf(rook.coordinate.letter)
                const fieldsAreFree = between.every(it => !this.getSquare(it).piece && !this.currentBoard.isFieldAttacked(it, enemyColor))
                
                if (!didRookMove && fieldsAreFree) {
                    const castleTarget = between[1] as CoordinateExtra
                    castleTarget.additionalMove = {
                        from: rook.coordinate,
                        to: between[0]
                    }
                    possibleTargets.push(between[1])
                }
            })
        }

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

        const extraMove = (to as CoordinateExtra).additionalMove
        if (extraMove) {
            const extraFromSquare = this.getSquare(extraMove.from)
            const extraToSquare = this.getSquare(extraMove.to)
            extraToSquare.piece = extraFromSquare.piece
            extraFromSquare.piece = null
        }

        const newMove = Move.create(from, to, toSquare.piece)
        console.log("New move: ", newMove.toString())
        this.moves.push(newMove)

        if (toSquare.piece.type == PieceType.Pawn && (to.number == NumberCoordinate.EIGHT || to.number == NumberCoordinate.ONE)) {
            const pawn = toSquare.piece as Pawn
            toSquare.piece = pawn.toQueen()
        }

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
