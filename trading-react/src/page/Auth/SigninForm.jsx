import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

// ✅ Validation Schema (MATCHES form fields)
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SigninForm = ({ onClose }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(login({values, navigate}))
    console.log("Form Submitted:", values);
    onClose && onClose();

  };

  return (
    <div className="text-xl py-1 px-8 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="space-y-6">

            {/* Email */}
            <div>
              <Field
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Field
                name="password"
                type="password"
                placeholder="************"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <DialogActions>
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                Submit
              </button>
            </DialogActions>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
