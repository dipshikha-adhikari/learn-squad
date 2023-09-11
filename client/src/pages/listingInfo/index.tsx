import { publicRequest } from "../../requestMethod";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IListing } from "../../../types";
import SimpleSlider from "./Slider";
import Reserve from "./Reserve";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Skeleton from "../../components/Skeleton";

const ListingInfo = () => {
  const { id } = useParams();
const{user} = useCurrentUser()

  const fetchListingInfo = async () => {
    const res = await publicRequest.get(`/api/v1/listings/${id}`);
    return res.data as IListing ;
  };

  const {
    data: item,
    isError,
    isLoading,
  } = useQuery(["listing",id],  fetchListingInfo);

  if (isLoading) return <Skeleton/>
   
 
  if (isError)
    return <div className="text-center text-primary-light">Try again!</div>;
  
    return (
    <div>
      <div className="">
        <SimpleSlider item={item} />

        <div className="md:flex">
          <div className="grid gap-2 h-fit flex-1">
            <h2 className="text-2xl font-semibold">{item?.title}</h2>
            <div className="flex gap-4">
              <span>{item?.guests} guests</span>
              <span>{item?.rooms} rooms</span>
              <span>{item?.bathrooms} bathrooms</span>
            </div>

            <h2>{item?.description}</h2>
          </div>
          <Reserve item={item} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
