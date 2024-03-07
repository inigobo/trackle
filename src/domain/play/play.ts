import { Board } from "../board"

export type Play = {
    gameId: number
    username: string
    attempts: string[]
}

export type PlayWithBoard = Omit<Play, 'attempts'> & { board: Board }
