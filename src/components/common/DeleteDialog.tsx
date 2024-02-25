import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Dispatch, SetStateAction } from 'react'

export default function DialogDemo({
  data,
  openDelete,
  setOpenDelete,
  confirmDelete
}: {
  data: { id: number; name: string; type: string }
  openDelete: boolean
  setOpenDelete: Dispatch<SetStateAction<boolean>>
  confirmDelete: () => void
}) {
  return (
    <>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className='max-w-[325px] sm:max-w-[425px] md:max-w-[625] lg:max-w-[625]'>
          <DialogHeader>
            <DialogTitle>Delete {data.type}: </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {data.name} ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-row'>
            <Button
              className='w-1/4'
              type='submit'
              onClick={() => confirmDelete()}
            >
              Yes
            </Button>
            <Button
              className='w-3/4 ml-1'
              type='reset'
              onClick={() => setOpenDelete(false)}
            >
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
