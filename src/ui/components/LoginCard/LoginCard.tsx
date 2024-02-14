import { createClient } from '@/utils/supabase/component'
import { styled } from '@stitches/react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Card, Stack } from 'react-bootstrap'
import { Avatar } from '../Avatar'
import { LoginCardStyles, UsernameContainerStyles } from './LoginCard.styles'

export const LoginCard = () => {
  const router = useRouter()
  const user = useUser()
  const supabase = createClient()

  const handleClickUser = async () => {
    router.push(`profile/${user?.user_metadata.username}`)
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
      <Button onClick={handleLogout}>Logout</Button>
    </Card>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  )
}

const CardLayout = styled('div', LoginCardStyles)
const UsernameContainer = styled('div', UsernameContainerStyles)
