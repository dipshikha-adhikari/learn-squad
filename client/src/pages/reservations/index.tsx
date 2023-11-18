import { privateRequest } from "../../requestMethod";
import { IReservation } from "../../../types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ListingItem from "../../components/listings/ListingItem";
import { useModal } from "../../hooks/useModal";
import { useQuery } from "react-query";
import { Button } from "antd";
import { Link } from "react-router-dom";
import NoUser from "../../components/NoUser";
import Loading from "../../components/Loading";
import useAuthStore from "../../store/auth";

const Reservations = () => {
  const { user } = useCurrentUser();
  const { showModal, isModalOpen } = useModal();
  const token = useAuthStore((state) => state.authToken);

  const { data, isError, isLoading } = useQuery(
    ["reservations", user],
    async () => {
    try{
      if (!user) return;
      const reservations =  await Promise.all(user?.reservations.map(async (r: string) => {
        const res = await privateRequest.get(`/api/v1/reservations/${r}`);
        return res.data as IReservation;
      }))
      return await Promise.all(reservations)
    }catch(err){
      throw new Error("Error fetching reservations"); 
    }
    }
  );

  if (!token) return <NoUser />;
  if (isLoading) return <Loading />;
  if (isError) return <div>Try again!</div>;
  
  if (data !== undefined && Array.isArray(data)) {
    return (
      <div>
        {data.length === 0 ? (
          <div className="grid gap-4 py-20 place-items-center">
            <p className="text-xl">You have no trips reserved</p>
            <Link to="/">
              <Button size="large" className="max-w-[200px] w-full  ">
                Reserve now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="">
            <h2 className="py-2 text-xl">Your reserved trips</h2>
            <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
              {
                data.map((i: IReservation, ind: number) => {
              if(i.listing === null) return <div>
                <p className="text-primary-dark">Listing has been deleted</p>
                <p className="font-semibold">Listing Id : {i._id}</p>
               </div>
                  let startDate = new Date(i.startDate).toLocaleDateString();
                  let endDate = new Date(i.endDate).toLocaleDateString();

                  return (
                    <Link
                      to={`/listings/${i.listing._id}`}
                      key={i._id + ind}
                      className="link cursor-pointer"
                    >
                      <ListingItem
                        user={user}
                        listing={i.listing}
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                      />
                      <div>
                        <h2 className="">${i.totalPrice} total</h2>
                        <h2 className="text-gray-500">
                          {startDate} - {endDate}{" "}
                        </h2>
                        <div className="flex gap-4">
                          <span>{i.guests} guests</span>{" "}
                          <span>{i.listing.rooms} rooms</span>{" "}
                          <span>{i.listing.bathrooms} bathrooms</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>)
  } 
};

export default Reservations;
