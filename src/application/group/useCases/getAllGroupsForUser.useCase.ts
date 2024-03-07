import { Group, GroupRepository } from "@/src/domain/group"


export class GetAllGroupsForUserUseCase {
    constructor(
        private groupRepository: GroupRepository,
    ) { }

    async run(userId: string): Promise<Group[]> {
        return this.groupRepository.findByUser(userId)

    }

}
