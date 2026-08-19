import { Board } from '@/src/application/board'

type EmojiMapType = Record<number, string>

export const MiniBoard = ({ board }: { board: Board }) => {
  const emojiMap: EmojiMapType = {
    0: '⬜',
    1: '⬛️',
    2: '🟨',
    3: '🟩',
  }

  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
        height: '10px',
        flexDirection: 'column',
      }}>
      {board.map((word, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              height: '10px',
              gap: 8,
            }}>
            {word.map(({ state }, index) => {
              return (
                <div
                  key={index}
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
          </div>
        )
      })}
    </div>
  )
}
