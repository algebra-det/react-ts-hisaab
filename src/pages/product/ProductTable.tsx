import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pencil, Trash2, Info } from 'lucide-react'
import dayjs from 'dayjs'

import { Product } from '@/types'
import { dateTimeFormatDisplay } from '@/config/format'

function productTable({
  products,
  openEditDialog,
  openInfoDialog,
  openDeleteDialog
}: {
  products: Product[]
  openEditDialog: (product: Product) => void
  openInfoDialog: (product: Product) => void
  openDeleteDialog?: (product: Product) => void
}) {
  return (
    <div className='mt-5 place-content-center w-25 hidden md:grid'>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Product Name</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Last Selling Price</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className='ml-10 text-right'>Total Sales</TableHead>
            <TableHead className='w-24'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(q => (
            <TableRow key={q.id}>
              <TableCell className='font-medium'>{q.productName}</TableCell>
              <TableCell>{q.purchasePrice}</TableCell>
              <TableCell>{q.lastSellingPrice}</TableCell>
              <TableCell>
                {dayjs(q.updatedAt).format(dateTimeFormatDisplay)}
              </TableCell>
              <TableCell className='text-right'>{q.totalSale ?? 0}</TableCell>
              <TableCell className='text-right flex justify-around ml-2'>
                <Pencil
                  onClick={() => openEditDialog(q)}
                  className='h-4 w-4 cursor-pointer'
                />
                {openDeleteDialog && (
                  <Trash2
                    onClick={() => openDeleteDialog(q)}
                    className='h-4 w-4 cursor-pointer'
                  />
                )}
                <Info
                  onClick={() => openInfoDialog(q)}
                  className='h-4 w-4 ml-3 cursor-pointer inline-block'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default productTable
