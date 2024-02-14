import { LetterState, PaintedLetter } from '@/src/domain/board/board'
import { styled } from '@stitches/react'
import { LetterTileLayoutStyles } from './LetterTile.styles'

type PaintMapType = Record<LetterState, string>

export const LetterTile = ({ letter, state }: PaintedLetter) => {
  const paintMap: PaintMapType = {
    0: 'e',
    1: 'm',
    2: 'p',
    3: 'c',
  }

  const paint = paintMap[state] as string

  return <LetterTileLayout paint={paint}>{letter}</LetterTileLayout>
}

const LetterTileLayout = styled('div', LetterTileLayoutStyles)
