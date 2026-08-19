import { Profile } from '@/src/application/profile'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import { TitleContainerStyle, UserCardStyle } from './UserCard.styles'

type UserCardProps = {
  profile: Profile
  position?: number
  score?: number
  wins?: number
  gamesPlayed?: number
}

export const UserCard = ({
  profile,
  position,
  score,
  wins,
  gamesPlayed,
}: UserCardProps) => {
  const router = useRouter()

  const handleSelectCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    router.push(`/profile/${profile.username}`)
  }

  return (
    <Container onClick={handleSelectCard}>
      <CardLayout>
        {position !== undefined && <PositionContainer>#{position}</PositionContainer>}
        <Avatar seed={profile.avatarSeed} variant="medium" />
        <div>
          <TitleContainer>{profile.username}</TitleContainer>
          {score !== undefined && (
            <StatsContainer>
              {`${score} pts · ${wins} victorias · ${gamesPlayed} partidas`}
            </StatsContainer>
          )}
        </div>
      </CardLayout>
    </Container>
  )
}

const CardLayout = styled(Container, UserCardStyle)
const TitleContainer = styled('div', TitleContainerStyle)
const PositionContainer = styled('span', { fontWeight: 'bold', marginRight: '0.5rem' })
const StatsContainer = styled('div', { fontSize: '0.85rem', color: '#666' })
