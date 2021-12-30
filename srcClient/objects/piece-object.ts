import { Coordinate } from "../coordinate"
import { DrawConfig } from "../draw-config"
import { LetterCoordinate } from "../letter-coordinate"
import { NumberCoordinate } from "../number-coordinate"
import { DragCallback } from "./drag-callback"
import { PieceInfo } from "./piece-info"
import "../util"

export class PieceObject extends Phaser.GameObjects.Image {

    constructor(
        scene: Phaser.Scene,
        readonly info: PieceInfo,
        private dragCallback: DragCallback,
        private drawConfig: DrawConfig
    ) {
        super(scene, 0, 0, info.type.getAsset(info.color))
        this.setDepth(5)
        this.setOrigin(0.5)
        this.scene.add.existing(this)
        this.setInteractive()
        this.scene.input.setDraggable(this)

        const self = this
        this.on("dragstart", function (pointer) {
            dragCallback.onDragStart(info.coordinate)
        })

        this.on("drag", function (pointer, dragX: number, dragY: number) {
            self.x = dragX
            self.y = dragY
        })

        this.on("dragend", function (pointer) {
            const gameSize = self.scene.cameras.main.width
            const squareSize = gameSize / 8
            const dropX = self.x.coerceIn(0, 1000)
            const dropY = self.y.coerceIn(0, 1000)

            let letter: number
            let number: number
            if (self.drawConfig.flipped) {
                letter = LetterCoordinate.H - Math.floor(dropX / squareSize)
                number = Math.floor(dropY / squareSize)
            } else {
                letter = Math.floor(dropX / squareSize)
                number = NumberCoordinate.EIGHT - Math.floor(dropY / squareSize)
            }
            const coordinate = new Coordinate(letter, number)

            self.refresh()
            if (!self.info.coordinate.equals(coordinate)) {
                dragCallback.onDragEnd(coordinate)
            }
        })

        this.refresh()
    }

    setDraggable(draggable: boolean) {
        if (draggable)
            this.setInteractive().setDepth(6)
        else
            this.disableInteractive().setDepth(5)
    }

    refresh(drawConfig: DrawConfig = this.drawConfig) {
        this.drawConfig = drawConfig
        const gameSize = this.scene.cameras.main.width
        const squareSize = gameSize / 8

        if (drawConfig.flipped) {
            this.setX(gameSize - (this.info.coordinate.letter + 1) * squareSize + squareSize / 2)
            this.setY(this.info.coordinate.number * squareSize + squareSize / 2)
        } else {
            this.setX(this.info.coordinate.letter * squareSize + squareSize / 2)
            this.setY(gameSize - (this.info.coordinate.number + 1) * squareSize + squareSize / 2)
        }
    }

    updateCoordinate(newCoordinate: Coordinate) {
        this.info.coordinate = newCoordinate
        this.refresh()
    }
}
