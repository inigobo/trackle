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

        })

        return profiles.map((prismaProfile) => {
            return { // Necesito pasar el UUID? Username es unique
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

        return { // Necesito pasar el UUID? Username es unique
            id: prismaProfile.id,
            username: prismaProfile.username,
            avatarSeed: prismaProfile.avatar_seed,
            fullName: prismaProfile.fullname
        }
    }

    findById(userId: string): Promise<Profile> {
        throw new Error("Method not implemented.");
    }

} 