import {  useState } from "react";
import { toast } from "react-hot-toast";
import { setAuthToken } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setAuthToken(null);
      logout()
      toast.success("success");
      setIsLoading(false);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toast.error("failed!");
    }
  };

  return {
    handleLogout,
    isLoading,
  };
};
