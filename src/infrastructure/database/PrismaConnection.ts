import { PrismaClient } from '@prisma/client'

export class PrismaConnection {
    static client?: PrismaClient

    static getClient() {
        if (!this.client) {
            const prisma = new PrismaClient({
                log: [
                    {
                        emit: 'event',
                        level: 'query',
                    },
                    {
                        emit: 'event',
                        level: 'error',
                    },
                    {
                        emit: 'event',
                        level: 'info',
                    },
                    {
                        emit: 'event',
                        level: 'warn',
                    },
                ],
            })

            this.client = prisma
        }

        return this.client
    }
}
