import { useState, createContext, useContext, useMemo } from 'react'

type UserContextValue = {
  isAuthorised: boolean | null
}

const defaultContextValue: UserContextValue = {
  isAuthorised: null,
}
const UserContext = createContext(defaultContextValue)

const UserContextProvider = ({
  children = null,
}: {
  children?: React.ReactNode
}) => {

  const ctxValue = useMemo<UserContextValue>(
    () => ({
      isAuthorised,
    }),
    [isAuthorised]
  )

    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>

}

const useGlobalContext = () => {
  const context = useContext(UserContext)
  return context
}

export { GlobalContextProvider, useGlobalContext }
