import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Stack } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import { UsernameContainerStyles } from './LoginCard.styles'

type LoginCardProps = {
  user: User
}

export const LoginCard = ({ user }: LoginCardProps) => {
  const router = useRouter()
  const supabase = createClient()

  const handleClickUser = async () => {
    router.push(`/profile/${user.user_metadata.username}`)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return user ? (
    <Card>
      <Stack onClick={handleClickUser} direction="horizontal">
        <Avatar seed={user?.user_metadata.avatar_seed} variant="small"></Avatar>
        <UsernameContainer>{user?.user_metadata.fullname}</UsernameContainer>
      </Stack>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </Card>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Iniciar sesión
    </Link>
  )
}

const UsernameContainer = styled('div', UsernameContainerStyles)
