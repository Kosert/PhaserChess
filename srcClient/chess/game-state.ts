import { Color } from "./color"

export enum GameState {
    BEFORE_GAME,
    WHITE_TO_MOVE,
    BLACK_TO_MOVE,
    GAME_FINISHED
}

export namespace GameState {
    export function values(): GameState[] {
        return [
            GameState.BEFORE_GAME,
            GameState.WHITE_TO_MOVE,
            GameState.BLACK_TO_MOVE,
            GameState.GAME_FINISHED
        ]
    }

    export function getColorToMove(state: GameState): Color {
        switch (state) {
            case GameState.BEFORE_GAME:
            case GameState.WHITE_TO_MOVE:
                return Color.WHITE
            case GameState.BLACK_TO_MOVE:
                return Color.BLACK
            case GameState.GAME_FINISHED:
                return null
        }
    }
}
