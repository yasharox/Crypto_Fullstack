import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DialogActions } from "@mui/material";

// ✅ Validation Schema (ONLY email)
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ForgotPasswordForm = ({ onClose }) => {
  return (
    <div className="text-xl py-1 px-8 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Forgot Password
      </h1>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => {
          console.log("Forgot Password Email:", values.email);
          onClose && onClose();
        }}
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

export default ForgotPasswordForm;
