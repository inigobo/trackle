import { Profile } from "./profile"

export interface ProfileRepository {
    findByUsername(username: string): Promise<Profile>
    findById(userId: string): Promise<Profile>
    findByGroup(groupId: string): Promise<Profile[]>
}