import { Modal } from "antd";
import {useEffect, useState } from "react";
import Category from "../createListing/Category";
import Description from "../createListing/Description";
import Images from "../createListing/Images";
import Location from "../createListing/Location";
import Price from "../createListing/Price";
import { Button } from "antd";
import { toast } from "react-hot-toast";
import { ICreateListModal } from "../../../types";
import { createlisting, updateListing } from "../../actions/handleListing.ts";
import useListingStore from "../../store/listing.ts";
import Rooms from "../createListing/Rooms.tsx";

let STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  IMAGES: 2,
  ROOMS:3,
  PRICE: 4,
  DESCRIPTION: 5
 
};

interface ICreateListModalProps {
  props: ICreateListModal;
}

const CreatelistingModal = ({ props }: ICreateListModalProps) => {
  const { handleCancel, isModalOpen } = props;
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
const listing = useListingStore(state => state.listing)
const resetListing = useListingStore(state => state.resetListing)

  useEffect(() => {
    if (
      (step === 0 && listing.category === "") ||
      (step === 1 && listing.location === "") ||
      (step === 2 && listing.images.length === 0) ||
      (step === 4 &&
        (listing.price === 0 || listing.price === "")) ||
      (step === 5 &&
        (listing.title === "" || listing.description === ""))
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [listing, step]);

  const handleNext = () => {
    setWarning("");
    if (!buttonDisabled) {
      setStep((prev) => prev + 1);
    } else {
      setWarning("Please fill all the fields");
      setTimeout(() => {
        setWarning("");
      }, 5000);
    }
  };

  const handlePrev = async () => {
    setStep((prev) => prev - 1);
    setWarning("");
  };

  
  const handleSubmit = async () => {
    if (props.modalType === "createListing") {
      try {
        setIsLoading(true);
        await createlisting(listing,resetListing, props.handleCancel);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Failed to create");
      } 
    
    } else {
      try {
        setIsLoading(true);
      await updateListing(listing, resetListing,  props.handleCancel);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Failed to update");
      
      }
    }
  };

  
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      className="h-screen modal top-4 z-0 "
    >
      <div className="grid  gap-4">
        <h2 className=" font-bold text-center border-b-sm pb-2 border-light">
          Be a travel mate.
        </h2>

        {step === STEPS.CATEGORY && <Category />}
        {step === STEPS.DESCRIPTION && <Description />}
        {step === STEPS.IMAGES && <Images modalType={props.modalType} />}
        {step === STEPS.ROOMS && <Rooms/>}
        {step === STEPS.LOCATION && <Location />}
        {step === STEPS.PRICE && <Price />}

        <div className="flex gap-4 justify-center">
          {step !== 0 && <Button onClick={handlePrev}>Back</Button>}
          {step !== Object.entries(STEPS).length - 1 && (
            <Button
              className="bg-primary-light w-full text-white "
              type="primary"
              danger
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {step === Object.entries(STEPS).length - 1 && (
            <Button
              className=" disabled:opacity-50 text-white"
              onClick={handleSubmit}
              disabled={buttonDisabled || isLoading}
              danger
              type="primary"
            >
              {props.modalType === "createListing" ? "Create" : "Update"}
            </Button>
          )}
        </div>
        {warning !== "" && (
          <span className="text-primary-light text-center">{warning}</span>
        )}
      </div>
    </Modal>
  );
};

export default CreatelistingModal;
