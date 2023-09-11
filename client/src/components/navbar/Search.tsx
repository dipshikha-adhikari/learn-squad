import { memo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { useModal } from "../../hooks/useModal";
import SearchModal from "../modals/search/SearchModal";

const Search = () => {
  const{showModal, modalType, handleCancel, isModalOpen} = useModal()

  return (
    <>
    <div className="flex border-md   cursor-pointer border-light gap-2 items-center w-full rounded-lg p-2 md:max-w-lg" onClick={() => showModal('search')}>
      <i className="md:hidden">
        <AiOutlineSearch fontSize={20} />
      </i>
      <div className="grid md:gap-10 md:flex items-center flex-1  ">
        <span className="font-bold">Anywhere</span>
        <div className="flex items-center gap-2 md:gap-10 flex-1">
          <span className="text-sm">Any week</span>
          <span className="text-sm">Any guests</span>
        </div>
      </div>
      <i className="md:hidden">
        {" "}
        <PiSlidersHorizontalBold fontSize={20} />
      </i>
      <i className="md:block hidden bg-primary-light rounded-full p-2 text-white">
        <AiOutlineSearch fontSize={20} />
      </i>
    </div>
    {modalType === 'search' && <SearchModal handleCancel={handleCancel} isModalOpen={isModalOpen} modalType={modalType}/>}

    </>
  );
};

export default memo(Search)
