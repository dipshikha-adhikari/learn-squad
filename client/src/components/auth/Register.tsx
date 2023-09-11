import { useState } from "react";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { publicRequest } from "../../requestMethod";

const validation = Yup.object().shape({
  email: Yup.string()
    .required("email is required")
    .email("Invalid email address"),
    name: Yup.string()
    .required("name is required")
    .max(40, "Password must not exceed 40 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

interface UserProps {
  email: string;
  name:string;
  password: string;
  confirmPassword: string;
}

const Register = ({  showModal}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserProps>({ resolver: yupResolver(validation) });
 
  const handleRegister: SubmitHandler<UserProps> = async (data) => {
    setIsLoading(true);
  
    try {
     await publicRequest.post(`/api/v1/auth/register`, data);
      setIsLoading(false);
      toast.success("Successfully registered");
      showModal('login')
      
    } catch (err:any) {
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
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} placeholder="Full name" />}
      />
      {errors.name && (
        <span style={{ color: "red" }}>{errors.name.message}</span>
      )}
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
        render={({ field }) => (
          <Input {...field} type="password" placeholder="Password" />
        )}
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password.message}</span>
      )}
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input {...field} type="password" placeholder="Confirm Password" />
        )}
      />
      {errors.confirmPassword && (
        <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
      )}
      <Button
        className="  w-full text-white"
        type="primary"
        danger
        loading={isLoading}
        onClick={handleSubmit(handleRegister)}
      >
        Create
      </Button>
      {errorMsg !== "" && (
        <span className="text-center text-primary-light">{errorMsg}</span>
      )}

    </div>
  );
};

export default Register;
