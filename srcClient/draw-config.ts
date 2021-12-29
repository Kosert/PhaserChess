export class DrawConfig {

    constructor(
        readonly blackColor: number,
        readonly whiteColor: number,
        readonly flipped: boolean,
        readonly showCoordinates: boolean
    ) {

    }

    static default(): DrawConfig {
        return new DrawConfig(0x665d3a, 0xcfc174, false, true)
    }
}