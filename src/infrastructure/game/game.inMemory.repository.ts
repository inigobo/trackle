import { Game, GameRepository } from "@/src/domain/game"
import games from "@/prisma/seedData/games"

export class GameInMemoryRepository implements GameRepository {

    private games: Game[] = games.map(game => {
        return {
            id: game.id,
            solution: game.solution
        }
    })

    async findByWord(word: string): Promise<Game> {
        return this.games.find(game => game.solution === word)!
    }

    async findById(gameId: number): Promise<Game> {
        return this.games.find(game => game.id === gameId)!
    }


} 
