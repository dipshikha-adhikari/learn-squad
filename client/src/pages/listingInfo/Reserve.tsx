import { useEffect, useState } from "react";
import { IListing, IReservation, IUser } from "../../../types";
import { Button } from "antd";
import { privateRequest } from "../../requestMethod";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Calendar from "../../components/Calendar";
import { useModal } from "../../hooks/useModal";
import AuthModal from "../../components/modals/AuthModal";
import {  differenceInCalendarDays } from "date-fns";

type ReserveProps = {
  item: IListing | undefined;
  user: IUser | null;
};

const Reserve = ({ item }: ReserveProps) => {
  const[warnBox, setWarnBox] = useState(false)
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //  prevent adding reservation if the date is null or the date is not selected
  const [reservationDate, setReservationDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [guestsCount, setGuestsCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<IReservation>();
  const[night, setNights] = useState(0)
  const { user } = useCurrentUser();
  const { showModal, modalType, isModalOpen, handleCancel } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (item?.reservations !== undefined && user !== null) {
      checkIfAlreadyReserved(item, user);
    }
  }, [item, user]);
 

  useEffect(() => {
    if (item?.price !== undefined) {
      let timeDiff = differenceInCalendarDays(date.endDate, date.startDate);
      if (timeDiff === 0) {
        timeDiff = 1
      setNights(timeDiff)
      }
      setTotalPrice(timeDiff * item?.price);
      setNights(timeDiff)
    }
  }, [date]);

  // return reservation id if already reserved
  const checkIfAlreadyReserved = (array1: any, array2: IUser) => {
    const commonReservation = array1.reservations.filter((r: IReservation) =>
      array2.reservations.includes(r._id)
    );
    if (commonReservation) {
      setReservation(commonReservation[0]);
    }
  };
  const handleDecrement = () => {
    if (reservation) return;
    if (guestsCount > 1) {
      setGuestsCount((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (reservation) return;
    if (item?.guests !== undefined) {
      if (guestsCount < item?.guests) {
        setGuestsCount((prev) => prev + 1);
      }
    }
  };

  const handleReserve = async () => {
    if (!user) {
      showModal("login");
      return;
    }
    try {
      setIsLoading(true);

      // cancel reservation
      if (reservation) {
        await privateRequest.delete(`/api/v1/reservations/${reservation._id}`);
        toast.success("Success");
        setIsLoading(false);
        navigate("/reservations");
        return;
      }
      if (
        reservationDate.startDate === null ||
        reservationDate.endDate === null
      ) {
        toast.error("Please select a day");
        setIsLoading(false);
        return;
      }

      //create reservation
      await privateRequest.post(`/api/v1/reservations`, {
        totalPrice: totalPrice,
        guests: guestsCount,
        listing: item?._id,
        startDate: date.startDate,
        endDate: date.endDate,
      });
      setIsLoading(false);
      toast.success("Successfully reserved");
      navigate("/reservations");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Failed ");
    }
  };

  // delete listing -- only for the owner 

  const deleteListing  = async(id:string) => {
    try {
      toast.loading("Deleting..");
      await privateRequest.delete(`/api/v1/listings/${id}`);
      toast.success("Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    } finally {
      toast.dismiss();
      setWarnBox(false)
    }
  }

  return (
    <div className="flex-1 grid gap-4">
      <Calendar
        setDate={setDate}
        date={date}
        item={item}
        setReservationDate={setReservationDate}
      />
      <div className="border-sm border-light rounded-md grid gap-4 p-4">
        <h2>How many guests do you like?</h2>
        <div className="flex items-center  gap-4">
          <AiOutlineMinusCircle
            fontSize={30}
            onClick={handleDecrement}
            className="cursor-pointer text-primary-light"
          />
          <h2 className="text-2xl min-w-[20px]  text-center font-semibold">
            {guestsCount}
          </h2>
          <AiOutlinePlusCircle
            fontSize={30}
            onClick={handleIncrement}
            className="cursor-pointer text-secondary-dark "
          />
        </div>
      </div>
      <div className="flex justify-between items-center border-sm border-light p-2 h-fit mb-2 ">
      <h2 className="text-xl">${totalPrice} for {night} night</h2>
       
       {item !== undefined && item?.userId === user?._id ? <Button
          type="primary"
          danger
          onClick={() => setWarnBox(true)}
        >
          {" "}
        Delete Listing{" "}
        </Button> : <Button
          type="primary"
          danger
          onClick={handleReserve}
          loading={isLoading}
        >
          {  reservation ? "Delete" : "Reserve"}
        </Button> } 
      </div>
      {(modalType === "login" || modalType === "register") && (
        <AuthModal
          props={{ isModalOpen, handleCancel, modalType, showModal }}
        />
      )}
      {item !== undefined && warnBox && <div className="fixed p-10 border-sm bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ">
       <h2 className="py-4">Are you sure ?</h2>
       <div className="flex gap-4">
       <Button
          type="primary"
          danger
          onClick={() => deleteListing(item?._id)}
        >
          {" "}
        Yes{" "}
        </Button>
        <Button onClick={() => setWarnBox(false)}>No</Button>
       </div>
        </div>
        }
    </div>
  );
};

export default Reserve;
