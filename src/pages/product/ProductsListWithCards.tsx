import { ScrollArea } from '@/components/ui/scroll-area'
import ProductCard from './ProductCard'

import { Product } from '@/types'
function TransactionsListWithCards({
  products,
  canLoadMore,
  openEditDialog,
  openInfoDialog,
  openDeleteDialog,
  fetchMoreProducts
}: {
  products: Product[]
  canLoadMore: boolean
  openEditDialog: (product: Product) => void
  openInfoDialog: (product: Product) => void
  openDeleteDialog?: (product: Product) => void
  fetchMoreProducts: (value: boolean) => void
}) {
  return (
    <>
      <div className='w-80 sm:w-full md:w-full md:max-w-full md:hidden'>
        <div>
          {products.length ? (
            <ScrollArea className='h-96 rounded-xl border p-4'>
              {products.map(q => (
                <div className='mt-2' key={q.id}>
                  <ProductCard
                    product={q}
                    openEditDialog={openEditDialog}
                    openDeleteDialog={openDeleteDialog}
                    openInfoDialog={openInfoDialog}
                  />
                </div>
              ))}
              {canLoadMore && (
                <p
                  className='grid place-content-center mt-2 cursor-pointer'
                  onClick={() => fetchMoreProducts(true)}
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
