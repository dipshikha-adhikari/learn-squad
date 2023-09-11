import {categories} from '../../assets/data'
import useListingStore from '../../store/listing';

const Category = () => {
const listing = useListingStore(state => state.listing)
const setCategory = useListingStore(state => state.setCategory)


  const handleClick = (c:any) => {
    setCategory(c.label)
  };

  return (
    <div className=''>
      <div className=' mb-2'>
      <h2>Describe your place?</h2>
        <h5 className='text-stone-400 '>Pick a category</h5>

        </div>        <div className='grid  overflow-y-auto grid-cols-2 xs:grid-cols-3 pr-4 gap-2'>
            {categories.map((c) => {
              let Icon = c.icon
                return  <div key={c.label}
                className={`${
                  c.label === listing.category ? "border-primary-light" : "border-light"
                } grid gap-2 cursor-pointer border-sm rounded-lg border-light p-2`}
                onClick={() => handleClick(c)}
              >
                <i className='text-xs xs:text-lg'>
                  <Icon   />
                </i>
                <label htmlFor="">{c.label}</label>
              </div>
            })}

        </div>
    </div>
  )
}

export default Category