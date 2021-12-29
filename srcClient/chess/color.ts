export enum Color {
    WHITE = "white",
    BLACK = "black"
}

export namespace Color {

    export function inverted(color: Color): Color {
        if (color == Color.WHITE)
            return Color.BLACK
        else
            return Color.WHITE
    }
}