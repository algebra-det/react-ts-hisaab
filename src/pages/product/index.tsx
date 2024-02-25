import ProductsListWithCards from './ProductsListWithCards'
import NewProduct from './NewProduct'
import EditProduct from '@/pages/product/EditProduct'
import InfoProduct from '@/pages/product/InfoProduct'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Product } from '@/types/types'
// import DeleteDialog from '../common/DeleteDialog'
import Filter from '@/components/common/Filter'
import { Input } from '@/components/ui/input'
import dayjs from 'dayjs'
import { dateFormatAPI } from '@/config/format'
import ProductTable from './ProductTable'
import Loading from '@/components/custom/Loader'
import { useNavigate } from 'react-router-dom'
import api, { isAxiosError } from '@/services/api'

export default function MainProduct() {
  const limit = 10
  const router = useNavigate()
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  // const [openDelete, setOpenDelete] = useState(false)
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)
  const [offset, setOffset] = useState(0)
  const today = dayjs().format(dateFormatAPI)
  const [duration, setDuration] = useState('day')
  const [date, setDate] = useState(today)
  const [loadMore, setLoadMore] = useState(false)
  const [searchkeyword, setSerchKeyword] = useState('')

  const [productData, setProductData] = useState({
    data: [] as Product[],
    count: 0
  })

  const [showSearched, setShowSearched] = useState(false)
  const [searchedProductData, setSearchedProductData] = useState({
    data: [] as Product[],
    count: 0
  })
  const [edit, setEdit] = useState({} as Product)
  const openEditDialog = (editedProduct: Product) => {
    setEdit(editedProduct)
    setTimeout(() => {
      setOpen(true)
    }, 100)
  }

  const openInfoDialog = (editedProduct: Product) => {
    setEdit(editedProduct)
    setTimeout(() => {
      setInfoOpen(true)
    }, 0)
  }
  // const openDeleteDialog = (editedProduct: Product) => {
  //   setEdit(editedProduct)
  //   setTimeout(() => {
  //     setOpenDelete(true)
  //   }, 100)
  // }
  const changeDuration = (value: string) => {
    setDuration(value)
  }
  const changeDate = (value: string) => {
    setDate(value)
  }

  // const confirmDelete = async () => {
  //   try {
  //     setFetching(true)
  //     let auth = getCookie('authorization')
  //     if (!auth) auth = ''

  //     await fetch(`${import.meta.env.NEXT_PUBLIC_API_URL}/products/${edit.id}`, {
  //       headers: {
  //         Authorization: JSON.parse(JSON.stringify(auth)),
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'DELETE',
  //     })
  //     fetchProducts()
  //     setOpenDelete(false)
  //   } catch (error) {
  //     console.log('Error: ', error)
  //   } finally {
  //     setFetching(false)
  //   }
  // }

  useEffect(() => {
    fetchProducts()
  }, [date, duration])

  const fetchProducts = async (page?: boolean) => {
    setShowSearched(false)
    setSerchKeyword('')
    try {
      setFetching(true)
      if (page) setOffset(offset + limit)
      setOffset(0)
      const { data } = await api(
        `/products?dateRange=${duration}&workingDate=${date}&limit=${limit}&offset=${
          page ? offset + limit : offset
        }`
      )
      console.log('products are: ', data)
      if (!page) setProductData(data)
      else {
        setProductData({
          ...productData,
          data: [...productData.data, ...data.data]
        })
      }
      setFetching(false)
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 401)
        router('/login')
      setError('Error occured while fetching')
      console.log('Error Occured')
    } finally {
      setFetching(false)
    }
  }

  const handleSearch = async () => {
    setError('')
    try {
      if (!searchkeyword.length || searchkeyword.length < 3) {
        setError('Please search with atleast 3 characters')
        setTimeout(() => {
          setError('')
        }, 5000)
        return
      }
      setFetching(true)
      const response = await fetch(
        `${
          import.meta.env.NEXT_PUBLIC_API_URL
        }/products/search?searchText=${searchkeyword}&dateRange=${duration}&workingDate=${date}`
      )
      console.log('response: ', response)
      if (response.ok) {
        const data = await response.json()
        console.log('products are: ', data)
        setSearchedProductData(data)
        setShowSearched(true)
      } else if (response.status === 401) {
        router('/login')
      } else {
        setError('Error occured while searching')
      }
    } catch (error) {
      console.log('Error while searching: ', error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    setLoadMore(!!Math.floor(productData.count % productData.data.length))
  }, [productData])

  useEffect(() => {
    if (!searchkeyword.length) {
      setShowSearched(false)
    }
  }, [searchkeyword])

  const addNewProduct = (product: Product) => {
    if (!dayjs(today).isSame(dayjs(date))) return
    setProductData({
      count: productData.count + 1,
      data: [product, ...productData.data]
    })
  }

  const updateProduct = (product: Product) => {
    const allProducts = productData.data.map(q => {
      if (q.id === product.id) return product
      return q
    })
    setProductData({
      ...productData,
      data: allProducts
    })
  }

  return (
    <div className='mt-5 grid place-content-center min-w-full w-25'>
      {fetching && <Loading />}
      <>
        <h1 className='text-3xl'>Products</h1>

        <div className='flex justify-between items-center my-2'>
          <p>
            Total Products :{' '}
            <span className='text-xl font-semibold'>{productData.count}</span>
          </p>
          <NewProduct addNewProduct={addNewProduct} />
        </div>
        {open && (
          <EditProduct
            product={edit}
            open={open}
            setOpen={setOpen}
            updateProduct={updateProduct}
          />
        )}
        {infoOpen && (
          <InfoProduct product={edit} open={infoOpen} setOpen={setInfoOpen} />
        )}
        {/* {openDelete && (
          <DeleteDialog
            data={{ id: edit.id, name: edit.productName, type: 'Product' }}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            confirmDelete={confirmDelete}
          />
        )} */}
        <>
          <Filter changeDate={changeDate} changeDuration={changeDuration} />

          <div className='flex justify-end items-center mb-2'>
            <Input
              type='search'
              placeholder='Search product...'
              value={searchkeyword}
              onChange={e => setSerchKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <Search
              className='mr-3 ml-2 cursor-pointer'
              onClick={handleSearch}
            />
          </div>
          {error && <p className='text-xs my-2'>{error}</p>}

          <ProductTable
            products={
              showSearched ? searchedProductData.data : productData.data
            }
            openEditDialog={openEditDialog}
            openInfoDialog={openInfoDialog}
            // openDeleteDialog={openDeleteDialog}
          />

          <ProductsListWithCards
            products={
              showSearched ? searchedProductData.data : productData.data
            }
            canLoadMore={showSearched ? false : loadMore}
            fetchMoreProducts={fetchProducts}
            openEditDialog={openEditDialog}
            openInfoDialog={openInfoDialog}
            // openDeleteDialog={openDeleteDialog}
          />
          <div className='my-5'></div>
        </>
      </>
    </div>
  )
}
