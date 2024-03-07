import { Board } from "../domain/board"
import { LetterState, PaintedWord } from "../domain/board/board"


export class BoardGenerator {

    paintBoard(attempts: string[], solution: string, maxAttempts: number): Board {
        const rows = attempts.map(attempt => this.paintRow(attempt, solution))
        while (rows.length < maxAttempts) {
            rows.push(Array(5).fill({ letter: "", state: LetterState.Empty }))
        }
        return rows 
    }

    private paintRow(attemptString: string, solutionString: string): PaintedWord {
        attemptString = attemptString.toLowerCase()
        solutionString = solutionString.toLowerCase()

        const solution = solutionString.split("").map((letter) => ({ letter, count: 0 }))

        const paintedWord: PaintedWord = attemptString.split("").map((letter, i) => {
            const solutionLetter = solution[i]
            if (solutionLetter.letter === letter) {
                solutionLetter.count++
                return { letter, state: LetterState.Correct }
            } else {
                solutionLetter.count = -1 // Mark as checked for correct position
            }
            return { letter, state: LetterState.Missing } // Default state
        })

        for (let i = 0; i < paintedWord.length; i++) {
            if (paintedWord[i].state !== LetterState.Correct) {
                const solutionLetter = solution.find((letter) => letter.letter === paintedWord[i].letter && letter.count === -1)
                if (solutionLetter) {
                    solutionLetter.count++
                    paintedWord[i].state = LetterState.Present
                }
            }
        }

        return paintedWord
    }

}
