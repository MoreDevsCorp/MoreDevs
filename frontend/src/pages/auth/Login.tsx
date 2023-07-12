import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/ui/LoginForm";
import { selectUser, userLogin } from "../../state/userSlice/userSlice";

const LoginPage = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleLogin = async (values: { email: string; password: string }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}auth/login`,
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
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
