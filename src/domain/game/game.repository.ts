import { Game } from "./game"

export interface GameRepository {
    findById(gameId: number): Promise<Game>
    findBySolution(solution: string): Promise<Game | null>
    create(solution: string): Promise<Game>
}
