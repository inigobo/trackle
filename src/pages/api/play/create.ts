// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import applicationServicesMap from '@/src/config/applicationServicesMap'
import { Play } from '@/src/domain/play';
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
      .getRegisterPlayedGameUseCase()
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
