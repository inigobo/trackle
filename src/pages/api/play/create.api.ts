import applicationServicesMap from '@/src/config/applicationServicesMap'
import { Play } from '@/src/application/play';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  play: Play | undefined,
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { playUrl, userId } = req.body

  try {
    const play = await applicationServicesMap
      .registerPlayedGameUseCase()
      .run(playUrl, userId)

    res.status(201).json({
      play,
      message: 'Play registered succesfully'
    })

  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({
      play: undefined,
      message: 'An error occurred'
    })
  }
}
