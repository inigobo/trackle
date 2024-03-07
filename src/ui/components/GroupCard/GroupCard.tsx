import { Group } from '@/src/application/group'
import { getGroupAvatarSGV } from '@/src/services/apiCalls'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { Container, Image } from 'react-bootstrap'
import { TitleContainerStyle, UserCardStyle } from './GroupCard.styles'

type GroupCardProps = {
  group: Group
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter()

  const handleSelectCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    router.push(`/leaderboard/${group.name}`)
  }

  return (
    <Container onClick={handleSelectCard}>
      <CardLayout>
        <Image
          src={getGroupAvatarSGV(group.avatarSeed)}
          alt={'Avatar'}
          rounded
          className="border border-secondary"
        />
        <TitleContainer>{group.name}</TitleContainer>
      </CardLayout>
    </Container>
  )
}

const CardLayout = styled(Container, UserCardStyle)
const TitleContainer = styled('div', TitleContainerStyle)
