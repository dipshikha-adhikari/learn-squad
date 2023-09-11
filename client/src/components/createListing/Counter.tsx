import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import useListingStore from '../../store/listing'

const Counter = ({type, count}:any) => {
const setGuests = useListingStore(state => state.setGuests)
const setBathrooms = useListingStore(state => state.setBathrooms)
const setRooms = useListingStore(state => state.setRooms)

    function handleIncrement(){
      if(count >= 16) return
      type === 'guests' && setGuests(count + 1)
      type === 'rooms' && setRooms(count + 1)
      type === 'bathrooms' && setBathrooms(count + 1)
  
    }
    function handleDecrement(){
      if(count === 1) return
      type === 'guests' && setGuests(count - 1)
      type === 'rooms' && setRooms(count - 1)
      type === 'bathrooms' && setBathrooms(count - 1)
    }

  return (
    <div className='flex items-center gap-4'>
      <AiOutlineMinusCircle fontSize={20} onClick={handleDecrement} className='cursor-pointer'/>
       <h2 className='text-lg min-w-[20px]  text-center font-semibold'>{count }</h2>
       <AiOutlinePlusCircle fontSize={20} onClick={handleIncrement} className='cursor-pointer'/>
    </div>
  )
}

export default Counter