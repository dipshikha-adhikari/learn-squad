import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { publicRequest, setAuthToken } from "../../requestMethod";
import { toast } from "react-hot-toast";
import useAuthStore from "../../store/auth";

const validation = Yup.object().shape({
  email: Yup.string()
    .required("email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

interface UserProps {
  email: string;
  password: string;
}

const Login = ({ handleCancel }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const login = useAuthStore((state) => state.login);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserProps>({ resolver: yupResolver(validation) });

  const handleLogin = async (data: UserProps) => {
    try {
      setIsLoading(true);
      const res = await publicRequest.post(`/api/v1/auth/login`, data);
      setIsLoading(false);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setAuthToken(res.data.token);
      login(res.data.token);
      handleCancel();
      toast.success("Login successfull");
    } catch (err: any) {
      console.log(err);
      if (!err.response) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(err.response.data.msg);
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} placeholder="Email" />}
      />
      {errors.email && (
        <span style={{ color: "red" }}>{errors.email.message}</span>
      )}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} placeholder="Password" />}
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password.message}</span>
      )}
      <Button
        type="primary"
        danger
        loading={isLoading}
        className="bg-primary-dark w-full  text-white"
        onClick={handleSubmit(handleLogin)}
      >
       Login
      </Button>
      {errorMsg !== "" && (
        <span className="text-primary-light">{errorMsg} </span>
      )}
    </div>
  );
};

export default Login;
