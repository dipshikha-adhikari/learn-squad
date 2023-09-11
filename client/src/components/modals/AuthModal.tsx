import { memo } from "react";
import { Modal } from "antd";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { IAuthModal } from "../../../types";

interface AuthModalProps {
  props: IAuthModal;
}

const AuthModal = ({ props }: AuthModalProps) => {
  const { isModalOpen, handleCancel, modalType, showModal } = props;

  return (
    <>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <h2 className="text-center font-bold border-b-sm pb-2  border-light">
          Log in or sign up
        </h2>

        <div className="grid gap-2">
          <h2 className="text-xl font-bold pt-2">Welcome to Airbnb</h2>
          {modalType === "register" && (
            <Register handleCancel={handleCancel} showModal={showModal} />
          )}
          {modalType === "login" && (
            <Login handleCancel={handleCancel} showModal={showModal} />
          )}
          <div className=" flex items-center gap-2 ">
            <span className="h-[.5px] w-full bg-gray-300"></span>
            or
            <span className="h-[.5px] w-full bg-gray-300"></span>
          </div>
          <div></div>
          {modalType === "login" && (
            <p className="text-center cursor-pointer">
              {" "}
              Don't have an account ?{" "}
              <span
                className="text-blue-500"
                onClick={() => {
                  showModal("register");
                }}
              >
                {" "}
                Sign up{" "}
              </span>{" "}
            </p>
          )}
          {modalType === "register" && (
            <p className="text-center cursor-pointer">
              {" "}
              Already have an account ?{" "}
              <span
                className="text-blue-500"
                onClick={() => {
                  showModal("login");
                }}
              >
                {" "}
                Login{" "}
              </span>{" "}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo(AuthModal);
