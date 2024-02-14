import { Play } from "./play"

export interface PlayRepository {
    findByUserAndGame(userId: string, gameId: number): Promise<Play>
    findByUser(userId: string): Promise<Play[]>
    addPlay(attempts: string, gameId: number, userId: string): Promise<Play>
}