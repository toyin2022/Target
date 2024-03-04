import React, { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Formik,
  //   FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { object, string, number, date, InferType } from "yup";
import axios from "../apiConnection/axios";
import { toast } from "react-toastify";
import { setLogin } from "../stateManager/userSlice";

interface LoginInitialInterface {
  email: string;
  password: string;
  name?: string | undefined;
}
interface RegisterInitialInterface extends LoginInitialInterface {
  name?: string;
}

const LoginInitialValues: LoginInitialInterface = {
  email: "",
  password: "",
};

const RegisterInitialValues: RegisterInitialInterface = {
  email: "",
  password: "",
};

const registerValid = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
});

const loginValid = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
});

const Auth = () => {
  const [page, setPage] = useState("login");
  const isLogin = page === "login";
  const isRegister = page === "register";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    // let formData = await new FormData();
    // for (const property of Object.keys(values)) {
    //   await formData.append(property, values[property]);
    // }
    axios
      .post("/auth/register", values)
      .then((res) => {
        resetForm();
        toast("Registration successful!", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });

        setPage("login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setSubmitting(false);
      });
  };
  const handleLogin = (values: any, { setSubmitting, resetForm }: any) => {
    // console.log({ login: values });
    axios
      .post("/auth/login", values)
      .then((res) => {
        resetForm();
        dispatch(setLogin(res.data.user));

        navigate("/home");
        toast("Login successful!", {
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Something went wrong try again");
      });
  };

  const handleFormSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    if (isRegister) handleRegister(values, { setSubmitting, resetForm });
    if (isLogin) handleLogin(values, { setSubmitting, resetForm });

    setSubmitting(false);
  };

  return (
    <div className="h-[80vh] bg-slate-950 text-slate-200 flex mx-auto justify-around items-center flex-col ">
      <h1 className="text-xl text-center mx-auto">
        HI there! Welcome, please login to get started
      </h1>
      <Formik
        initialValues={isLogin ? LoginInitialValues : RegisterInitialValues}
        validationSchema={isLogin ? loginValid : registerValid}
        onSubmit={handleFormSubmit}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          touched,
          values,
          resetForm,
          setFieldValue,
          errors,
        }) => {
          const switchPages = () => {
            setPage("register");
            resetForm();
          };
          return (
            <form
              className="w-[90%] min-h-[70%] max-w-sm shadow-md shadow-slate-400 p-5 py-4 mx-auto mt-8"
              onSubmit={handleSubmit}
            >
              {isRegister && (
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="appearance-none bg-transparent border border-slate-800 rounded w-4/5 py-2 px-3 text-slate-300  leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block  text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="appearance-none bg-transparent border border-slate-800 rounded w-4/5 py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block  text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="appearance-none bg-transparent border border-slate-800 rounded w-4/5 py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {!isRegister && (
                <p
                  className="text-gray-400 mb-4 cursor-pointer"
                  onClick={switchPages}
                >
                  Click here to register
                </p>
              )}
              {isRegister && (
                <p
                  onClick={() => setPage("login")}
                  className=" cursor-pointer text-gray-400 mb-4  "
                >
                  Go back to login
                </p>
              )}

              {isLogin ? (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              )}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Auth;
