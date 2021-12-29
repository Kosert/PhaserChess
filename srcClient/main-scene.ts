import { Scene } from "phaser"
import { ChessGame } from "./chess/chess-game"
import { PieceType } from "./chess/piece-type"
import { Square } from "./chess/square"
import { Coordinate } from "./coordinate"
import { Coordinates } from "./coordinates"
import FpsText from "./fpsText"
import { GameState } from "./chess/game-state"
import { BoardObject } from "./objects/board-object"
import { PieceInfo } from "./objects/piece-info"
import { SquareObject } from "./objects/square-object"

export class MainScene extends Scene {
    private fpsText: FpsText
    private boardObject: BoardObject

    private chess = new ChessGame()

    private selected?: Coordinate = null

    constructor() {
        super({ key: "MainScene" })
    }

    preload() {
        PieceType.values.forEach((it) => {
            this.load.image(it.assetWhite, "assets/" + it.assetWhite + ".png")
            this.load.image(it.assetBlack, "assets/" + it.assetBlack + ".png")
        })
    }

    create() {
        this.fpsText = new FpsText(this)
        this.boardObject = new BoardObject(this, this.onSquareClicked)
        this.onNewMove()
    }

    onSquareClicked(obj: SquareObject) {
        const colorToPlay = GameState.getColorToMove(this.chess.gameState)
        if (colorToPlay == null)
            return

        const clickedSquare = this.chess.getSquare(obj.coordinate)
        if (this.selected == null) {
            if (clickedSquare.piece?.color == colorToPlay) {
                this.setSelection(clickedSquare)
            }
        } else {
            const legalCoordinates = this.chess.getLegalMovesFor(this.selected)
            /*if (clickedSquare.coordinate == this.selected) {
                this.setSelection(null)
            } else */
            if (clickedSquare.piece?.color == colorToPlay) {
                this.setSelection(clickedSquare)
            } else if (legalCoordinates.some(it => it.equals(clickedSquare.coordinate))) {
                this.chess.move(this.selected, obj.coordinate)
                this.setSelection(null)
                this.onNewMove()
            } else {
                this.setSelection(null)
            }
        }
    }

    private setSelection(square: Square) {
        console.log("Selected: " + square?.piece?.type?.unicodeWhite + " " + square?.coordinate?.toString())
        this.selected = square?.coordinate
        this.boardObject.setSelection(square?.coordinate)
        if (square) {
            const legalCoordinates = this.chess.getLegalMovesFor(square.coordinate)
            this.boardObject.setMoveIndicators(legalCoordinates)
        } else {
            this.boardObject.setMoveIndicators([])
        }
    }

    onNewMove() {
        const infos = Coordinates.values.map(it => {
            const piece = this.chess.getSquare(it).piece
            if (piece)
                return new PieceInfo(piece.type, piece.color, it, piece.pieceId())
            else
                return null
        }).filter(it => it)
        this.boardObject.updatePieces(infos)
    }

    update() {
        this.fpsText.update()
    }
}
