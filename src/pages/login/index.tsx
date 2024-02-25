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
import api, {isAxiosError} from '@/services/api'

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
    try {
      setLoading(true)
      const response = await api.post( `/auth/login`, values)
        console.log('Response object: ', response.status, response)
        // Set Cookie or something
        setUser(response.data)
        if (response.data.role === 'client') router('/transactions')
        else router('/admin/users')
      console.log('Response object: ', response.status, response)
    } catch (error) {
      console.log('Error while loggin in: ', error)
      if(!isAxiosError(error)) return;
      console.log('Data is: ', error.response?.data)
      if (!error.response?.data.statusCode) return
      if (error.response.data.statusCode === 400)
        form.setError(error.response.data.fieldName, {
          type: error.response.data.statusCode.toString(),
          message: error.response.data.message
        })
      else
        form.setError('root.serverError', {
          type: error.response.data.statusCode.toString(),
          message: error.response.data.message
        })
      console.log('Error while loggin in: ', error.message)
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
