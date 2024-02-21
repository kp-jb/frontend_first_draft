import axios from 'axios';
import jwt from "jsonwebtoken";
import React from "react";
import {useRouter} from "next/router";

import {useErrorContext} from "@/contexts/ErrorContext";
import { defaultUser } from "@/public/data/data";


const tokenUrl = process.env.NEXT_PUBLIC_API_URL + "api/token/";
const tokenRefreshUrl = process.env.NEXT_PUBLIC_API_URL + "api/token/refresh/";
const registerUrl = process.env.NEXT_PUBLIC_API_URL + "api/register/";
const AuthContext = React.createContext();

// create function to export context consumer
export function useAuthContext() {
  return React.useContext(AuthContext);
};

// create function to provide context
export default function AuthProvider(props) {
  const router = useRouter();
  const { updateError } = useErrorContext();
  const [stateAuth, setStateAuth] = React.useState({
    userData: null,
    tokens:null,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    registerFunction: registerFunction,
  });

    // login user
    function loginFunction(email, password) {
      const requestData = {
        email,
        password,
      };
      const options = {
        method: 'POST',
        url: tokenUrl,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(options)
        .then(response => {
          const data = response.data; 
          const decoded = jwt.decode(data.access);
          return {
            tokens: data,
            userData: {
              first_name: decoded.first_name || "",
              last_name: decoded.last_name || "",
              email: decoded.email,
              id: decoded.user_id,
            },
          };
        })
        .then(newState => setStateAuth(prevState => ({ ...prevState, ...newState })))
        .then(last => router.push("/records"))
        .catch(error => {
          // console.log("AuthContext:",error);
          updateError(["login"],`Failure to login:\n\nEmail or password is incorrect.`);});
    };
    

  // logout user
  function logoutFunction() {
    // remove user data from state
    setStateAuth((prevState) => ({ ...prevState, tokens: null, userData: null }));
    // return user to home page after logout
    router.push("/");
  };

  function registerFunction(first_name, last_name, email, password) {
    const requestData = {
      first_name,
      last_name,
      email,
      password,
    };
    const options = {
      method: 'POST',
      url: registerUrl,
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios(options)
      .then(response => {
        if (response && response.status == 201){
          loginFunction(email, password);
        } else {
          updateError(["login"],`Failure to login:`)
        }})
      .catch(error => updateError(["login"],`Failure to register:\n\nEmail is already registered.`));   
  };


  return (
    <AuthContext.Provider value={{...stateAuth, setStateAuth}}>
      {props.children}
    </AuthContext.Provider>
  );
}
