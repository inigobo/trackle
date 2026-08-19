import { GameRepository } from "@/src/domain/game"
import { PlayRepository } from "@/src/domain/play"
import { PlayStats, StatsCalculator } from "../../../services/statsCalculator"

export class GetProfileStatsUseCase {
    constructor(
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
        private statsCalculator: StatsCalculator,
    ) { }

    async run(userId: string): Promise<PlayStats> {
        const plays = await this.playRepository.findByUser(userId)

        const playsWithSolutions = await Promise.all(plays.map(async (play) => {
            const game = await this.gameRepository.findById(play.gameId)
            return {
                gameId: play.gameId,
                attempts: play.attempts,
                solution: game.solution,
            }
        }))

        return this.statsCalculator.calculate(playsWithSolutions)
    }
}
