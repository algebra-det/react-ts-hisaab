function Loading() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]'>
      <div className='animate-spin-slow ease-linear rounded-full border-dashed border-8 border-t-8 border-gray-200 h-6 w-6 sm:h-8 sm:w-8 md:h-16 md:w-16'></div>
    </div>
  )
}

export default Loading
