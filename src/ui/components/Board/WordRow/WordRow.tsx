import { styled } from '@stitches/react'
import { WordRowStyles } from './WordRow.styles'

export const WordRow = ({ children }) => {
  return <WordRowLayout>{children}</WordRowLayout>
}

const WordRowLayout = styled('div', WordRowStyles)
