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

  const profiles = await applicationServicesMap
    .getAllProfilesForGroup()
    .run(group.id)

  return { props: { profiles, group, user: data.user } }
}

export default function LeaderboardPage({
  profiles,
  group,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [currentPlayId, setCurrentPlayId] = useState(344)
  // const [searchTerm, setSearchTerm] = useState('')

  // const handleSearch = (propSearchTerm: SetStateAction<string>) => {
  //   setSearchTerm(propSearchTerm)
  // }

  // const handleFilterPlayId = (propPlayId: SetStateAction<number>) => {
  //   setCurrentPlayId(propPlayId)
  // }

  return (
    <LeaderboardLayout>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(`http://localhost:3000/join?g=${group.id}`)
        }}>
        Copiar link de invitación
      </Button>
      <h3>{`Clasificación de ${group.name}`}</h3>
      {/* <SearchBar onSearch={handleSearch} onFilterPlayId={handleFilterPlayId} /> */}
      <UserList profiles={profiles} />
    </LeaderboardLayout>
  )
}

const LeaderboardLayout = styled('div', LeaderboardStyles)
