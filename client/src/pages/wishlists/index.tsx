import { useQuery } from "react-query";
import { IListing } from "../../../types";
import NoUser from "../../components/NoUser";
import { privateRequest } from "../../requestMethod";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import ListingItem from "../../components/listings/ListingItem";
import { useModal } from "../../hooks/useModal";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useAuthStore from "../../store/auth";

const Wishlists = () => {
  const { isModalOpen, showModal } = useModal();
  const { user } = useCurrentUser();
  const token = useAuthStore((state) => state.authToken);
  const {
    data: favorites,
    isError,
    isLoading,
  } = useQuery(["wishlists", user], async () => {
    if (!user) return;
    const result = await privateRequest.get("api/v1/favorites");
    return result.data as IListing[];
  });

  if (!token) return <NoUser />;
  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center">Try again!</div>;


  if (favorites !== undefined) {
    if (favorites.length !== 0) {
   return   <div className="grid py-2 gap-4">
        <h2 className="text-xl">Wishlists</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites?.map((f: IListing) => {
            return (
              <Link to={`/listings/${f._id}`} key={f._id}>
                <ListingItem
                  listing={f}
                  user={user}
                  isModalOpen={isModalOpen}
                  showModal={showModal}
                />
                <h2 className="mt-[-10px] text-black">${f.price}</h2>
              </Link>
            );
          })}{" "}
        </div>
      </div>;
    } else {
      return <div>You have no items in wishlists</div>;
    }
  }
};

export default Wishlists;
