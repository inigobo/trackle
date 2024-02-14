import { createContext, useContext, useState } from 'react'

interface ProfileContextData {
  currentUser: string | null
  bigPlayId: number
  setBigPlayId: (newPlayId) => void
}

const initialProfileContext: ProfileContextData = {
  currentUser: null,
  bigPlayId: 344,
}

const ProfileContext = createContext<ProfileContextData>(initialProfileContext)

const ProfileContextProvider = ({
  children = null,
  initialValue,
}: {
  children?: React.ReactNode
  initialValue?: ProfileContextData
}) => {
  const [profileContext, setProfileContext] = useState<ProfileContextData>(
    initialValue || initialProfileContext
  )

  return (
    <ProfileContext.Provider value={profileContext}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfileContext = (): ProfileContextData => {
  const context = useContext(ProfileContext) as ProfileContextData
  return context
}

export { ProfileContextProvider, useProfileContext }
