import { Profile } from "../profile"

export type Group = {
    id: string
    name: string
    avatarSeed: string
    members: Profile[]
}
