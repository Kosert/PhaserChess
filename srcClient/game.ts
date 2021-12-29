import "phaser"
import { MainScene } from "./main-scene"

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    width: 1000,
    height: 1000,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_VERTICALLY
    },
    zoom: 1,
    fps: { target: 30 },
    type: Phaser.AUTO,
    parent: "game",
    render: { pixelArt: false, antialias: true },
    scene: MainScene,
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    }
}

// game class
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config)
    // game.canvas.classList.add("constraintedCanvas")

    // brzydki hax na złe coordy myszki
    // setTimeout(function() {
    //     document.body.style.height = "auto"
    //     setTimeout(function() {
    //         document.body.style.height = "100%"
    //     }, 1000)
    // }, 2000)
})

// document.addEventListener("fullscreenchange", (event) => {
//     if (document.fullscreenElement) {
//         document.getElementsByTagName("canvas")[0].classList.remove("constraintedCanvas")
//     } else {
//         document.getElementsByTagName("canvas")[0].classList.add("constraintedCanvas")
//     }
// })

window.initPrefs = function(type: string, defaultValue: string) {
    const current = localStorage.getItem(type)
    if (current != null) return current
    localStorage.setItem(type, defaultValue)
    return defaultValue
}
