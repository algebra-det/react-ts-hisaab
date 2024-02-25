import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes, userRoutes } from './routes'
import Header from '@/layouts/Header'
import ProtectedRoute from './ProtectedRoute'

function Router() {
  return (
      <BrowserRouter>
        <Header>
        <Routes>
          {publicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          {userRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <route.element />
                </ProtectedRoute>
              }
            />
          ))}
          {adminRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute role='admin'>
                  <route.element />
                </ProtectedRoute>
              }
            />
          ))}
          {authRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route
            path='/*'
            element={
              <div>
                <h2>404</h2>
              </div>
            }
          />
        </Routes>
        </Header>
      </BrowserRouter>
  )
}

export default Router
