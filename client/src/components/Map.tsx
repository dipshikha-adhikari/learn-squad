import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getLocation } from "../utils/getLocation";
import useListingStore from "../store/listing";

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// extra component for finding location with click event
const MapComponent = ({ setMarkerPosition, setQuery, modalType }: any) => {
  const map = useMap();
  const setLocation = useListingStore(state => state.setLocation)

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);

  const handleMapClick = async (e: any) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    const location = await getLocation(lat, lng);
    const exactLocation = [location?.state, location?.country].join();
    if (modalType === "search") {
      setQuery((prev: any) => ({ ...prev, location: exactLocation }));
    } else {
      setLocation(exactLocation)
    }
  };

  useMapEvents({
    click: handleMapClick,
  });

  return null;
};

const Map = ({ location, modalType, setQuery }: any) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(); // Initial marker position
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (location !== undefined) {
      setMarkerPosition(location);
    }
    if (location && mapRef.current) {
      mapRef.current.setView(location);
      mapRef.current.on("click", (e: any) => {
        if (e.latlng) {
          const { lat, lng } = e.latlng;
          setMarkerPosition([lat, lng]);
        }
      });
    }
  }, [location]);

  return (
    <MapContainer
      ref={mapRef}
      center={markerPosition || location || [28, 84]}
      zoom={6} // Adjust the zoom level accordingly
      scrollWheelZoom={false}
      style={{ height: "300px", borderRadius: "8px" }} // Set a specific height and any additional styles
    >
      <TileLayer url={url} attribution={attribution} />
      {markerPosition && <Marker position={markerPosition}></Marker>}
      <MapComponent
        setMarkerPosition={setMarkerPosition}
        modalType={modalType}
        setQuery={setQuery}
      />
    </MapContainer>
  );
};

export default Map;
