import RegisterForm from "../../components/ui/RegisterForm";

const RegisterPage = () => {
  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    // if (values.password !== values.confirmPassword) {
    //   toast.error("Passwords do not match !");
    // }
    // const res = await fetch("http://localhost:3000/api/register", {
    //   body: JSON.stringify(values),
    //   method: "POST",
    // });
    // const data = await res.json();
    // console.log(data);
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
