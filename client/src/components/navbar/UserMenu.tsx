import { CiLogin } from "react-icons/ci";
import { BiSolidUserCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import useAuthStore from "../../store/auth";

const UserMenu = ({showModal}:any) => {
const{handleLogout} = useLogout()
const token = useAuthStore(state => state.authToken)

  if (!token) {
    return (
      <div className="grid z-50 font-semibold menu gap-4  bg-white absolute  shadow-sm p-4 min-w-[250px] right-0 top-[12vh] ">
        <button
          className="flex gap-4  items-center"
          onClick={() => showModal('register')}
        >
          {" "}
          <BiSolidUserCheck fontSize={20} /> Sign up{" "}
        </button>
        <button
          className="flex  gap-4 items-center"
          onClick={() => showModal('login') }
        >
          {" "}
          <CiLogin fontSize={20}  /> Login{" "}
        </button>
        <button
          className="flex  gap-4 items-center"
          onClick={() =>showModal('login') }
        >
          {" "}
          Create listing{" "}
        </button>
      </div>
    )
  } else {
    return (
      <div className="grid text-black font-semibold gap-4 absolute z-50 bg-white shadow-sm min-w-[250px] p-4 right-0 top-[12vh]">
      <Link to='/account' className="link">Profile</Link>
      <Link to='/reservations' className="link">Trips</Link>
      <Link to='/wishlists'  className="link">Wishlists</Link>
        <button
          className="flex gap-4 items-center"
          onClick={() => showModal('createListing')}
        >
          {" "}
         Create listing{" "}
        </button>
          <button
            className="flex gap-4 items-center"
            onClick={handleLogout}
          >
            {" "}
            <CiLogin fontSize={20} /> Logout
          </button>
      </div>
    );
  }
};

export default UserMenu
