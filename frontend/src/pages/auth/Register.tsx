import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../../components/ui/RegisterForm";
import { selectUser, userLogin } from "../../state/userSlice/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
      dispatch(userLogin(data));
    }
  };
  return user ? (
    <Navigate to="/home" replace />
  ) : (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
