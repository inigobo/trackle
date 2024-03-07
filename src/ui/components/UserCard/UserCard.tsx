import { Profile } from '@/src/application/profile'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import { TitleContainerStyle, UserCardStyle } from './UserCard.styles'

type UserCardProps = {
  profile: Profile
}

export const UserCard = ({ profile }: UserCardProps) => {
  const router = useRouter()

  const handleSelectCard = (event: React.MouseEvent<HTMLDivElement>) => {
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
