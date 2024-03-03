import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Container from '../components/custom/Container'
import { IndianRupee, Menu } from 'lucide-react'
import ProfileButton from '@/components/custom/ProfileButton'
import {  useState } from 'react'
import ThemeToggle from './themeToggle'

const routes = [
  {
    to: '/transactions',
    label: 'Transactions'
  },
  {
    to: '/products',
    label: 'Products'
  }
]

function Header({ children }: { children: React.ReactNode }) {
  const [openSheet, setOpenSheet] = useState(false)

  return (
    <>
      <header className='sm:flex sm:justify-between py-3 px-4 border-b'>
        <Container>
          <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
            <div className='flex items-center'>
              <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger>
                  <Menu className='h-6 md:hidden w-6' />
                </SheetTrigger>
                <SheetContent side='left' className='w-[300px] sm:w-[400]'>
                  <nav className='flex flex-col gap-4'>
                    {routes.map((route, i) => (
                      // <Button key={i} asChild variant='ghost'>
                      <Link
                        key={i}
                        to={route.to}
                        className='block px-2 py-1 text-lg'
                        onClick={() => setOpenSheet(false)}
                      >
                        {route.label}
                      </Link>
                      // </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link to='/' className='ml-4 lg:ml-0'>
                <IndianRupee />
              </Link>
            </div>
            <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block'>
              {routes.map((route, i) => (
                <Button key={i} asChild variant='ghost'>
                  <Link
                    to={route.to}
                    className='text-sm font-medium transition-colors'
                  >
                    {route.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <div className='flex items-center gap-3'>
              <ThemeToggle />
              <ProfileButton />
            </div>
          </div>
        </Container>
      </header>
      <Container>{children}</Container>
      </>
  )
}

export default Header
