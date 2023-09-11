import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidUserCircle, BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {MdOutlineCreateNewFolder} from 'react-icons/md'
import { SiAirbnb } from "react-icons/si";
import useAuthStore from "../../store/auth";

const NavbarBottom = ({showModal}:any) => {
const state = useAuthStore()

  return (
    <div className="md:hidden z-50 h-[10vh] bottom-0 w-full font-medium text-dark-light bg-white left-0 fixed  py-2 flex justify-between px-4 sm:px-10">
      <Link to='/' className="grid  text-dark-light place-items-center text-sm gap-1 ">
        <BiHomeAlt fontSize={20} />
        Home
      </Link>
      <Link to="/reservations" className="grid  place-items-center text-dark-light text-sm gap-1">
          <SiAirbnb fontSize={20}/>
          Trips
        </Link>
      <Link to='/wishlists' className="grid place-items-center text-dark-light text-sm gap-1 ">
        <AiOutlineHeart fontSize={20} />
        Wishlists
      </Link>
      {state.authToken ? (
        <Link
          to="/account"
          className="grid place-items-center gap-1 text-dark-light  text-sm"
        >
          <BiSolidUserCircle fontSize={20} /> Profile
        </Link>
      ) : (
        <button
          className="grid place-items-center gap-1 text-dark-light text-sm"
          onClick={() => {
            showModal('login')
          }}
        >
          <BiSolidUserCircle fontSize={20} /> Log in
        </button>
      )}
      <button
        className="grid place-items-center gap-1 text-sm"
        onClick={
        
     () =>  {state.authToken ?  showModal('createListing') :  showModal('login')}
        }
      >
        <MdOutlineCreateNewFolder fontSize={20} /> Create
      </button>
        </div>
  );
};

export default NavbarBottom



