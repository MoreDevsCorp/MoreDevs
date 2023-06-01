import { toast } from "react-hot-toast";
import RegisterForm from "../../components/ui/RegisterForm";
import axios from "axios";

const RegisterPage = () => {
  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match !");
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
