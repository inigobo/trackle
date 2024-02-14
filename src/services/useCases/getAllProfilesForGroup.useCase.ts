import { Profile, ProfileRepository } from "@/src/domain/profile"


export class GetAllProfilesForGroup {
    constructor(
        private profileRepository: ProfileRepository,
    ) { }

    async run(groupId: string): Promise<Profile[]> {
        return this.profileRepository.findByGroup(groupId)

    }

}