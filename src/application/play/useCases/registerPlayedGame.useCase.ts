import { PlayRepository } from "@/src/domain/play"
import { PlayDecoder } from "../../../services/playDecoder"
import { GameRepository } from "@/src/domain/game"

export class RegisterPlayedGameUseCase {
    constructor(
        private playDecoder: PlayDecoder,
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
    ) { }

    async run(url: string, userId: string) {
        const submittedSolution = this.playDecoder.decodeSolution(url)
        const submittedAttempts = this.playDecoder.decodeAttempts(url)

        if (!submittedSolution || !submittedAttempts) {
            throw new Error("Invalid game URL")
        }

        const game =
            await this.gameRepository.findBySolution(submittedSolution)
            ?? await this.gameRepository.create(submittedSolution)

        return await this.playRepository.addPlay(submittedAttempts, game.id, userId)
    }

}
