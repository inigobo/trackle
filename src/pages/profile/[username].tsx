import applicationServicesMap from '@/src/config/applicationServicesMap'
import { PlayWithBoard } from '@/src/domain/playWithBoard'
import { Profile } from '@/src/domain/profile'
import { AddBoardModal } from '@/src/ui/components/AddBoardModal'
import { Board } from '@/src/ui/components/Board'
import { PlayCollection } from '@/src/ui/components/GameCollection/GameCollection'
import { ProfileInfo } from '@/src/ui/components/ProfileInfo'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Col, Container, Row } from 'react-bootstrap'

export const getStaticPaths = (async () => {
  const profiles = await applicationServicesMap
    .getAllProfilesForGroup()
    .run('dont care')

  const paths = profiles.map(profile => ({
    params: { username: profile.username },
  }))

  return {
    paths,
    fallback: false,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  const username = params!.username

  const profile = await applicationServicesMap
    .getProfileByUsername()
    .run(username)

  const plays = await applicationServicesMap
    .getAllPlaysFromUser()
    .run(profile.id)

  return { props: { plays, profile } }
}) satisfies GetStaticProps<{
  plays: PlayWithBoard[]
  profile: Profile
}>

export default function ProfileDetail({
  plays,
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!plays || plays.length === 0) {
    return (
      <Container>
        <Row>Oops! You haven't played any game.</Row>
        <Row>
          <AddBoardModal />
        </Row>
      </Container>
    )
  }

  const bigPlay = plays[0]

  return (
    <>
      <Row>
        <ProfileInfo currentUser={{ ...profile }} />
        <Col>
          <p>Game #{bigPlay.gameId}</p>
          <Board board={bigPlay.board} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayCollection playCollection={plays} />
        </Col>
      </Row>
    </>
  )
}
