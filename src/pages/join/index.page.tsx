import { createClient } from '@/utils/supabase/serverProps'
import { User } from '@supabase/supabase-js'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: data.user,
    },
  }
}

export default function JoinPage({ user }: { user: User }) {
  const router = useRouter()

  const groupId = router.query.g

  const handleJoin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `/api/group/join?u=${user.id}&g=${groupId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      router.push('/')
    } catch (error) {
      console.error('Error creating game:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <div>
      <h3>Unirse al grupo</h3>
      <p>
        Has llegado aquí a través de un link de invitación. Confirma que quieres
        unirte a este grupo.
      </p>

      <Button onClick={handleJoin}>Unirse</Button>
    </div>
  )
}
