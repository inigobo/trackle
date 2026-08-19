
export enum LetterState {
    Empty,
    Missing,
    Present,
    Correct
}

export type PaintedLetter = {
    letter: string,
    state: LetterState
}

export type PaintedWord = PaintedLetter[]

export type Board = PaintedWord[]
