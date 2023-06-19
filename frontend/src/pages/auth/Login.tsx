import axios from "axios";
import LoginForm from "../../components/ui/LoginForm";
import { useDispatch } from "react-redux";
import { loginAction } from "../../state/actions/userActions";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.userLogin.userInfo);

  const dispatch = useDispatch();
  const handleLogin = async (values: { email: string; password: string }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      values
    );

    if (data) {
      dispatch(loginAction(data));
    }
    // if (data) {

    //   localStorage.setItem("MOREDEVS_USER", JSON.stringify(data));
    // } else {
    //   localStorage.setItem("MOREDEVS_USER", JSON.stringify({}));
    // }
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
