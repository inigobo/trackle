import { Game, GameRepository } from "@/src/domain/game"
import { PrismaRepository } from "../database/PrismaRepository"

export class GamePrismaRepository extends PrismaRepository implements GameRepository {

    private repository

    constructor() {
        super()
        this.repository = this.getClient().game
    }

    async findBySolution(solution: string): Promise<Game | null> {
        const prismaGame = await this.repository.findFirst({
            where: {
                solution,
            }
        })

        return prismaGame
            ? { id: prismaGame.id, solution: prismaGame.solution }
            : null
    }

    async create(solution: string): Promise<Game> {
        const { _max } = await this.repository.aggregate({ _max: { id: true } })

        try {
            const prismaGame = await this.repository.create({
                data: {
                    id: (_max.id ?? 0) + 1,
                    solution,
                }
            })

            return { id: prismaGame.id, solution: prismaGame.solution }
        } catch {
            // A concurrent registration created the same game first
            const existing = await this.findBySolution(solution)
            if (existing) return existing
            throw new Error(`Could not create game for solution ${solution}`)
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
