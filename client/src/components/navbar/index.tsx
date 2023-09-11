import Search from "./Search";
import Right from "./Right";
import NavbarBottom from "./NavbarBottom";
import AuthModal from "../modals/AuthModal";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import CreatelistingModal from "../modals/CreateListingModal";
import Logo from "../../assets/travelmate.png";

const Navbar = () => {
  const { showModal, isModalOpen, handleCancel, modalType } = useModal();

  return (
    <div className=" z-50 fixed left-0 top-0 w-full  bg-white  ">
      <div className="max-w-[1500px] h-[12vh] mx-auto p-4 sm:px-8 flex items-center justify-between    relative w-full  ">
        <Link to="/" className="text-primary-dark text-xl hidden md:block ">
          <img src={Logo} alt="logo" width={40} />
        </Link>
        <Search />
        <div className="menu hidden md:block">
          <Right isModalOpen={isModalOpen} showModal={showModal} />
        </div>
      </div>
      <NavbarBottom showModal={showModal} />
      {(modalType === "login" || modalType === "register") && (
        <AuthModal
          props={{ isModalOpen, handleCancel, modalType, showModal }}
        />
      )}
      {modalType === "createListing" && (
        <CreatelistingModal props={{ isModalOpen, handleCancel, modalType }} />
      )}
    </div>
  );
};

export default Navbar;
