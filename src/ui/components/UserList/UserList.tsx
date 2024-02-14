import { Profile } from '@/src/domain/profile'
import { Stack } from 'react-bootstrap'
import { UserCard } from '../UserCard'

type UserListProps = {
  playId: number
  searchTerm: string
  profiles: Profile[]
}

export const UserList = ({ searchTerm, profiles }: UserListProps) => {
  return (
    <Stack gap={2}>
      {profiles
        .filter(profile => {
          return profile.username.includes(searchTerm)
        })
        .filter(profile => {
          return profile.status !== 'pending'
        })
        .sort((profile1, profile2) => {
          return profile1.attempts - profile2.attempts
        })
        .map(profile => {
          return <UserCard key={profile.id} profile={profile} />
        })}
    </Stack>
  )
}
