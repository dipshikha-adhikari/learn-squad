import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import UserIcon from "../../assets/user.png";
import MenuIcon from "../../assets/icons8-menu-52.png";

const Right = ({ isModalOpen, showModal }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [isMenuOpen]);

  const handleClick = (e: any) => {
    if (!e.target.classList.contains("menu")) {
      closeMenu();
    }
  };

  return (
    <>
      <div
        className="flex menu  relative items-center cursor-pointer gap-2 rounded-lg  border-sm border-light py-1 px-2"
        onClick={handleMenu}
      >
        <img src={UserIcon} alt="" width={30} className="menu" />
        <img src={MenuIcon} alt="" width={20} className="menu" />
      </div>
      {isMenuOpen && (
        <UserMenu showModal={showModal} isModalOpen={isModalOpen} />
      )}
    </>
  );
};

export default Right;
