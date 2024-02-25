import { lazy } from 'react'

const Home = lazy(() => import('@/pages/home/index'))
const Login = lazy(() => import('@/pages/login/index'))
const SignUp = lazy(() => import('@/pages/signUp/index'))
const Admin = lazy(() => import('@/pages/Admin'))
const Transactions = lazy(() => import('@/pages/transaction/index'))
const Products = lazy(() => import('@/pages/product/index'))

export const authRoutes = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/sign-up',
    element: SignUp
  }
]

export const publicRoutes = [
  {
    path: '/',
    element: Home
  },
]

export const userRoutes = [
  {
    path: '/transactions',
    element: Transactions
  },
  {
    path: '/products',
    element: Products
  }
]

export const adminRoutes = [
  {
    path: '/admin',
    element: Admin
  }
]
