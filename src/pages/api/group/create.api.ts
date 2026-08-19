import applicationServicesMap from '@/src/config/applicationServicesMap'
import { Group } from '@/src/application/group'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  group: Group | undefined,
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { groupName, userId, avatarSeed } = req.body

  try {
    const group = await applicationServicesMap
      .createGroupUseCase()
      .run(groupName, userId, avatarSeed)

    res.status(201).json({
      group,
      message: 'Group created succesfully'
    })

  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({
      group: undefined,
      message: 'An error occurred'
    })
  }
}
