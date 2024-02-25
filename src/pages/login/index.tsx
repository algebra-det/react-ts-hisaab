import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {Link, useNavigate} from 'react-router-dom'
import { userContext } from '@/contexts/userContext'
import { useContext, useState } from 'react'
import Loading from '@/components/custom/Loader'

const formSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Invalid Email'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password must have more than 8 characters.')
})

function Login() {
  const { setUser } = useContext(userContext)
  const [loading, setLoading] = useState(false)
  const router = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('props are : ', values)
    try {
      setLoading(true)
      const response = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(values)
        }
      )
      const loginResponse = await response.json()
      if (response.ok) {
        console.log('Response object: ', response.status, loginResponse)
        // Set Cookie or something
        setUser(loginResponse.data)
        if (loginResponse.data.role === 'client') router('/transactions')
        else router('/admin/users')
      } else {
        form.setError('root.serverError', {
          type: response.status.toString(),
          message: loginResponse.message
        })
      }
      console.log('Response object: ', response.status, loginResponse)
    } catch (error) {
      console.log('Error while loggin in: ', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='grid place-content-center mt-5'>
      {loading && <Loading />}
      <div className='w-fit m-10 min-w-min sm:w-96'>
        <h1 className='mb-8 text-2xl'>Login Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {form.formState?.errors?.root?.serverError.type && (
              <p className='text-[1rem] font-medium text-destructive'>
                {form.formState?.errors?.root?.serverError.message}
              </p>
            )}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='example@mail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='****' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Submit
            </Button>
          </form>

          <div className='mx-auto my-4'>
            <p className='text-sm'>
              If you don&apos;t have an account, please&nbsp;
              <Link to='/sign-up' className='underline'>
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
