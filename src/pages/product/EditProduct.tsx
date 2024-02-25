import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { Product } from '@/types/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
  product,
  open,
  setOpen,
  updateProduct
}: {
  product: Product
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  updateProduct: (product: Product) => void
}) {
  const [loading, setloading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product.productName,
      purchasePrice: product.purchasePrice.toString()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('props are : ', values)
    try {
      setloading(true)
      const response = await fetch(
        `${import.meta.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
      )
      const updatedProduct = await response.json()
      if (response.ok) {
        console.log('Response object: ', response.status, updatedProduct)
        updateProduct(updatedProduct.data)
        setOpen(false)
      } else {
        form.setError('root.serverError', {
          type: response.status.toString(),
          message:
            updatedProduct.message ||
            updatedProduct.data ||
            'Something went wrong!'
        })
      }
      console.log('Response object: ', response.status, updatedProduct)
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
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625px] lg:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>Edit Product: </DialogTitle>
            <DialogDescription>
              Update below details to edit this product.
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
                      <Input
                        disabled
                        type='text'
                        placeholder='Some Product'
                        {...field}
                      />
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
