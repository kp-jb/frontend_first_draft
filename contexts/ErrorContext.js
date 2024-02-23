import React from "react";


const ErrorContext = React.createContext();

export function useErrorContext() {
  return React.useContext(ErrorContext);
};

export default function ErrorProvider(props) {
  const [stateError, setStateError] = React.useState({
    errorPages:[""],
    errorMessage:"",
    loading:false
  })

  function updateError(newErrorPages=[], newErrorMessage=null, newLoading=false){
    setStateError(prevState => ({...prevState, errorPages:newErrorPages, errorMessage:newErrorMessage, loading:newLoading}));
  };

  // console.log("ErrorContext",stateError.errorMessage);
  return <ErrorContext.Provider value={{...stateError, updateError}}>
            {props.children}
          </ErrorContext.Provider>
};