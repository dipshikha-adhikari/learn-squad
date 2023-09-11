import useListingStore from '../../store/listing'
import Counter from './Counter'


const Rooms = () => {
const listing = useListingStore(state => state.listing)

  return (
    <div className='grid gap-4'>
     <div>
     <h2 className='text-xl font-bold'>Share some basics about your price</h2>
      <h5 className='text-stone-400'>What amenties do you have</h5>
     </div>
     <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold'>Guests</h2>
        <p>How many guests do you allow?</p>
      </div>
      <Counter count={listing.guests} type={'guests'}/>
     </div>
     <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold'>Rooms</h2>
        <p>How many rooms do you allow?</p>
      </div>
      <Counter count={listing.rooms} type={'rooms'}/>
     </div>
     <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold'>Bathrooms</h2>
        <p>How many bathrooms do you allow?</p>
      </div>
      <Counter count={listing.bathrooms} type={'bathrooms'}/>
     </div>
         </div>
  )
}

export default Rooms