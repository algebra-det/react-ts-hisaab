import { ScrollArea } from '@/components/ui/scroll-area'
import TransactionCard from './TransactionCard'

import { Transaction } from '@/types'
function TransactionsListWithCards({
  transactions,
  canLoadMore,
  openEditDialog,
  openDeleteDialog,
  fetchMoreTransactions
}: {
  transactions: Transaction[]
  canLoadMore: boolean
  openEditDialog: (transaction: Transaction) => void
  openDeleteDialog: (transaction: Transaction) => void
  fetchMoreTransactions: (value: boolean) => void
}) {
  return (
    <>
      <div className='w-80 sm:w-full md:w-full md:max-w-full md:hidden'>
        <div>
          {transactions.length ? (
            <ScrollArea className='h-96 rounded-xl border p-4'>
              {transactions.map(q => (
                <div className='mt-2' key={q.id}>
                  <TransactionCard
                    transaction={q}
                    openEditDialog={openEditDialog}
                    openDeleteDialog={openDeleteDialog}
                  />
                </div>
              ))}
              {canLoadMore && (
                <p
                  className='grid place-content-center mt-2 cursor-pointer'
                  onClick={() => fetchMoreTransactions(true)}
                >
                  Load more...
                </p>
              )}
            </ScrollArea>
          ) : (
            <p className='grid place-content-center'>List is empty</p>
          )}
        </div>
      </div>
    </>
  )
}

export default TransactionsListWithCards
