import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "@/State/Withdrawal/Action";

// ✅ Validation Schema
const PaymentSchema = Yup.object().shape({
  accountHolderName: Yup.string().required("Account holder name is required"),
  ifsc: Yup.string().required("IFSC code is required"),
  accountNumber: Yup.string().required("Account number is required"),
  confirmAccountNumber: Yup.string()
    .oneOf([Yup.ref("accountNumber"), null], "Account numbers must match")
    .required("Please confirm the account number"),
  bankName: Yup.string().required("Bank name is required"),
});

 

const handleSubmit = () => {
  
    console.log(PaymentSchema);
  };

export const PaymentDetailsForm = ({onClose}) => {

  const dispatch = useDispatch();

 
  return (
    <div className=" text-xl px-10 py-5 text-white">
      <h1 className="text-2xl font-semibold mb-6">Payment Details</h1>

      <Formik
        initialValues={{
          accountHolderName: "",
          ifsc: "",
          accountNumber: "",
          confirmAccountNumber: "",
          bankName: "",
        }}
        validationSchema={PaymentSchema}
        // onSubmit={(values) => {

        //   document.activeElement.blur();

        //   dispatch(           
        //     addPaymentDetails ({               
        //     paymentDetails:values,
        //     jwt:localStorage.getItem("jwt")
        //   }))

        //   console.log("Form Submitted:", values);
        //   onClose();
        // }}
        onSubmit={(values) => {
  document.activeElement.blur();

  const token = localStorage.getItem("jwt");
  
  if (token) {
    dispatch(addPaymentDetails({ 
      paymentDetails: values, 
      jwt: token.trim() // Trim here as an extra safety measure
    }));
  }

  console.log("Form Submitted:", values);
  onClose();
}}

        
      >
        {() => (
          <Form className="space-y-6" >
            {/* ACCOUNT HOLDER NAME */}
            <div>
              <label className="block mb-2">Account Holder Name</label>
              <Field
                name="accountHolderName"
                placeholder="Crypto Master"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="accountHolderName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* IFSC CODE */}
            <div>
              <label className="block mb-2">IFSC Code</label>
              <Field
                name="ifsc"
                placeholder="Bank IFSC code"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="ifsc"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* ACCOUNT NUMBER */}
            <div>
              <label className="block mb-2">Account Number</label>
              <Field
                name="accountNumber"
                placeholder="************5604"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="accountNumber"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* CONFIRM ACCOUNT NUMBER */}
            <div>
              <label className="block mb-2">Confirm Account Number</label>
              <Field
                name="confirmAccountNumber"
                placeholder="Reconfirm account number"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="confirmAccountNumber"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* BANK NAME */}
            <div>
              <label className="block mb-2">Bank Name</label>
              <Field
                name="bankName"
                placeholder="Yes Bank"
                className="w-full bg-transparent border border-gray-700 p-4 rounded-md outline-none"
              />
              <ErrorMessage
                name="bankName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* SUBMIT BUTTON */}          

            <DialogActions>

            <button

            // //   onClick={handleClose}
            //    onClick={() => {
            //     handleSubmit();
            //     onClose();           
            //      }}
              
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

export default PaymentDetailsForm;
