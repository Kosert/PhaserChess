import { Coordinate } from "../coordinate"
import { Coordinates } from "../coordinates"
import { DrawConfig } from "../draw-config"
import { LetterCoordinate } from "../letter-coordinate"
import { NumberCoordinate } from "../number-coordinate"
import { DragCallback } from "./drag-callback"
import { PieceInfo } from "./piece-info"
import { PieceObject } from "./piece-object"
import { SquareObject } from "./square-object"

export class BoardObject {
    drawConfig: DrawConfig = DrawConfig.default()

    private squares: SquareObject[][] = []
    private pieces: PieceObject[] = []
    private selection?: Coordinate

    constructor(private readonly scene: Phaser.Scene, private onClicked: (square: SquareObject) => void) {
        LetterCoordinate.values().forEach((letter) => {
            this.squares[letter] = []
            NumberCoordinate.values().forEach((number) => {
                const coordinate = new Coordinate(letter, number)
                this.squares[letter][number] = new SquareObject(scene, coordinate, this.drawConfig, onClicked)
            })
        })

        this.layout()
    }

    private pieceDragCallback: DragCallback = {
        onDragStart: (startCoordinate: Coordinate) => {
            const square = this.getSquare(startCoordinate)
            this.onClicked.call(this.scene, square)
        },

        onDragEnd: (coordinate: Coordinate) => {
            const square = this.getSquare(coordinate)
            this.onClicked.call(this.scene, square)
        }
    }

    getSquare(coord: Coordinate): SquareObject {
        return this.squares[coord.letter][coord.number]
    }

    setSelection(coord?: Coordinate) {
        if (this.selection != null) {
            this.getSquare(this.selection).isSelected = false
            this.selection = null
        }

        if (coord != null) {
            this.getSquare(coord).isSelected = true
            this.selection = coord
        }
        
        this.layout()
    }

    setMoveIndicators(legalCoordinates: Coordinate[]) {
        Coordinates.values.forEach(it => {
            this.getSquare(it).showMoveIndicator = legalCoordinates.some(c => c.equals(it))
        })
        this.layout()
    }

    layout() {
        Coordinates.values.forEach(it => {
            this.getSquare(it).refresh(this.drawConfig)
        })
    }

    updatePieces(infos: PieceInfo[]) {
        const localIds = this.pieces.map(it => it.info.pieceId)
        const remoteIds = infos.map(it => it.pieceId)

        const toAdd = infos.filter(it => !localIds.includes(it.pieceId)) // should happen only at start? or promotion?
        const toRemove = localIds.filter(it => !remoteIds.includes(it))

        toRemove.forEach(id => {
            const index = this.pieces.findIndex(it => it.info.pieceId == id)
            this.pieces[index].destroy()
            this.pieces.splice(index, 1)
        })

        toAdd.forEach(it => {
            this.pieces.push(new PieceObject(this.scene, it, this.pieceDragCallback, this.drawConfig))
        })

        infos.forEach(info => {
            const piece = this.pieces.find(it => it.info.pieceId == info.pieceId)
            if (!info.coordinate.equals(piece.info.coordinate)) {
                piece.updateCoordinate(info.coordinate)
            }
        })
    }

    destroy() {
        this.squares.forEach((row) => row.forEach((it) => it.destroy()))
    }
}
