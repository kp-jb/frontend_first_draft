import React from "react";


const ErrorContext = React.createContext();

export function useErrorContext() {
  return React.useContext(ErrorContext);
};

export default function ErrorProvider(props) {
  const [stateError, setStateError] = React.useState({
    pages:[],
    errorMessage:null
  })

  function updateError(newPages=[], newErrorMessage=null){
    setStateError(prevState => ({...prevState, pages:newPages, errorMessage:newErrorMessage}));
  };

  return <ErrorContext.Provider value={{...stateError, updateError}}>
            {props.children}
          </ErrorContext.Provider>
};