import { Profile } from '@/src/application/profile'
import { Stack } from 'react-bootstrap'
import { UserCard } from '../UserCard'

type UserListProps = {
  profiles: Profile[]
}

export const UserList = ({ profiles }: UserListProps) => {
  return (
    <>
      <Stack gap={2}>
        {profiles.map(profile => {
          return <UserCard key={profile.id} profile={profile} />
        })}
      </Stack>
    </>
  )
}
