import { Dispatch, SetStateAction, createContext, useState, useContext } from 'react'
import { User } from '@/types/types'

type UserContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const userContext = createContext({} as UserContextType)

export const useUserContext = () => {
  return useContext(userContext)
}

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 0,
    name: 'g',
    email: '',
    role: '',
    token: ''
  })

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}


export default Context
