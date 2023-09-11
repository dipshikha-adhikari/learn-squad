import { useQuery } from "react-query";
import { publicRequest } from "../../requestMethod";
import useStore from "../../store/store";
import { IListing } from "../../../types";
import { Link, useLocation } from "react-router-dom";
import ListingItem from "./ListingItem";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useModal } from "../../hooks/useModal";
import useListingStore from "../../store/listing";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import AuthModal from "../modals/AuthModal";

const ListingsGallery = () => {
  const category = useStore((state) => state.query.category);
  const { user } = useCurrentUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { showModal, isModalOpen, handleCancel , modalType} = useModal();
  const resetListing = useListingStore((state) => state.resetListing);

  const [queries, setQueries] = useState({
    location: "",
    guestsCount: "",
    roomsCount: "",
    bathroomsCount: "",
  });
  let array = new Array(10).fill("a");

  useEffect(() => {
    let location = queryParams.get("location") || "";
    let guestsCount = queryParams.get("guestsCount") || "";
    let roomsCount = queryParams.get("roomsCount") || "";
    let bathroomsCount = queryParams.get("bathroomsCount") || "";

    setQueries((prev: any) => ({
      ...prev,
      location,
      guestsCount,
      roomsCount,
      bathroomsCount,
    }));
  }, [location]);


  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery(["searchResults", queries, category, resetListing], async () => {
    if (category === "All") {
      const result = await publicRequest.get(
        `/api/v1/listings?location=${queries.location}&guestsCount=${queries.guestsCount}&roomsCount=${queries.roomsCount}&bathroomsCount=${queries.bathroomsCount}`
      );
      return result.data as IListing[];
    } else {
      const result = await publicRequest.get(
        `/api/v1/listings?category=${category}&location=${queries.location}&guestsCount=${queries.guestsCount}&roomsCount=${queries.roomsCount}&bathroomsCount=${queries.bathroomsCount}`
      );
      return result.data as IListing[];
    }
  });

  if (isLoading)
    return (
      <div className="grid py-6 gap-10 h-[60vh] md:h-[65vh] overflow-hidden sm:grid-cols-2 md:grid-cols-3">
        {array.map((a, ind) => {
          return <Skeleton key={a + ind} />;
        })}
      </div>
    );
  if (isError) return <div className="text-center">Try again</div>;

  return (
    <>
      {listings !== undefined ? (
        <>
          {" "}
          <div className="grid relative    z-10 sm:grid-cols-2  gap-10 md:grid-cols-3 place-items-center">
            {listings?.map((listing: IListing) => {
              return (
                <Link
                  to={`/listings/${listing._id}`}
                  className="link w-full"
                  key={listing._id}
                >
                  <ListingItem
                    user={user}
                    listing={listing}
                    isModalOpen={isModalOpen}
                    showModal={showModal}
                    key={listing._id}
                  />
                  <h2 className="mt-[-10px]">${listing.price}/night </h2>
                </Link>
              );
            })}
          </div>
          <h2 className="text-xl text-gray-500 text-center py-10">
            Uh! You reached the end.
          </h2>{" "}
        </>
      ) : (
        <div className=" pt-10 text-xl text-center ">No results found! 😐</div>
      )}
       {isModalOpen && modalType === 'login' && <AuthModal props={{isModalOpen, handleCancel,modalType, showModal}}/>}
    </>
  );
};

export default ListingsGallery;
