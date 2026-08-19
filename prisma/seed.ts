import { Game, Play, PrismaClient, Profile } from '@prisma/client'
import profiles from './seedData/profiles'
import plays from './seedData/plays'
import games from './seedData/games'

const prisma = new PrismaClient()

async function main() {
    // await seedProfiles(profiles)
    await processPromisesBatch(games, 100, insertGame)
    // await processPromisesBatch(plays, 10, insertPlay)
}

async function insertPlay(play: Play) {
    return prisma.play.create({
        data: {
            game_id: play.game_id,
            profile_id: play.profile_id,
            attempts: play.attempts,
        },
    })
}

async function insertGame(game: Game) {
    return await prisma.game.create({
        data: {
            id: game.id,
            solution: game.solution,
        },
    })
}


async function seedProfiles(profiles: Profile[]) {
    console.log('Seeding profiles')

    return Promise.all(
        profiles.map(async (profile) => {
            return prisma.profile.upsert({
                where: { id: profile.id },
                update: {},
                create: {
                    id: profile.id,
                    username: profile.username,
                    fullname: profile.fullname,
                    avatar_seed: profile.avatar_seed,
                },
            })
        })
    )
}

export async function processPromisesBatch(
    items: Array<any>,
    limit: number,
    fn: (item: any) => Promise<any>,
): Promise<any[]> {
    let results: any[] = [];
    console.log('Batch seeding: ', fn.name, items.length)
    for (let start = 0; start < items.length; start += limit) {
        const end = start + limit > items.length ? items.length : start + limit;

        const slicedResults = await Promise.all(items.slice(start, end).map(fn));
        console.log(`Progress: ${results.length}/${items.length}`)

        results = [
            ...results,
            ...slicedResults,
        ]
    }

    return results;
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
