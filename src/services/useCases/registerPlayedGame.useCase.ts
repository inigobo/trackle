import { PlayRepository } from "@/src/domain/play"
import { PlayDecoder } from "../playDecoder"
import { GameRepository } from "@/src/domain/game"
import Error from "next/error"

export class RegisterPlayedGameUseCase {
    constructor(
        private playDecoder: PlayDecoder,
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
    ) { }

    async run(url: string, userId: string) {
        console.log('usecase', url)
        const submittedSolution = this.playDecoder.decodeSolution(url)
        const submittedAttempts = this.playDecoder.decodeAttempts(url)
        console.log('submittedSolution', submittedSolution)
        console.log('submittedAttempts', submittedAttempts)

        if (!submittedSolution) {
            throw Error
        }

        const game = await this.gameRepository.findByWord(submittedSolution)

        console.log(game)

        if (!submittedAttempts) {
            throw Error
        }

        return await this.playRepository.addPlay(submittedAttempts, game.id, userId)



    }

}