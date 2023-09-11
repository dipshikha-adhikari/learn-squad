import { FaHeart } from "react-icons/fa";
import { IListing, IUser } from "../../../types";
import { useEffect, useState } from "react";
import { makeFavorite, removeFavorite } from "../../actions/handleFavorite";

interface ListingItemProps {
  user: IUser | null;
  listing: IListing | null;
  showModal: any;
  isModalOpen: any;
}

const ListingItem = ({ user, listing, showModal }: ListingItemProps) => {
  const [hasFavorited, setHasFavorited] = useState<any>(false);
  
useEffect(() => {
    const existed = user?.favorites.some((f: string) => f === listing?._id);
    setHasFavorited(existed);
  }, [user]);

  const handleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    if (!listing) return;
    if (hasFavorited) {
      setHasFavorited(false);
      removeFavorite(listing);
    } else {
      setHasFavorited(true);
      makeFavorite(listing);
    }
  };

  if (!listing) return;
  return (
    <div className="grid z-10 w-full decoration-neutral-50 relative">
      <FaHeart 
        className={`${
          hasFavorited ? "text-primary-light" : "text-gray-300   "
        }  absolute top-0 right-0 rounded-md p-2 bg-[rgba(0,0,0,0.8)]  z-50 `}
        fontSize={40}
        onClick={
          user
            ? handleFavorite
            : (e: MouseEvent) => {
                e.preventDefault();
                showModal("login");
              }
        }
      />
      <img
        src={listing.images[0]?.url}
        alt="image"
        className="h-60 w-full object-cover z-10"
      />
      <div className="text-stone-700 py-4">
        <h2 className="text-xl">{listing.title}</h2>
        <h2 className="font-normal">{listing.location}</h2>
      </div>
     
    </div>
  );
};

export default ListingItem;
