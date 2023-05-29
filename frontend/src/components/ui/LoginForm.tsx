import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import Button from "./Button";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface LoginFormProps {
  handleLogin: (values: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  return (
    <div className="lg:w-[40%] p-4">
      <div>
        <h1 className="text-3xl">Log in</h1>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="h-10" />
            <div className="flex flex-col">
              <span className="opacity-50">Email address</span>
              <Field
                name="email"
                type="email"
                className={`border rounded h-[50px] outline-none p-2 ${
                  errors.email && touched.email && "border-red-500"
                }`}
              />
            </div>
            <div className="h-5" />
            <div className="flex flex-col">
              <span className="opacity-50">Password</span>
              <Field
                name="password"
                type="password"
                className={`border rounded h-[50px] outline-none p-2 ${
                  errors.password && touched.password && "border-red-500"
                }`}
              />
            </div>
            <div className="h-1" />
            <div className="flex items-center">
              <input type="checkbox" className="accent-black" />
              <span className="opacity-50 ml-2">Remember me</span>
            </div>
            <div className="h-5" />

            <div className="flex flex-col text-sm items-center">
              <p>
                By Continuing, you agree to the{" "}
                <a href="#" className="underline">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
                .
              </p>
              <div className="h-5" />
              {/* <button
                type="submit"
                className="border-black rounded w-full h-[50px] bg-black text-white font-bold hover:bg-transparent hover:text-black hover:border-2"
              >
                Login
              </button> */}
              <Button type="submit">Login</Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="h-[20px]" />
      <div className="flex flex-col justify-center items-center text-sm">
        <a href="#" className="font-bold underline ">
          Forgot your password ?
        </a>
        <p className="mt-4 ">
          <span className="opacity-60">Don't have an account ?</span>
          <Link to="/auth/register" className="opacity-100 ml-2 underline">
            Register
          </Link>
        </p>
      </div>
      <div className="h-10" />
    </div>
  );
};
export default LoginForm;
