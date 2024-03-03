import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserContext } from '@/contexts/userContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ProfileButton() {
  const router = useNavigate()
  const { user, setUser } = useUserContext()

  useEffect(() => {
    const checkAndSetUser = async () => {
      if (user?.id) {
        const response = await fetch(
          `${import.meta.env.NEXT_PUBLIC_API_URL}/auth/verify`,
          {
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
              token: JSON.parse(JSON.stringify(user.token))
            })
          }
        )
        if (response.ok) {
          const userResponse = await response.json()
          setUser(userResponse.data)
        }
      } else {
        setUser({
          id: 0,
          name: 'g',
          email: '',
          role: '',
          token: ''
        })
      }
    }
    checkAndSetUser()
  }, [setUser, user.id, user.token])

  const handleLogout = () => {
    setUser({ id: 0, name: 'g', email: '', role: '', token: '' })
    router('/login?logout=success')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src='https://github.com/shadcnj.png' /> */}
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.token ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <Link to='/login'>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link to='/sign-up'>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
