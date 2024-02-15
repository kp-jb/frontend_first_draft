import React from "react";
import { useAuthContext } from "@/contexts/AuthContext";


export default function LoginPage() {
  let { userData, loginFunction } = useAuthContext();

  const [stateLoginPage, setStateLoginPage] = React.useState(() => {
    let storedData = null
    if (typeof window !== 'undefined') {
      storedData = localStorage.getItem('stateLoginPage');
    }; 
    return storedData ? JSON.parse(storedData) : { first_name: '', last_name: '', email: '' };
  }
  );
  const [stateLoggingIn, setStateLoggingIn] = React.useState(true);

  React.useEffect(() => {
    const storedData = localStorage.getItem('stateLoginPage');
    if (storedData) {
      setStateLoginPage(JSON.parse(storedData));
    };
  }, []);


  function handlerLoginOrRegistration() {
    setStateLoggingIn((prevState) => !prevState);
  };

  function handlerOnChange(event) {
    const { name, value } = event.target;
    setStateLoginPage((prevData) => {
      const newState = { ...prevData, [name]: value };
      localStorage.setItem("stateLoginPage",JSON.stringify(newState));
      return newState});
  };

  function handlerOnLogin(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.loginPassword.value;
    if (email && password){
      loginFunction(email,password)
    } else {
      //TODO: raise proper error
      console.log("Login Page: failed to login", email, password);
    };
  };

  function handlerOnRegistration(event) {
    event.preventDefault();
    console.log(event.target);
  };

  console.log("Login Page:", userData);
  return (
    <>
      {stateLoggingIn?

      <form onSubmit={handlerOnLogin}>
        <h2>LOGIN FORM:</h2>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={stateLoginPage.email}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
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
            type="text"
            name="first_name"
            value={stateLoginPage.first_name}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={stateLoginPage.last_name}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={stateLoginPage.email}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="registerPassword"
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
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
    </>
  );
}
