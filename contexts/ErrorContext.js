import React from "react";


const ErrorContext = React.createContext();

export function useErrorContext() {
  return React.useContext(ErrorContext);
};

export default function ErrorProvider(props) {
  const [stateError, setStateError] = React.useState({
    errorPages:[],
    errorMessage:null
  })

  function updateError(newErrorPages=[], newErrorMessage=null){
    setStateError(prevState => ({...prevState, errorPages:newErrorPages, errorMessage:newErrorMessage}));
  };

  // console.log("ErrorContext",stateError.errorMessage);
  return <ErrorContext.Provider value={{...stateError, updateError}}>
            {props.children}
          </ErrorContext.Provider>
};