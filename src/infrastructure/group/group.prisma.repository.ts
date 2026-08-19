import { PrismaRepository } from "../database/PrismaRepository"
import { Group, GroupRepository } from "@/src/domain/group"
import { randomUUID } from "crypto"

export class GroupPrismaRepository extends PrismaRepository implements GroupRepository {

    private repository

    constructor() {
        super()
        this.repository = this.getClient().group
    }

    async getAll(): Promise<Group[]> {
        const groups = await this.repository.findMany({
            include: { members: { include: { profile: true } } },

        })

        return groups.map((prismaGroup) => {
            return {
                id: prismaGroup.id,
                name: prismaGroup.name,
                avatarSeed: prismaGroup.avatar_seed,
                members: prismaGroup.members.map((profile) => {
                    return {
                        id: profile.profile.id,
                        username: profile.profile.username,
                        avatarSeed: profile.profile.avatar_seed,
                        fullName: profile.profile.fullname
                    }

                })
            }
        })
    }

    async findByName(groupName: string): Promise<Group> {
        const prismaGroup = await this.repository.findUniqueOrThrow({
            where: {
                name: groupName,
            },
            include: { members: { include: { profile: true } } },

        })

        return {
            id: prismaGroup.id,
            name: prismaGroup.name,
            avatarSeed: prismaGroup.avatar_seed,
            members: prismaGroup.members.map((profile) => {
                return {
                    id: profile.profile.id,
                    username: profile.profile.username,
                    avatarSeed: profile.profile.avatar_seed,
                    fullName: profile.profile.fullname
                }

            })
        }

    }

    async findByUser(userId: string): Promise<Group[]> {
        const groups = await this.repository.findMany({
            where: {
                members: {
                    some: {
                        profile_id: userId,
                    }
                }
            },
            include: { members: { include: { profile: true } } },

        })

        return groups.map((prismaGroup) => {
            return {
                id: prismaGroup.id,
                name: prismaGroup.name,
                avatarSeed: prismaGroup.avatar_seed,
                members: prismaGroup.members.map((profile) => {
                    return {
                        id: profile.profile.id,
                        username: profile.profile.username,
                        avatarSeed: profile.profile.avatar_seed,
                        fullName: profile.profile.fullname
                    }

                })
            }
        })
    }

    async createGroup(name: string, creatorUserId: string, avatarSeed: string): Promise<Group> {
        const group = await this.repository.create({
            data: {
                id: randomUUID(),
                name,
                avatar_seed: avatarSeed,
                members: {
                    create: {
                        profile: {
                            connect: {
                                id: creatorUserId,
                            }
                        }
                    }
                }
            },
            include: { members: { include: { profile: true } } },
        })

        return {
            id: group.id,
            name: group.name,
            avatarSeed: group.avatar_seed,
            members: group.members.map((profile) => {
                return {
                    id: profile.profile.id,
                    username: profile.profile.username,
                    avatarSeed: profile.profile.avatar_seed,
                    fullName: profile.profile.fullname
                }

            })
        }
    }

    async addUser(groupId: string, userId: string): Promise<void> {
        await this.repository.update({
            where: {
                id: groupId,
            },
            data: {
                members: {
                    create: {
                        profile: {
                            connect: {
                                id: userId,
                            }
                        }
                    }
                }
            }
        })
    }

} 
