import { GameRepository } from "@/src/domain/game"
import { Play } from "@/src/domain/play"
import { BoardGenerator } from "../generateBoard"
import { Board } from "@/src/domain/board"


export class GenerateBoardsUseCase {
    constructor(
        private boardGenerator: BoardGenerator,
        private gameRepository: GameRepository,
    ) { }

    async run(plays: Play[]): Promise<Board[]> {
        const boards = Promise.all(plays.map(async (play) => {
            const game = await this.gameRepository.findById(play.gameId)
            return this.boardGenerator.paintBoard(play.attempts, game.solution, 6)
        }))

        return boards
    }

}