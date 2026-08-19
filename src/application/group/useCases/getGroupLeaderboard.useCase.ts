import { GameRepository } from "@/src/domain/game"
import { GroupRepository } from "@/src/domain/group"
import { PlayRepository } from "@/src/domain/play"
import { Profile } from "@/src/domain/profile"
import { StatsCalculator } from "../../../services/statsCalculator"

export type LeaderboardEntry = {
    profile: Profile
    score: number
    wins: number
    gamesPlayed: number
}

// Win score: 6 points for a 1-attempt win down to 1 point for a 6-attempt win; 0 for a loss
const scoreForAttempts = (attemptsCount: number) => Math.max(0, 7 - attemptsCount)

export class GetGroupLeaderboardUseCase {
    constructor(
        private groupRepository: GroupRepository,
        private playRepository: PlayRepository,
        private gameRepository: GameRepository,
        private statsCalculator: StatsCalculator,
    ) { }

    async run(groupName: string): Promise<LeaderboardEntry[]> {
        const group = await this.groupRepository.findByName(groupName)

        const entries = await Promise.all(group.members.map(async (profile) => {
            const plays = await this.playRepository.findByUser(profile.id)

            let score = 0
            let wins = 0

            for (const play of plays) {
                const game = await this.gameRepository.findById(play.gameId)
                if (this.statsCalculator.isWin({ ...play, solution: game.solution })) {
                    wins++
                    score += scoreForAttempts(play.attempts.length)
                }
            }

            return { profile, score, wins, gamesPlayed: plays.length }
        }))

        return entries.sort((a, b) => b.score - a.score || b.wins - a.wins)
    }
}
