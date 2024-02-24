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
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();

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
      updateError(["login"],"Failure to login:\n\nMust provide a email address and password.",false);
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
      updateError(["login"],"Failure to register:\n\nPasswords must match.",false);
    } else {
      registerFunction(first_name, last_name, email, registerPassword);
    };
  };

  // console.log("Login Page:", userData);
  return (
    <div className="h-full flex flex-row flex-nowrap justify-center overflow-y-auto">
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("login") && loading===false} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      {stateLoggingIn?
      
        <form className="h-full w-4/6 p-10 flex flex-col flex-nowrap items-center justify-center"
          onSubmit={handlerOnLogin}>
          <h2 className="p-5 text-2xl font-bold">LOGIN FORM:</h2>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            EMAIL:
            <input
              className="w-full mt-2 text-black border border-black lg:w-4/5 lg:mt-0 lg:ml-2"
              type="email"
              name="email"
              required
              value={stateLoginPage.email || ""}
              onChange={handlerOnChange}
            />
          </label>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            PASSWORD:
            <input
            className="w-full mt-2 text-black border border-black lg:w-4/5 lg:mt-0 lg:ml-2"
              required
              type="password"
              name="loginPassword"
            />
          </label>
          {loading && errorPages.includes("login")?
              <button 
              className="w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              type="button">
                LOADING...</button>:
              <button 
              className="w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              type="submit">
                LOGIN</button>}
          <p
            className="flex flex-col text-gray-100 lg:flex-row lg:flex-nowrap lg:justify-between"
            >Not a member? <button 
            className="ml-3 font-bold text-gray-100 hover:text-gray-400"
            type="button"
            onClick={handlerLoginOrRegistration}>
              Register</button></p>
        </form>
  
        :<form 
          className="h-full w-4/6 p-10 flex flex-col flex-nowrap items-center justify-center"
          onSubmit={handlerOnRegistration}>
          <h2
            className="p-5 text-2xl font-bold"
            >REGISTRATION FORM:</h2>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            FIRST NAME:
            <input
              className="w-full mt-2 text-black border border-black lg:w-3/5 lg:mt-0 lg:ml-2"
              required
              type="text"
              name="first_name"
              value={stateLoginPage.first_name || ""}
              onChange={handlerOnChange}
            />
          </label>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            LAST NAME:
            <input
              className="w-full mt-2 text-black border border-black lg:w-3/5 lg:mt-0 lg:ml-2"
              required
              type="text"
              name="last_name"
              value={stateLoginPage.last_name || ""}
              onChange={handlerOnChange}
            />
          </label>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            EMAIL:
            <input
              className="w-full mt-2 text-black border border-black lg:w-3/5 lg:mt-0 lg:ml-2"
              required
              type="email"
              name="email"
              value={stateLoginPage.email || ""}
              onChange={handlerOnChange}
            />
          </label>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            PASSWORD:
            <input
              className="w-full mt-2 text-black border border-black lg:w-3/5 lg:mt-0 lg:ml-2"
              required
              type="password"
              name="registerPassword"
            />
          </label>
          <label className="flex flex-col w-5/6 p-5 font-bold lg:flex-row lg:flex-nowrap lg:justify-between">
            CONFIRM PASSWORD:
            <input
              className="w-full mt-2 text-black border border-black lg:w-3/5 lg:mt-0 lg:ml-2"
              required
              type="password"
              name="confirmPassword"
            />
          </label>
          {loading && errorPages.includes("login")?
              <button 
              className="w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              type="button">
                LOADING...</button>:
              <button 
              className="w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              type="submit">
                REGISTER</button>}
          <p
            className="flex flex-col text-gray-100 lg:flex-row lg:flex-nowrap lg:justify-between"
            >Already a member?<button 
            className="ml-3 font-bold text-gray-100 hover:text-gray-400"
            type="button"
            onClick={handlerLoginOrRegistration}>
              Login</button></p>
        </form>
        }
    </div>
  );
}
