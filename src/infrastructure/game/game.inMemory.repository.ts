import { Game, GameRepository } from "@/src/domain/game"
import games from "@/prisma/seedData/games"

export class GameInMemoryRepository implements GameRepository {

    private games: Game[] = games.map(game => {
        return {
            id: game.id,
            solution: game.solution
        }
    })

    async findBySolution(solution: string): Promise<Game | null> {
        return this.games.find(game => game.solution === solution) ?? null
    }

    async create(solution: string): Promise<Game> {
        const game: Game = {
            id: Math.max(0, ...this.games.map(g => g.id)) + 1,
            solution,
        }
        this.games.push(game)
        return game
    }

    async findById(gameId: number): Promise<Game> {
        return this.games.find(game => game.id === gameId)!
    }


} 
