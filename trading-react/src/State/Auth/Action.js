//Action.js

import axios from "axios"

import { GET_USER_FAILURE,
         GET_USER_REQUEST,
         GET_USER_SUCCESS,
         LOGIN_FAILURE,
         LOGIN_REQUEST,
         LOGIN_SUCCESS,
         LOGOUT,
         REGISTER_FAILURE,
         REGISTER_REQUEST,
         REGISTER_SUCCESS 
        } from "./ActionType";


// const baseURL ="http://localhost:8088";

const baseURL ="https://crypto-server-springboot-production.up.railway.app";

//Method 1: Register
export  const register = ( userData) => async(dispatch) => {

    dispatch({ type:REGISTER_REQUEST});
        
    try {
            const response = await axios.post(`${baseURL}/auth/signup`, userData);
            const user = response.data;
            // console.log(user);

            dispatch ( { type:REGISTER_SUCCESS, payload:user.jwt});
            localStorage.setItem("jwt", user.jwt)
        }

     catch (error) {

        dispatch({type:REGISTER_FAILURE, payload:error.message})
        console.log (error);
    }
}


//Method 2: Login
export  const login = ( userData) => async(dispatch)=>{

    dispatch({ type:LOGIN_REQUEST});
       
    try {
            const response = await axios.post(`${baseURL}/auth/signin`, userData.values);
            const user = response.data;
            // console.log(user);

             // If your backend returns the token in a field called 'jwt'
            if (user.jwt) {
            dispatch ( { type:LOGIN_SUCCESS, payload:user.jwt});
            localStorage.setItem("jwt", user.jwt);
            userData.navigate("/")
          

            dispatch(getUser(user.jwt));
            console.log("Login Success, JWT stored and fetching user profile:", user.jwt);
        }else {
            // ERROR: If 'user.jwt' is undefined, localstorage won't update==
            console.error("JWT not found in response. Check backend response body.");
        }
    }catch (error) {
        dispatch({type:LOGIN_FAILURE, payload:error.message})
        console.log (error);
    }
}


//Method 3: getUser
export  const getUser = (jwt) => async(dispatch)=>{

    dispatch({ type:GET_USER_REQUEST})
     
    try {
            const response = await axios.get(`${baseURL}/api/users/profile`, {

                headers:{
                    Authorization:`Bearer ${jwt}`,
                },

            });

            const user = response.data;
            console.log(user);

            dispatch ( { type:GET_USER_SUCCESS, payload:user})
        }
     catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error.message})
        console.log (error);
    }
}

export const logout = () =>(dispatch) =>{
     localStorage.clear();
    dispatch ( { type:LOGOUT, });
}