import type { PrismaClient } from '@prisma/client'
import { PrismaConnection } from './PrismaConnection'

export abstract class PrismaRepository {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = PrismaConnection.getClient()
  }

  protected getClient(): PrismaClient {
    return this.prismaClient
  }
}
