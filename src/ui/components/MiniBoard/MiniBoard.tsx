import { Board } from '@/src/domain/board'
import { Stack } from 'react-bootstrap'

type EmojiMapType = Record<number, string>

export const MiniBoard = ({ board }: { board: Board }) => {
  const emojiMap: EmojiMapType = {
    0: '⬜',
    1: '⬛️',
    2: '🟨',
    3: '🟩',
  }

  return (
    <Stack gap={2}>
      {board.map(word => {
        return (
          <Stack style={{ height: '10px' }} direction="horizontal" gap={2}>
            {word.map(({ state }) => {
              return (
                <div
                  style={{
                    width: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {emojiMap[state]}
                </div>
              )
            })}
          </Stack>
        )
      })}
    </Stack>
  )
}
