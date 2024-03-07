import { styled } from '@stitches/react'
import { WordRowStyles } from './WordRow.styles'

export const WordRow = ({ children }: { children: React.ReactNode }) => {
  return <WordRowLayout>{children}</WordRowLayout>
}

const WordRowLayout = styled('div', WordRowStyles)
