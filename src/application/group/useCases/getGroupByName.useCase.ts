import { Group, GroupRepository } from "@/src/domain/group"

export class GetGroupByNameUseCase {
    constructor(
        private groupRepository: GroupRepository,
    ) { }

    async run(groupName: string): Promise<Group> {
        return this.groupRepository.findByName(groupName)

    }

}
