import { styled } from '@stitches/react'
import { Col, Row, Stack } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import { InfoContainer } from './InfoContainer'
import { NameStyle, UsernameStyle } from './ProfileInfo.styles'

export type ProfileProps = {
  currentUser: {
    avatarSeed: string
    fullName: string
    username: string
  }
}

// type ProfileStats = {
//   streak: number
//   maxStreak: number
//   winPercentage: number
//   gamesPlayed: number
// }

export const ProfileInfo = ({ currentUser }: ProfileProps) => {
  return (
    <Col>
      <Row>
        <Col>
          <Avatar seed={currentUser.avatarSeed} variant={'medium'} />
        </Col>
        <Col>
          <NameContainer>{currentUser.fullName}</NameContainer>
          <UsernameContainer>{currentUser.username}</UsernameContainer>
        </Col>
      </Row>
      <Row>
        <Stack direction="horizontal">
          <InfoContainer description="streak" value={8} />
          <InfoContainer description="games" value={120} />
        </Stack>
      </Row>
    </Col>
  )
}

export default ProfileInfo

const UsernameContainer = styled('div', UsernameStyle)
const NameContainer = styled('div', NameStyle)
