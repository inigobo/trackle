import { Profile, ProfileRepository } from "@/src/domain/profile";
import { PrismaRepository } from "../database/PrismaRepository";

export class ProfilePrismaRepository extends PrismaRepository implements ProfileRepository {

    private repository

    constructor() {
        super()
        this.repository = this.getClient().profile
    }
    async findByGroup(groupId: string): Promise<Profile[]> {
        const profiles = await this.repository.findMany({
            where: {
                groups: {
                    some: {
                        group_id: groupId,
                    }
                }
            }

        })

        return profiles.map((prismaProfile) => {
            return {
                id: prismaProfile.id,
                username: prismaProfile.username,
                avatarSeed: prismaProfile.avatar_seed,
                fullName: prismaProfile.fullname
            }
        })
    }

    async findByUsername(username: string): Promise<Profile> {
        const prismaProfile = await this.repository.findFirstOrThrow({
            where: {
                username,
            }
        })

        return {
            id: prismaProfile.id,
            username: prismaProfile.username,
            avatarSeed: prismaProfile.avatar_seed,
            fullName: prismaProfile.fullname
        }
    }

} 
