import { PlayRepository } from "@/src/domain/play"
import { PlayDecoder } from "../../../services/playDecoder"
import { GameRepository } from "@/src/domain/game"
import Error from "next/error"

export class RegisterPlayedGameUseCase {
    constructor(
        private playDecoder: PlayDecoder,
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
    ) { }

    async run(url: string, userId: string) {
        const submittedSolution = this.playDecoder.decodeSolution(url)
        const submittedAttempts = this.playDecoder.decodeAttempts(url)

        if (!submittedSolution) {
            throw Error
        }

        const game = await this.gameRepository.findByWord(submittedSolution)

        if (!submittedAttempts) {
            throw Error
        }

        return await this.playRepository.addPlay(submittedAttempts, game.id, userId)

    }

}
