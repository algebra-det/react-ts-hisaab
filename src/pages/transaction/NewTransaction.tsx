import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'
import { Transaction, Product } from '@/types/types'
import Loading from '@/components/custom/Loader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { PlusSquare } from 'lucide-react'

const formSchema = z.object({
  productName: z
    .string()
    .min(1, 'Product Name is required')
    .max(64, "Product name can't be more than 64 characters"),
  sellingPrice: z.string().refine(
    v => {
      const n = Number(v)
      return !isNaN(n) && v?.length > 0
    },
    { message: 'Invalid number' }
  ),
  purchasePrice: z.string().refine(
    v => {
      const n = Number(v)
      return !isNaN(n) && v?.length > 0
    },
    { message: 'Invalid number' }
  ),
  profit: z.string().refine(
    v => {
      const n = Number(v)
      return !isNaN(n) && v?.length > 0
    },
    { message: 'Invalid number' }
  )
})

export default function DialogDemo({
  addNewTransaction
}: {
  addNewTransaction: (transaction: Transaction) => void
}) {
  let debounce: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0)
  const [open, setOpen] = useState(false)
  const [productsList, setProductsList] = useState([] as Product[])
  const [loading, setloading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      sellingPrice: '',
      purchasePrice: '',
      profit: '100'
    }
  })

  const fetchRelatedProducts = (value: string) => {
    clearTimeout(debounce)
    if (value.length < 3) return
    debounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.NEXT_PUBLIC_API_URL}/products/search?searchText=${value}`,
        )
        const fetchedProducts = await res.json()
        console.log('Products: ', fetchedProducts)
        setProductsList(fetchedProducts.data)
      } catch (error) {
        console.log('Related Error');
      }
    }, 1000)
  }

  const textSlice = (string: string) => {
    const uptoIndex = 10
    if (string.length <= uptoIndex) return string
    return string.slice(0, uptoIndex) + '...'
  }

  const setProductDetails = (value: Product) => {
    form.setValue('purchasePrice', value.purchasePrice.toString())
    if (value.lastSellingPrice)
      form.setValue('sellingPrice', value.lastSellingPrice.toString())
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('props are : ', values)
    try {
      setloading(true)
      const response = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/transactions`,
      )
      const newTransaction = await response.json()
      if (response.ok) {
        console.log('Response object: ', response.status, newTransaction)
        addNewTransaction(newTransaction.data)
        form.reset()
        setOpen(false)
      } else {
        form.setError('root.serverError', {
          type: response.status.toString(),
          message: newTransaction.message
        })
      }
      console.log('Response object: ', response.status, newTransaction)
    } catch (error) {
      console.log('Error while loggin in: ', error)
    } finally {
      setloading(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <PlusSquare
            className='cursor-pointer h-5 w-5'
            onClick={() => setOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625px] lg:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>New Transaction: </DialogTitle>
            <DialogDescription>
              Add below details to create a new transaction.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {form.formState?.errors?.root?.serverError.type && (
                <p className='text-[1rem] font-medium text-destructive'>
                  {form.formState?.errors?.root?.serverError.message}
                </p>
              )}
              <FormField
                control={form.control}
                name='productName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type='text'
                          autoComplete='off'
                          placeholder='Some Product'
                          {...field}
                          onChange={e => {
                            field.onChange(e)
                            fetchRelatedProducts(e.target.value)
                          }}
                        />
                        <DropdownMenu
                          open={!!productsList.length}
                          onOpenChange={() => setProductsList([])}
                        >
                          <DropdownMenuTrigger className='w-full block'></DropdownMenuTrigger>
                          <DropdownMenuContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625px] lg:max-w-[625px]'>
                            <DropdownMenuLabel>
                              Previous Matches:
                            </DropdownMenuLabel>
                            {productsList.map(q => (
                              <DropdownMenuItem
                                key={q.id}
                                onClick={() => setProductDetails(q)}
                              >
                                <div>{textSlice(q.productName)},</div>
                                <div className='ml-2'>
                                  <span className='text-lg'>(</span>S:{' '}
                                  {q.lastSellingPrice ?? '?'}, P:{' '}
                                  {q.purchasePrice}
                                  <span className='text-lg'>)</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sellingPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='purchasePrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='profit'
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel>Profit</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='0' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type='submit'>
                Submit
              </Button>
            </form>
          </Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
