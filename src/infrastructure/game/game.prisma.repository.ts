import { Game, GameRepository } from "@/src/domain/game"
import { PrismaRepository } from "../database/PrismaRepository"

export class GamePrismaRepository extends PrismaRepository implements GameRepository {

    private repository

    constructor() {
        super()
        this.repository = this.getClient().game
    }

    async findByWord(word: string): Promise<Game> {
        const prismaGame = await this.repository.findFirst({
            where: {
                solution: word,
            }
        })

        if (!prismaGame) {
            throw Error
        }

        return {
            id: prismaGame.id,
            solution: prismaGame.solution
        }
    }



    async findById(gameId: number): Promise<Game> {
        const prismaGame = await this.repository.findFirstOrThrow({
            where: {
                id: gameId,
            }
        })

        return {
            id: prismaGame.id,
            solution: prismaGame.solution
        }
    }


} 