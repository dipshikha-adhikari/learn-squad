import { Button, Card } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import AuthModal from "../../components/modals/AuthModal";
import { useLogout } from "../../hooks/useLogout";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import NoUser from "../../components/NoUser";
import useAuthStore from "../../store/auth";

const Profile = () => {
  const { showModal, modalType, isModalOpen, handleCancel } = useModal();
  const { handleLogout, isLoading } = useLogout();
const{user} = useCurrentUser()
const token = useAuthStore(state => state.authToken)
  if (!token)  return <NoUser/>

  return (
    <div className="max-w-2xl grid mx-auto gap-4   ">
      <h2 className="font-bol text-2xl">Profile</h2>
      <div className="flex gap-4 w-full sm:gap-10 items-center border-b-sm pb-4">
        <span className="bg-stone-900 h-10 w-10 sm:w-20 sm:h-20 flex items-center justify-center text-xl text-white rounded-full">
          B
        </span>
        <div className="grid gap-2">
          <span className="font-semibold">{user?.name}</span>
        </div>
        <span className=" flex-1  flex justify-end ">
          <FaArrowRight />
        </span>
      </div>

      <Link to="/listings">
        <Card size="small">
          <h2 className="text-2xl">Hosting</h2>
          <p className="py-4 text-lg font-normal">Manage your listings</p>
        </Card>
      </Link>
      <Link to="/reservations">
        <Card size="small">
          <p className="text-xl">Reservation</p>
          <p className="py-4 text-lg font-normal">Manage your trips</p>
        </Card>
      </Link>
      <Button
        type="primary"
        className="w-full max-w-[200px] "
        loading={isLoading}
        danger
        onClick={handleLogout}
      >
        Log out
      </Button>

      {(modalType === "login" || modalType === "register") && (
        <AuthModal
          props={{ isModalOpen, handleCancel, modalType, showModal }}
        />
      )}
    </div>
  );
};

export default Profile;
