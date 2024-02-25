import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import DatePicker from '@/pages/transaction/DatePicker'

export function Filter({
  yearOption = false,
  changeDuration,
  changeDate
}: {
  yearOption?: boolean
  changeDuration: (value: string) => void
  changeDate: (value: string) => void
}) {
  return (
    <div className='flex mb-2'>
      <Select defaultValue='day' onValueChange={changeDuration}>
        <SelectTrigger className='w-2/6'>
          <SelectValue placeholder='Select a duration' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Duration</SelectLabel>
            <SelectItem value='day'>Day</SelectItem>
            <SelectItem value='week'>Week</SelectItem>
            <SelectItem value='month'>Month</SelectItem>
            {yearOption && <SelectItem value='month'>Month</SelectItem>}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DatePicker changeDate={changeDate} />
    </div>
  )
}

export default Filter
