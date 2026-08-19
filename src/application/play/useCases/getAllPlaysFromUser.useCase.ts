import { PlayRepository } from "@/src/domain/play"
import { PlayWithBoard } from "@/src/application/play"
import { BoardGenerator } from "../../../services/generateBoard"
import { GameRepository } from "@/src/domain/game"


export class GetAllPlaysFromUserUseCase {
    constructor(
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
        private boardGenerator: BoardGenerator,
    ) { }

    async run(userId: string): Promise<PlayWithBoard[]> {
        const plays = await this.playRepository.findByUser(userId)
        const playsWithBoard = Promise.all(plays.map(async (play) => {
            const game = await this.gameRepository.findById(play.gameId)
            const board = this.boardGenerator.paintBoard(play.attempts, game.solution, 6)

            return {
                gameId: game.id,
                username: play.username,
                board,
            }
        }))

        return playsWithBoard

    }

}
