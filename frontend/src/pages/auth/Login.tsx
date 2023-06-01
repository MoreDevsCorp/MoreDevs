import axios from "axios";
import LoginForm from "../../components/ui/LoginForm";

const LoginPage = () => {
  const handleLogin = async (values: { email: string; password: string }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        body: JSON.stringify({
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
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
