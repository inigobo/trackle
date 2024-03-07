import { PlayWithBoard } from '@/src/application/play'
import { styled } from '@stitches/react'
import { Dispatch, SetStateAction } from 'react'
import { Card, Row } from 'react-bootstrap'
import { MiniBoard } from '../MiniBoard'
import { GameCollectionLayoutStyles } from './PlayCollection.styles'

export const PlayCollection = ({
  playCollection,
  setShowGameId,
}: {
  playCollection: PlayWithBoard[]
  showGameId: number
  setShowGameId: Dispatch<SetStateAction<number>>
}) => {
  return (
    <Row
      style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        flexWrap: 'nowrap',
        gap: '4px',
      }}>
      {playCollection.map(play => (
        <BoardLayout
          key={play.gameId}
          onClick={() => {
            return setShowGameId(play.gameId)
          }}>
          <Card.Header>{`#${play.gameId}`}</Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <MiniBoard board={play.board} />
          </Card.Body>
        </BoardLayout>
      ))}
    </Row>
  )
}

const BoardLayout = styled(Card, GameCollectionLayoutStyles)
