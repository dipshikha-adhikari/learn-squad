import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'

interface CounterProps{
    count:number
    type:string
    handleIncrement:(props:string) => void
    handleDecrement:(props:string) => void
}

const Counter = ({count, handleIncrement, handleDecrement, type}:CounterProps) => {

  
  return (
    <div className='flex items-center gap-4'>
      <AiOutlineMinusCircle fontSize={20} onClick={() => handleDecrement(type)} className='cursor-pointer text-primary-light'/>
       <h2 className='text-lg min-w-[20px]  text-center font-semibold'>{count }</h2>
       <AiOutlinePlusCircle fontSize={20} onClick={() => handleIncrement(type)} className='cursor-pointer text-secondary-dark'/>
    </div>
  )
}

export default Counter