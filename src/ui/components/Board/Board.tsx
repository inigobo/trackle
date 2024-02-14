import { Board as BoardType } from '@/src/domain/board'
import { styled } from '@stitches/react'
import { BoardGridStyles, BoardLayoutStyles } from './Board.styles'
import { LetterTile } from './LetterTile'
import { WordRow } from './WordRow'

export const Board = ({ board }: { board: BoardType }) => {
  const playedToday = true
  return (
    <BoardLayout>
      <BoardGrid>
        {playedToday ? (
          board.map((row, index) => {
            return (
              <WordRow key={'row' + index}>
                {row.map(({ letter, state }, index) => {
                  return (
                    <LetterTile
                      letter={letter}
                      state={state}
                      key={'l' + index + letter}
                    />
                  )
                })}
              </WordRow>
            )
          })
        ) : (
          <>Haven't played today</>
        )}
      </BoardGrid>
    </BoardLayout>
  )
}

const BoardLayout = styled('div', BoardLayoutStyles)
const BoardGrid = styled('div', BoardGridStyles)
