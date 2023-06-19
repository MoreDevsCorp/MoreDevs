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
      values
    );

    if (data) {
      localStorage.setItem("MOREDEVS_USER", JSON.stringify(data));
    } else {
      localStorage.setItem("MOREDEVS_USER", JSON.stringify({}));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
