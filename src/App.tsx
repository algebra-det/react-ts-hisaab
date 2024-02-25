import Router from '@/router/index'
import { Suspense } from 'react'
import { ThemeProvider } from '@/providers/themeProvider'
import Loader from '@/components/custom/Loader'

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Router />
      </ThemeProvider>
    </Suspense>
  )
}

export default App
