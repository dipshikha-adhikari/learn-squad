import{ useState } from "react";
import { Select } from "antd";
import countries, { Country } from "world-countries";
import Map from "../Map";
import useListingStore from "../../store/listing";

const Location  = () => {
const[location, setLocation] = useState<[number, number]>([51, -0.09])
const listing = useListingStore(state => state.listing)
const setLocationInStore = useListingStore(state => state.setLocation)


  const handleChange = (value:string) => {
    countries.filter((c:Country) => {
      if(c.name.common === value ){
        setLocation(c.latlng)
setLocationInStore(c.name.common)
      }
    })
  };



  return (
    <div className="grid gap-2">
      <div className=" ">
        <h2>Where is your place located?</h2>
        <h5 className="text-stone-400 ">Help guests find you</h5>
      </div>

      <Select
        showSearch
        placeholder="Anywhere"
        value={listing.location}
        onChange={handleChange}
       className="overflow-hidden"
      >
        {countries.map((c) => (
          <Select.Option key={c.cca2} value={c.name.common} label={c.name.common}>
            <span className="font-bold">{c.name.common}</span>
            <span className="text-sm opacity-50 ml-2">{c.region}</span>
          </Select.Option>
        ))}
      </Select>
      <Map location={location} />
    </div>
  );
};

export default Location;
