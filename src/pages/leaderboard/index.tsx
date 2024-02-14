import applicationServicesMap from '@/src/config/applicationServicesMap'
import { Profile } from '@/src/domain/profile'
import { SearchBar } from '@/src/ui/components/SearchBar'
import { UserList } from '@/src/ui/components/UserList'
import { styled } from '@stitches/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { SetStateAction, useState } from 'react'
import { LeaderboardStyles } from './Leaderboard.styles'

export const getStaticProps = (async ({ params }) => {
  const profiles = await applicationServicesMap
    .getAllProfilesForGroup()
    .run('groupName')
  return { props: { profiles } }
}) satisfies GetStaticProps<{
  profiles: Profile[]
}>

export default function Leaderboard({
  profiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentPlayId, setCurrentPlayId] = useState(344)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (propSearchTerm: SetStateAction<string>) => {
    setSearchTerm(propSearchTerm)
  }

  const handleFilterPlayId = (propPlayId: SetStateAction<number>) => {
    setCurrentPlayId(propPlayId)
  }

  return (
    <LeaderboardLayout>
      <h3>Leaderboard</h3>
      {/* <SearchBar onSearch={handleSearch} onFilterPlayId={handleFilterPlayId} /> */}
      <UserList
        playId={currentPlayId}
        searchTerm={searchTerm}
        profiles={profiles}
      />
    </LeaderboardLayout>
  )
}

const LeaderboardLayout = styled('div', LeaderboardStyles)
