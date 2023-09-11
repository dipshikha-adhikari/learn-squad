import { Button, Modal, Select } from "antd";
import { useState } from "react";
import countries, { Country } from "world-countries";
import Map from "../../Map";
import Counter from "./Counter";
import { Link } from "react-router-dom";

const SearchModal = ({ handleCancel, isModalOpen, modalType }: any) => {
  const [latlng, setLatlng] = useState<[number, number]>([28, 84]);
  const [query, setQuery] = useState({
    location: "Nepal",
    count: {
      guests: 1,
      rooms: 1,
      bathrooms: 1,
    },
  });

  const handleLocation = (value: string) => {
    countries.filter((c: Country) => {
      if (c.name.common === value) {
        setLatlng(c.latlng);
        setQuery((prev) => ({ ...prev, location: value }));
      }
    });
  };

  function handleIncrement(type: keyof typeof query.count) {
    setQuery(prev => ({...prev ,count:{
      ...prev.count, [type]:prev.count[type] + 1
    }}))
  }
  function handleDecrement(type:keyof typeof query.count) {
    setQuery(prev => ({...prev ,count:{
      ...prev.count, [type]:prev.count[type] - 1
    }}))
  }

  console.log('search')
  return (
    <Modal
    className="top-4 "
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="grid gap-4">
        <Select
          showSearch
          placeholder="Anywhere"
          value={query.location}
          onChange={handleLocation}
          className="overflow-hidden w-[90%]"
        >
          {countries.map((c) => (
            <Select.Option
              key={c.cca2}
              value={c.name.common}
              label={c.name.common}
            >
              <span className="font-bold">{c.name.common}</span>
              <span className="text-sm opacity-50 ml-2">{c.region}</span>
            </Select.Option>
          ))}
        </Select>
        <Map location={latlng} modalType={modalType} setQuery={setQuery} />
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Guests</h2>{" "}
          <Counter
          type='guests'
            count={query.count.guests}
            handleDecrement={() => handleDecrement('guests')}
            handleIncrement={() => handleIncrement('guests')}
          />
          </div>
          <div className="flex  justify-between items-center">
            <h2 className="text-xl">Rooms</h2>{" "}
            <Counter
            type='rooms'
              count={query.count.rooms}
              handleDecrement={() => handleDecrement('rooms')}
              handleIncrement={() => handleIncrement('rooms')}
           
            />
          </div>
          <div className="flex  justify-between items-center">
            <h2 className="text-xl">Bathrooms</h2>{" "}
            <Counter
            type='bathrooms'
              count={query.count.bathrooms}
              handleDecrement={() => handleDecrement('bathrooms')}
              handleIncrement={() => handleIncrement('bathrooms')}
           
            />
          </div>
          <Link className="w-fit" to={`/search?location=${query.location}&guestsCount=${query.count.guests}&bathroomsCount=${query.count.bathrooms}&roomsCount=${query.count.rooms}`} onClick={handleCancel}>
  <Button type="primary" className="" danger>Search</Button>
</Link>

      </div>
    </Modal>
  );
};

export default SearchModal;
