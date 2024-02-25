import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'

import { Transaction } from '@/types/types'
import { dateTimeFormatDisplay } from '@/config/format'

function transactionTable({
  transactions,

  openEditDialog,
  openDeleteDialog
}: {
  transactions: Transaction[]

  openEditDialog: (transaction: Transaction) => void
  openDeleteDialog: (transaction: Transaction) => void
}) {
  return (
    <div className='mt-5 place-content-center w-25 hidden md:grid'>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-fit'>Product Name</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='ml-10 text-right'>Profit</TableHead>
            <TableHead className='w-24'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(q => (
            <TableRow key={q.id}>
              <TableCell className='font-medium'>{q.productName}</TableCell>
              <TableCell>{q.purchasePrice}</TableCell>
              <TableCell>{q.sellingPrice}</TableCell>
              <TableCell>
                {dayjs(q.createdAt).format(dateTimeFormatDisplay)}
              </TableCell>
              <TableCell className='text-right'>{q.profit}</TableCell>
              <TableCell className='text-right flex justify-around ml-2'>
                <Pencil
                  onClick={() => openEditDialog(q)}
                  className='h-4 w-4 cursor-pointer'
                />
                <Trash2
                  onClick={() => openDeleteDialog(q)}
                  className='h-4 w-4 cursor-pointer'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default transactionTable
