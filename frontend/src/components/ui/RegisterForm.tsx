import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import Button from "./Button";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(12, "Too short !"),
  confirmPassword: Yup.string().required("Required").min(12, "Too short !"),
});

interface LoginFormProps {
  handleRegister: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleRegister }) => {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-3xl">Register</h1>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className=" pt-10">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col sm:items-center sm:flex-row ">
                <span className="opacity-50  sm:w-[20%] md:w-auto">
                  First Name
                </span>

                <Field
                  name="firstName"
                  className={`sm:flex-1 mx-2 border rounded h-[50px] outline-none p-2  ${
                    errors.firstName && touched.firstName && "border-red-400"
                  }`}
                />
                {/* {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null} */}
              </div>
              <div className="h-4" />
              <div className="flex flex-col sm:items-center sm:flex-row ">
                <span className="opacity-50  sm:w-[20%] md:w-auto">
                  Last Name
                </span>

                <Field
                  name="lastName"
                  className={`sm:flex-1 mx-2 border rounded h-[50px] outline-none p-2 ${
                    errors.lastName && touched.lastName && "border-red-400"
                  }`}
                />
                {/* {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null} */}
              </div>
            </div>
            <div className="h-4" />

            <div className="flex flex-col sm:items-center sm:flex-row ">
              <span className="opacity-50 sm:w-[20%]">Email</span>

              <Field
                name="email"
                type="email"
                className={` sm:flex-1 mx-2 border rounded h-[50px] outline-none p-2 ${
                  errors.email && touched.email && "border-red-400"
                }`}
              />
              {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
            </div>
            <div className="h-4" />

            <div className="flex flex-col sm:items-center sm:flex-row ">
              <span className="opacity-50 sm:w-[20%]">Password</span>

              <Field
                name="password"
                type="password"
                className={` sm:flex-1 mx-2 border rounded h-[50px] outline-none p-2 ${
                  errors.password && touched.password && "border-red-400"
                }`}
              />
              {/* {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null} */}
            </div>
            <div className="h-4" />

            <div className="flex flex-col sm:items-center sm:flex-row ">
              <span className="opacity-50 sm:w-[20%]">Confirm Password</span>

              <Field
                name="confirmPassword"
                type="password"
                className={`sm:flex-1 mx-2 border rounded h-[50px] outline-none p-2 ${
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  "border-red-400"
                }`}
              />
              {/* {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null} */}
            </div>
            <div className="h-10" />
            <div className=" flex flex-col text-sm items-center">
              <p className="text-zinc-400">
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
                className="border-black  rounded w-full h-[50px] bg-black text-white font-bold hover:bg-transparent hover:text-black hover:border-2"
              >
                Register
              </button> */}
              <Button type="submit">Register</Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center text-sm">
        <p className="mt-4">
          <span className="opacity-60">Already have an account ?</span>
          <Link to="/auth/login" className="opacity-100 ml-2 underline">
            Login
          </Link>
        </p>
      </div>
      <div className="h-8" />
      {/* <div className="flex flex-col items-center">
        <p className="opacity-70">Or Continue with</p>
        <div className="flex items-center mt-2">
          <button onClick={() => signIn("google")}>
            <FaGoogle size={23} />
          </button>
          <button className="mx-2" onClick={() => signIn("github")}>
            <FaGithub size={25} />
          </button>
          <button onClick={() => signIn("linkedIn")}>
            <FaLinkedin size={25} />
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default LoginForm;
