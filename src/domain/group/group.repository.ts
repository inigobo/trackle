import { Group } from "./group"

export interface GroupRepository {
    createGroup(name: string, creatorUserId: string, avatarSeed: string): Promise<Group>
    addUser(groupId: string, userId: string): Promise<void>
    findByUser(userId: string): Promise<Group[]>
    findByName(groupName: string): Promise<Group>
    getAll(): Promise<Group[]>
}
