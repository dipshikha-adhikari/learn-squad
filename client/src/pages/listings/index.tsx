import { IListing } from "../../../types";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ListingItem from "../../components/listings/ListingItem";
import { useModal } from "../../hooks/useModal";
import DropdownComponent from "./Dropdown";
import {  publicRequest } from "../../requestMethod";
import NoUser from "../../components/NoUser";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loading from "../../components/Loading";

const Listings = () => {
  const{user} = useCurrentUser()
  const { showModal, isModalOpen} = useModal();

  const { data: listingItems, isLoading, isError } = useQuery(["listingItems", user], async () => {
    if (!user?.listings) return [];

    const promises = user.listings.map(async (item: IListing) => {
      try {
        const result = await publicRequest.get(`/api/v1/listings/${item}`);
        return result.data as IListing;
      } catch (error) {
        // Handle the error, and return null for the missing item
        console.error(`Error fetching listing ${item._id}:`, error);
        return null;
      }
    });
    

    return Promise.all(promises).then(results => {
      const fulfilledPromises = results.filter(result => result !== null) as IListing[];
      return fulfilledPromises;
    });
  });

  if(isLoading) return <Loading/>
  if(isError &&  !user) return <NoUser/>

  return (
    <div className="grid gap-4">
      <div className="grid gap-4">
        <h2 className="text-3xl">Welcome back, {user?.name}</h2>
        <DropdownComponent user={user} listings={listingItems} />
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {listingItems !== undefined &&
          listingItems.map((item: IListing) => {
            return (
              <Link
                to={`/listings/${item._id}`}
                key={item._id}
                className="link"
              >
                <ListingItem
                  user={user}
                  isModalOpen={isModalOpen}
                  listing={item}
                  showModal={showModal}
                />
                <h2>{item.title}</h2>
                <h2>${item.price}</h2>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Listings;
