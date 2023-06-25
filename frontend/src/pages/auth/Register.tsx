import { toast } from "react-hot-toast";
import RegisterForm from "../../components/ui/RegisterForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { loginAction } from "../../state/actions/userActions";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userLogin.userInfo);

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
      dispatch(loginAction(data));
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
