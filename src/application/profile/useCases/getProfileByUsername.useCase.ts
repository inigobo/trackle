import { Profile, ProfileRepository } from "@/src/domain/profile"


export class GetProfileByUsernameUseCase {
    constructor(
        private profileRepository: ProfileRepository,
    ) { }

    async run(username: string): Promise<Profile> {
        return this.profileRepository.findByUsername(username)

    }

}
