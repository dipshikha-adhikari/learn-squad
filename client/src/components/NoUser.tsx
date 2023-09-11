import AuthModal from "./modals/AuthModal";
import { Button } from "antd";
import { useModal } from "../hooks/useModal";

const NoUser = () => {
  const { showModal, isModalOpen, handleCancel, modalType } = useModal();

  return (
    <div className="text-center grid gap-4  py-20 place-content-center">
      <h2>You are not logged in</h2>
      <Button type="primary" danger onClick={() => showModal("login")}>
        Login
      </Button>

      {(modalType === "login" || modalType === "register") && (
        <AuthModal
          props={{ isModalOpen, handleCancel, modalType, showModal }}
        />
      )}
    </div>
  );
};

export default NoUser;
