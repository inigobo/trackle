import { Profile } from '@/src/domain/profile'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import {
  StatsContainerStyle,
  TitleContainerStyle,
  UserCardStyle,
} from './UserCard.styles'

type UserCardProps = {
  profile: Profile
}

export const UserCard = ({ profile }: UserCardProps) => {
  const router = useRouter()

  const handleSelectCard = event => {
    event.preventDefault()
    event.stopPropagation()

    router.push(`/profile/${profile.username}`)
  }

  return (
    <Container onClick={handleSelectCard}>
      <CardLayout>
        <Avatar seed={profile.avatarSeed} variant="medium" />
        <TitleContainer>{profile.username}</TitleContainer>
      </CardLayout>
    </Container>
  )
}

const CardLayout = styled(Container, UserCardStyle)
const TitleContainer = styled('div', TitleContainerStyle)
const StatsContainer = styled('div', StatsContainerStyle)
