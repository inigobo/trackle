import useSWR, { Fetcher } from 'swr'

const uid = '<user_id>'
const fetcher: Fetcher<User, string> = id => getUserById(id)

const { data } = useSWR(uid, fetcher)
// `data` will be `User | undefined`.

function useLeaderboard(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}

export default useLeaderboard
