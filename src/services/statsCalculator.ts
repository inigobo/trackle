export type PlayForStats = {
    gameId: number
    attempts: string[]
    solution: string
}

export type PlayStats = {
    gamesPlayed: number
    wins: number
    winPercentage: number
    averageAttempts: number
    currentStreak: number
    maxStreak: number
}

export class StatsCalculator {

    calculate(plays: PlayForStats[]): PlayStats {
        const gamesPlayed = plays.length

        if (gamesPlayed === 0) {
            return {
                gamesPlayed: 0,
                wins: 0,
                winPercentage: 0,
                averageAttempts: 0,
                currentStreak: 0,
                maxStreak: 0,
            }
        }

        const wins = plays.filter(play => this.isWin(play)).length
        const totalAttempts = plays.reduce((sum, play) => sum + play.attempts.length, 0)
        const sortedGameIds = [...new Set(plays.map(play => play.gameId))].sort((a, b) => a - b)
        const { currentStreak, maxStreak } = this.calculateStreaks(sortedGameIds)

        return {
            gamesPlayed,
            wins,
            winPercentage: Math.round((wins / gamesPlayed) * 100),
            averageAttempts: Math.round((totalAttempts / gamesPlayed) * 100) / 100,
            currentStreak,
            maxStreak,
        }
    }

    isWin(play: PlayForStats): boolean {
        const lastAttempt = play.attempts[play.attempts.length - 1]
        return !!lastAttempt && lastAttempt.toLowerCase() === play.solution.toLowerCase()
    }

    // Streaks count consecutive day numbers played (game ids are sequential days)
    private calculateStreaks(sortedGameIds: number[]): { currentStreak: number, maxStreak: number } {
        let streak = 1
        let maxStreak = 1

        for (let i = 1; i < sortedGameIds.length; i++) {
            streak = sortedGameIds[i] === sortedGameIds[i - 1] + 1 ? streak + 1 : 1
            maxStreak = Math.max(maxStreak, streak)
        }

        return { currentStreak: streak, maxStreak }
    }
}
