import jwt from "jsonwebtoken";
import React from "react";

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
  const { updateError } = useErrorContext();
  const [stateAuth, setStateAuth] = React.useState({
    userData: null,
    // userData: {
    //   first_name:"john",
    //   last_name:"doe",
    //   email:"email",
    //   id:3030
    // },
    // userData: defaultUser,
    tokens:null,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    registerFunction: registerFunction,
  });

  // login user
  async function loginFunction(email, password) {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      };
      // console.log("AuthContext",options);
      const response = await fetch(tokenUrl, options);
      const data = await response.json();
      const decodedAccess = jwt.decode(data.access);
      const newState = {
        tokens: data,
        userData: {
          first_name: decodedAccess.first_name || "",
          last_name: decodedAccess.last_name || "",
          email: decodedAccess.email,
          id: decodedAccess.user_id,
        },
      };

      // set user data and token into state
      if (setStateAuth) {
        // Update the authentication state with the new data
        setStateAuth((prevState) => ({ ...prevState, ...newState }));
      } else {
        //TODO
        // console.error("AuthContext: setStateAuth is not defined");
      }

    // catch error if failure to login
    } catch(error){
      // console.log("AuthContext: Failure to login");
      updateError(["*"],`Failure to login: ${error.message}`);
    };
  };
    

  // logout user
  function logoutFunction() {
    // remove user data from state
    setStateAuth((prevState) => ({ ...prevState, tokens: null, userData: null }));
  };

  // register and login new user
  async function registerFunction(first_name, last_name, email, password) {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ first_name, last_name, email, password}),
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(registerUrl, options);
      console.log("AuthContext", response);

      if (response && response.ok){
        loginFunction(email, password);
      };

    } catch(error){
      console.log("AuthContext: Failure to register.");
      console.error(error);
      // updateError(["*"],`Failure to register: ${error.message}`);
    };
  };


  return (
    <AuthContext.Provider value={{...stateAuth, setStateAuth}}>
      {props.children}
    </AuthContext.Provider>
  );
}
