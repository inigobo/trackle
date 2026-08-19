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

    if (error instanceof Error && error.message === 'Invalid game URL') {
      return res.status(400).json({
        play: undefined,
        message: 'El enlace no es válido. Copia el link completo que aparece al terminar la partida.'
      })
    }

    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return res.status(409).json({
        play: undefined,
        message: 'Ya has registrado esta partida'
      })
    }

    res.status(500).json({
      play: undefined,
      message: 'Ha ocurrido un error inesperado'
    })
  }
}
