import { Play, PlayRepository } from "@/src/domain/play";
import { PrismaRepository } from "../database/PrismaRepository";

export class PlayPrismaRepository extends PrismaRepository implements PlayRepository {

    private repository

    constructor() {
        super()
        this.repository = this.getClient().play
    }

    //TODO: use dto. Las entidades de dominio son clases?
    async addPlay(attempts: string, gameId: number, userId: string): Promise<Play> {
        const play = await this.repository.create({
            data: {
                game_id: gameId,
                profile_id: userId,
                attempts,
            }
        })

        return {
            gameId: play.game_id,
            username: play.profile_id,
            attempts: play.attempts
                .replace(/'/g, "") // Remove all single quotes
                .replace(/\[|\]/g, "") // Remove square brackets
                .split(",") // Split by comma
                .filter((item) => item !== '') // Remove empty strings

        }
    }

    async findByUser(userId: string): Promise<Play[]> {
        const plays = await this.repository.findMany({
            where: {
                profile_id: userId
            }
        })

        return plays.map((prismaPlay) => {
            return {
                gameId: prismaPlay.game_id,
                username: prismaPlay.profile_id,
                attempts: prismaPlay.attempts
                    .replace(/'/g, "") // Remove all single quotes
                    .replace(/\[|\]/g, "") // Remove square brackets
                    .split(",") // Split by comma
                    .filter((item) => item !== '') // Remove empty strings

            }
        })
    }

    async findByUserAndGame(userId: string, gameId: number): Promise<Play> {
        const play = await this.repository.findUniqueOrThrow({
            where: {
                game_id_profile_id: {
                    game_id: gameId,
                    profile_id: userId
                }
            }
        })

        if (!play.attempts) {
            return {
                gameId: play.game_id,
                username: play.profile_id,
                attempts: []
            }
        }

        return {
            gameId: play.game_id,
            username: play.profile_id,
            attempts: play.attempts
                .replace(/'/g, "") // Remove all single quotes
                .replace(/\[|\]/g, "") // Remove square brackets
                .split(",") // Split by comma
                .filter(item => !item) // Remove empty strings


        }

    }
} 
