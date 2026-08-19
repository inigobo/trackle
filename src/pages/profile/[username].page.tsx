import { PlayWithBoard } from '@/src/application/play'
import applicationServicesMap from '@/src/config/applicationServicesMap'
import { AddBoardModal } from '@/src/ui/components/AddBoardModal'
import { Board } from '@/src/ui/components/Board'
import { PlayCollection } from '@/src/ui/components/PlayCollection/PlayCollection'
import { ProfileInfo } from '@/src/ui/components/ProfileInfo'
import { createClient } from '@/utils/supabase/serverProps'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data } = await supabase.auth.getUser()

  const profile = await applicationServicesMap
    .getProfileByUsername()
    .run(context.params!.username as string)

  const plays = await applicationServicesMap
    .getAllPlaysFromUser()
    .run(profile.id)

  const stats = await applicationServicesMap.getProfileStats().run(profile.id)

  return { props: { plays, profile, user: data.user, stats } }
}

export default function ProfileDetailPage({
  plays,
  profile,
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const latestGameId = plays.length
    ? Math.max(...plays.map(play => play.gameId))
    : 0
  const [showGameId, setShowGameId] = useState<number>(latestGameId)
  const [bigPlay, setBigPlay] = useState<PlayWithBoard | null>(null)

  useEffect(() => {
    setBigPlay(plays.filter(play => play.gameId === showGameId).pop() ?? null)
  }, [showGameId, plays])

  if (!plays || plays.length === 0) {
    return (
      <Container>
        <Row>Vaya, no has añadido ninguna partida</Row>
        <Row>
          <AddBoardModal userId={profile.id} />
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Row>
        <ProfileInfo currentUser={{ ...profile }} stats={stats} />
        <Col>
          {bigPlay ? (
            <>
              <strong>Juego #{bigPlay.gameId}</strong>
              <Board board={bigPlay.board} />
            </>
          ) : (
            <p>No has jugado aún</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayCollection
            playCollection={plays}
            showGameId={showGameId}
            setShowGameId={setShowGameId}
          />
        </Col>
      </Row>
    </>
  )
}
