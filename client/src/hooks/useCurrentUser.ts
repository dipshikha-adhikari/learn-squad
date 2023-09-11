import { useEffect, useState } from "react";
import { privateRequest, setAuthToken } from "../requestMethod";
import { IUser } from "../../types";
import jwt_decode from "jwt-decode";
import useAuthStore from "../store/auth";

interface UserProps {
    user:IUser | null;
    isLoading:boolean
}
interface DecodedToken {
  sub: string;
  exp: number;
}

export function useCurrentUser(): UserProps {
  const [user, setUser] = useState(null);
  const[isLoading, setIsLoading] = useState(false)
  const auth = useAuthStore()
const logOut = useAuthStore(state => state.logout)
const login = useAuthStore(state => state.login)

const token = localStorage.getItem("token");
const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    if (parsedToken !== null) {
      setIsLoading(true)
      const decodedToken = jwt_decode<DecodedToken>(parsedToken);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

      if (decodedToken.exp < currentTimestamp) {
        console.log("Token has expired");
        logOut()
      } else {
        console.log("Token is still valid");
        setAuthToken(parsedToken);
        login(parsedToken)
      }
      setIsLoading(false)
    }

  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      if(parsedToken) {
        setIsLoading(true)
        try {
          const res = await privateRequest.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/current`
          );
          setUser(res.data);
          setIsLoading(false)
        } catch (err) {
          console.log(err);
          setUser(null);
          setIsLoading(false)
        }
      }else{
        setUser(null)
        setIsLoading(false)
      }
     
    };
    getCurrentUser();
  }, [auth.authToken]);


  return {user, isLoading}
}
