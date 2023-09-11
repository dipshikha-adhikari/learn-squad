import { useState } from "react";
import useListingStore from "../store/listing";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const resetListing = useListingStore(state => state.resetListing)

  function showModal(type: string) {
    setIsModalOpen(true);
    setModalType(type);
  }

  function handleCancel() {
    setIsModalOpen(false);
    resetListing()
  }

  return {
    isModalOpen, modalType, showModal, handleCancel
  }
};
