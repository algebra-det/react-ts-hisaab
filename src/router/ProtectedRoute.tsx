import { ReactNode } from 'react'

type ProtectedRouteType = {
  role?: 'user' | 'admin'
  children: ReactNode
}

function ProtectedRoute({ role = 'user', children }: ProtectedRouteType) {
  console.log('User role is: ', role)

  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default ProtectedRoute
