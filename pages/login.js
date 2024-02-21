import React from "react";

import ErrorModal from "@/components/ErrorModal";
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";


export default function LoginPage() {
  // unpack useAuthContext to manage login
  let { userData, loginFunction, registerFunction } = useAuthContext();

  // set state for login page
  const [stateLoggingIn, setStateLoggingIn] = React.useState(true);
  // update user login info on login if stored in local storage
  const [stateLoginPage, setStateLoginPage] = React.useState(() => {
    let storedData = null
    if (typeof window !== 'undefined') {
      storedData = localStorage.getItem('stateLoginPage');
    }; 
    return storedData ? JSON.parse(storedData) : { first_name: '', last_name: '', email: '' };
  }
  );

  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();

  // change state between login and registration
  function handlerLoginOrRegistration() {
    setStateLoggingIn((prevState) => !prevState);
  };

  // update user info and save to local storage as needed
  function handlerOnChange(event) {
    const { name, value } = event.target;
    setStateLoginPage((prevData) => {
      const newState = { ...prevData, [name]: value };
      localStorage.setItem("stateLoginPage",JSON.stringify(newState));
      return newState});
  };

  // login user
  function handlerOnLogin(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.loginPassword.value;
    if (email && password){
      loginFunction(email,password)
    } else {
      updateError(["login"],"Failure to login:\n\nMust provide a email address and password.");
    };
  };

  // user registration
  function handlerOnRegistration(event) {
    event.preventDefault();
    let first_name = event.target.first_name.value;
    let last_name = event.target.last_name.value;
    let email = event.target.email.value;
    let registerPassword = event.target.registerPassword.value;
    let confirmPassword = event.target.confirmPassword.value;
    // console.log("Login Page:",first_name, last_name, email, registerPassword, confirmPassword);

    if (registerPassword !== confirmPassword){
      updateError(["login"],"Failure to register:\n\nPasswords must match.");
    } else {
      registerFunction(first_name, last_name, email, registerPassword);
    };
  };

  // console.log("Login Page:", userData);
  return (
    <div>
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("login")} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      {stateLoggingIn?

        <form onSubmit={handlerOnLogin}>
          <h2>LOGIN FORM:</h2>
          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={stateLoginPage.email || ""}
              onChange={handlerOnChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              required
              type="password"
              name="loginPassword"
            />
          </label>
          <br />
          <button 
            type="button"
            onClick={handlerLoginOrRegistration}>
              Register Instead</button>
          <button 
            type="submit">
              Login</button>
        </form>
  
        :<form onSubmit={handlerOnRegistration}>
          <h2>REGISTRATION FORM:</h2>
          <label>
            First Name:
            <input
              required
              type="text"
              name="first_name"
              value={stateLoginPage.first_name || ""}
              onChange={handlerOnChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              required
              type="text"
              name="last_name"
              value={stateLoginPage.last_name || ""}
              onChange={handlerOnChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              required
              type="email"
              name="email"
              value={stateLoginPage.email || ""}
              onChange={handlerOnChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              required
              type="password"
              name="registerPassword"
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              required
              type="password"
              name="confirmPassword"
            />
          </label>
          <br />
          <button 
            type="button"
            onClick={handlerLoginOrRegistration}>
              Login Instead</button>
          <button 
            type="submit">
              Register</button>
        </form>
        }
    </div>
  );
}
