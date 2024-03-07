import { Game } from "./game"

export interface GameRepository {
    findById(gameId: number): Promise<Game>
    findByWord(word: string): Promise<Game>
}
