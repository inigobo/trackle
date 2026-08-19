import applicationServicesMap from '@/src/config/applicationServicesMap'
import { UserList } from '@/src/ui/components/UserList'
import { createClient } from '@/utils/supabase/serverProps'
import { styled } from '@stitches/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Button } from 'react-bootstrap'
import { LeaderboardStyles } from './Leaderboard.styles'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (!context.params || !context.params.groupName) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (typeof context.params.groupName !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const group = await applicationServicesMap
    .getGroupByName()
    .run(context.params.groupName)

  const entries = await applicationServicesMap
    .getGroupLeaderboard()
    .run(context.params.groupName)

  return { props: { entries, group, user: data.user } }
}

export default function LeaderboardPage({
  entries,
  group,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LeaderboardLayout>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/join?g=${group.id}`
          )
        }}>
        Copiar link de invitación
      </Button>
      <h3>{`Clasificación de ${group.name}`}</h3>
      <UserList entries={entries} />
    </LeaderboardLayout>
  )
}

const LeaderboardLayout = styled('div', LeaderboardStyles)
