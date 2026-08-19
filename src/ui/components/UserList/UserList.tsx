import { LeaderboardEntry } from '@/src/application/group/useCases/getGroupLeaderboard.useCase'
import { Stack } from 'react-bootstrap'
import { UserCard } from '../UserCard'

type UserListProps = {
  entries: LeaderboardEntry[]
}

export const UserList = ({ entries }: UserListProps) => {
  return (
    <>
      <Stack gap={2}>
        {entries.map((entry, index) => {
          return (
            <UserCard
              key={entry.profile.id}
              profile={entry.profile}
              position={index + 1}
              score={entry.score}
              wins={entry.wins}
              gamesPlayed={entry.gamesPlayed}
            />
          )
        })}
      </Stack>
    </>
  )
}
