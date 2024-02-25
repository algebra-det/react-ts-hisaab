import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '@/services/api'

function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchHomeMesssage = async () => {
      const {data} = await api.get('/')
      console.log('data: ', data);
      
      setMessage(data.message)
    }
    fetchHomeMesssage()
  }, [])

  return (
    <div className='grid place-content-center mt-4'>
      <h2 className='mt-4'>
        <p className='text-2xl'>{message}</p>
        Go to your{' '}
        <Link className='underline' to='/transactions'>
          Transactions
        </Link>
      </h2>
    </div>
  )
}

export default Home
