import { Group, GroupRepository } from "@/src/domain/group"


export class GetAllGroupsUseCase {
    constructor(
        private groupRepository: GroupRepository,
    ) { }

    async run(): Promise<Group[]> {
        return this.groupRepository.getAll()

    }

}
