import { Input } from 'antd';
import useListingStore from '../../store/listing';

const Price = () => {
const setPrice = useListingStore(state => state.setPrice)
const listing = useListingStore(state => state.listing)
  const handleInputChange = (event:any) => {
    setPrice(event.target.value)
  };

  return (
    <div className='grid gap-4'>
      <div>
        <h2 className='text-xl font-bold'>Now, set your price</h2>
        <h2>How much do you charge for a night?</h2>
      </div>
      <Input placeholder="$500" type='number' value={listing.price}   onChange={handleInputChange}/>
    </div>
  )
}

export default Price