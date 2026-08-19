import { PlayStats } from '@/src/services/statsCalculator'
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
  stats: PlayStats
}

export const ProfileInfo = ({ currentUser, stats }: ProfileProps) => {
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
          <InfoContainer description="racha" value={stats.currentStreak} />
          <InfoContainer description="partidas" value={stats.gamesPlayed} />
          <InfoContainer
            description="victorias"
            value={`${stats.winPercentage}%`}
          />
          <InfoContainer
            description="media intentos"
            value={stats.averageAttempts}
          />
        </Stack>
      </Row>
    </Col>
  )
}

export default ProfileInfo

const UsernameContainer = styled('div', UsernameStyle)
const NameContainer = styled('div', NameStyle)
