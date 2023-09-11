export const getLocation = async(lat:number,lng:number) => {
    try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        if (data && data.address) {
          const{state, village, municipality ,county, country  } = data.address
          
return {state:state || village || municipality || county, country}
        }
        return null
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
}