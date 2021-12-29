import { Coordinate } from "../coordinate"
import { DrawConfig } from "../draw-config"

export class SquareObject {
    private square: Phaser.GameObjects.Rectangle
    private squareOverlay: Phaser.GameObjects.Rectangle
    private moveIndicator: Phaser.GameObjects.Arc
    private text: Phaser.GameObjects.Text

    isSelected: boolean = false
    showMoveIndicator: boolean = false
        
    constructor(
        private readonly scene: Phaser.Scene,
        readonly coordinate: Coordinate,
        private drawConfig: DrawConfig,
        onClicked: (square: SquareObject) => void
    ) {
        const gameSize = this.scene.cameras.main.width
        const squareSize = gameSize / 8

        this.square = scene.add.rectangle(0, 0, squareSize, squareSize)
            .setDepth(0)
            .setInteractive()
            .on("pointerdown", () => onClicked.call(scene, this))

        this.squareOverlay = scene.add.rectangle(0, 0, squareSize, squareSize, 0x00ff00, 0.35)
            .setDepth(1)
            .setVisible(false)

        this.moveIndicator = scene.add.circle(0, 0, squareSize / 6, 0x00ff00, 0.35)
            .setDepth(10)
            .setVisible(false)

        this.text = scene.add.text(0, 0, coordinate.toString(), {
            fontSize: "24px",
            color: "#f00",
            fontStyle: "bold",
        }).setDepth(2)

        this.refresh()
    }

    refresh(drawConfig: DrawConfig = this.drawConfig) {
        this.drawConfig = drawConfig
        const gameSize = this.scene.cameras.main.width
        const squareSize = gameSize / 8

        let x: number, y: number
        if (drawConfig.flipped) {
            x = gameSize - (this.coordinate.letter + 1) * squareSize
            y = this.coordinate.number * squareSize
        } else {
            x = this.coordinate.letter * squareSize
            y = gameSize - (this.coordinate.number + 1) * squareSize
        }
        this.square.x = x + squareSize / 2
        this.square.y = y + squareSize / 2    
        this.squareOverlay.x = this.square.x
        this.squareOverlay.y = this.square.y
        this.moveIndicator.x = this.square.x
        this.moveIndicator.y = this.square.y
        this.text.x = x
        this.text.y = y

        const color = (this.coordinate.letter + this.coordinate.number) % 2 == 0 ? drawConfig.blackColor : drawConfig.whiteColor
        this.square.setFillStyle(color)
        this.text.setVisible(drawConfig.showCoordinates)
        this.squareOverlay.setVisible(this.isSelected)
        this.moveIndicator.setVisible(this.showMoveIndicator)
    }

    destroy() {
        this.square.destroy()
        this.text.destroy()
    }
}
