import { Play, PlayRepository } from "@/src/domain/play"


export class GetPlayForUserAndDayUseCase {
    constructor(
        private playRepository: PlayRepository,
    ) { }

    async run(username: string, gameId: number): Promise<Play> {
        return this.playRepository.findByUserAndGame(username, gameId)

    }

}
