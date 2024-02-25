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
import { PlusSquare } from 'lucide-react'
import { Product } from '@/types/types'
import Loading from '@/components/custom/Loader'

const formSchema = z.object({
  productName: z
    .string()
    .min(1, 'Product Name is required')
    .max(64, "Product name can't be more than 64 characters"),
  purchasePrice: z.string().refine(
    v => {
      const n = Number(v)
      return !isNaN(n) && v?.length > 0
    },
    { message: 'Invalid number' }
  )
})

export default function DialogDemo({
  addNewProduct
}: {
  addNewProduct: (product: Product) => void
}) {
  const [open, setOpen] = useState(false)
  const [loading, setloading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      purchasePrice: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('props are : ', values)
    try {
      setloading(true)
      const response = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/products`,
      )
      const newProduct = await response.json()
      if (response.ok) {
        console.log('Response object: ', response.status, newProduct)
        addNewProduct(newProduct.data)
        form.reset()
        setOpen(false)
      } else {
        let errorLevel:
          | 'productName'
          | 'purchasePrice'
          | 'root'
          | `root.${string}` = 'root.serverError'
        if (newProduct.fieldName) errorLevel = newProduct.fieldName
        form.setError(errorLevel, {
          type: response.status.toString(),
          message: newProduct.message
        })
      }
      console.log('Response object: ', response.status, newProduct)
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
            <DialogTitle>New Product</DialogTitle>
            <DialogDescription>
              Add below details to create a new product.
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
                        />
                      </>
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
