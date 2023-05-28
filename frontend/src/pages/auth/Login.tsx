import LoginForm from "../../components/ui/LoginForm";

const LoginPage = () => {
  const handleLogin = async (values: { email: string; password: string }) => {
    console.log(status);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
