import React from 'react'
import './Auth.css';
import { SignupForm } from './SignupForm';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { SigninForm } from './SigninForm';

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    // <div className="authContainer relative min-h-screen flex items-center justify-center">

    //   {/* Glass Login Card */}
    //   <div
    //     className="
    //       bgBlur relative z-10 h-[43rem] w-[39rem] rounded-xl
    //       bg-white/20 shadow-2xl shadow-white
    //       border border-white/10
    //       flex flex-col items-center justify-center
    //     "
    //   >

    // <div className="authContainer relative min-h-screen flex items-center justify-center px-4">
      <div className= "authContainer min-h-screen overflow-y-auto px-4 flex items-start sm:items-center justify-center">
         <div className="
          bgBlur relative z-10
          w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
          rounded-xl
          bg-white/20 shadow-2xl shadow-white
          border border-white/10
          flex flex-col items-center
          justify-center
          p-6 sm:p-8 md:p-8       
        ">



        <h1 className=" 
        text-white
          text-2xl sm:text-2xl md:text-4xl
          font-semibold
          pb-4 sm:pb-4
          text-center">
          Crypto Trading
        </h1>

        {location.pathname === "/signup" ? (
          <section className="w-full">
            <SignupForm onClose={() => navigate('/signin')} />

            <div className="flex items-center justify-center">
              <span className="p-1">Already have an account?</span>
              <Button onClick={() => navigate('/signin')} variant="outlined">
                Signin
              </Button>
            </div>
          </section>

        ) : location.pathname === "/forgot-password" ? (
          <section className="w-full">
            <ForgotPasswordForm />

            <div className="flex items-center justify-center mt-2">
              <span className="p-1">Back to Login</span>
              <Button onClick={() => navigate('/signin')} variant="outlined">
                Signin
              </Button>
            </div>
          </section>

        ) : (
          <section className="w-full">
            <SigninForm onClose={() => navigate('/')} />

            <div className="flex items-center justify-center">
              <span className="p-1">Don't have an account?</span>
              <Button onClick={() => navigate('/signup')} variant="outlined">
                Signup
              </Button>
            </div>

            <div className="mt-10 ">
              <Button
                
                onClick={() => navigate('/forgot-password')}
                // variant="outlined"
                className="w-full py-5"
              >
                Forgot Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
