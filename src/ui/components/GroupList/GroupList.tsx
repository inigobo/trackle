import { Group } from '@/src/application/group'
import { Stack } from 'react-bootstrap'
import { GroupCard } from '../GroupCard'

type GroupListProps = {
  groups: Group[]
}

export const GroupList = ({ groups }: GroupListProps) => {
  return (
    <Stack gap={2}>
      {groups.map(group => {
        return <GroupCard key={group.id} group={group} />
      })}
    </Stack>
  )
}
