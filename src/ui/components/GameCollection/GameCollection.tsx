import { PlayWithBoard } from '@/src/domain/playWithBoard'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { Card, Row } from 'react-bootstrap'
import { MiniBoard } from '../MiniBoard'
import { GameCollectionLayoutStyles } from './GameCollection.styles'

export const PlayCollection = ({
  playCollection,
}: {
  playCollection: PlayWithBoard[]
}) => {
  const router = useRouter()

  const handleClickBoard = event => {
    event.preventDefault()
    event.stopPropagation()
    router.push(`/profile/${play.gameId}`)
  }

  return (
    <Row style={{ overflowX: 'auto', overflowY: 'hidden', flexWrap: 'nowrap' }}>
      {playCollection.map(play => (
        <BoardLayout onClick={handleClickBoard}>
          <Card.Header>
            {`${play.gameId} ${play.board.length}/6`}
          </Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <MiniBoard board={play.board} />
          </Card.Body>
          {/* <Card.Footer>MAY/23 (LUN)</Card.Footer> */}
        </BoardLayout>
      ))}
    </Row>
  )
}

const BoardLayout = styled(Card, GameCollectionLayoutStyles)
