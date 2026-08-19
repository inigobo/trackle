import applicationServicesMap from '@/src/config/applicationServicesMap'
import type { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error'


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const groupId = req.query.g as string
  const userId = req.query.u as string

  try {
    if (!groupId || !userId) {
      throw Error
    }

    await applicationServicesMap
      .addUserToGroupUseCase()
      .run(groupId, userId)

    res.status(201).json({
      message: 'User added to group succesfully'
    })

  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({
      message: 'An error occurred'
    })
  }
}
