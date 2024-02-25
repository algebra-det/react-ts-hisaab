import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Pencil, Trash, Info } from 'lucide-react'
import dayjs from 'dayjs'

import { dateTimeFormatDisplay } from '@/config/format'
import { Product } from '@/types'

export default function Transactions({
  product,
  openEditDialog,
  openInfoDialog,
  openDeleteDialog
}: {
  openEditDialog: (product: Product) => void
  openInfoDialog: (product: Product) => void
  openDeleteDialog?: (transaction: Product) => void
  product: Product
}) {
  return (
    <>
      <Card className='w-full md:w-full'>
        <CardHeader className='flex flex-row justify-between px-3 pb-1 pt-3'>
          <div className='w-full'>
            <CardTitle className='text-md sm:text-lg md:text-xl flex justify-between w-full align-top mb-1'>
              <div>{product.productName}</div>
              <div className='flex ml-1 mt-2 sm:ml-3 md:ml-4 lg:ml-6 '>
                <Pencil
                  onClick={() => openEditDialog(product)}
                  className='h-4 w-4 ml-2 cursor-pointer inline-block'
                />
                {openDeleteDialog && (
                  <Trash
                    onClick={() => openDeleteDialog(product)}
                    className='h-4 w-4 ml-2 cursor-pointer inline-block'
                  />
                )}
                <Info
                  onClick={() => openInfoDialog(product)}
                  className='h-4 w-4 ml-3 cursor-pointer inline-block'
                />
              </div>
            </CardTitle>
            <CardDescription className='flex flex-row justify-between w-full'>
              <div>
                <p> Last Selling price: &#8377;{product.lastSellingPrice}</p>
                <p> Purchase Price: &#8377;{product.purchasePrice}</p>
              </div>

              <div>
                <p className='text-md sm:text-lg md:text-xl font-semibold text-white grid place-content-center'>
                  {product.totalSale ?? 0}
                </p>
                <p className='text-sm text-muted-foreground'>Sold</p>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className='px-3 py-1 text-sm text-muted-foreground'>
          <p>{dayjs(product.updatedAt).format(dateTimeFormatDisplay)}</p>
        </CardFooter>
      </Card>
    </>
  )
}
