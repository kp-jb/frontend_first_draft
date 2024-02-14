import React from "react";

import defaultQuery from "@/public/data/data";
import { useErrorContext } from "./ErrorContext";

const PromptContext = React.createContext();

export function usePromptContext() {
  return React.useContext(PromptContext);
};

function reducer(state,action) {
  switch (action.type){
    case "query":
      return {...state, query:action.payload};
    case "description":
      return {...state, description:action.payload};
    case "resume":
      return {...state, resume:action.payload};
    case "coverLetter":
      return {...state, coverLetter:action.payload};
    default: 
      return state;
  }};

export default function PromptProvider(props) {
  const {updateError} = useErrorContext();
  const [statePrompt, setStatePrompt] = React.useReducer(reducer,{
      query: defaultQuery || "",
      description:"",
      resume:"",
      coverLetter:""})

  function updatePrompt (type, payload){
    try{
      setStatePrompt({type:type,payload:payload});      
    } catch(error){
      updateError(["query","description","resume","coverLetter"],`Failture to update prompt: ${error.message}`);
    };  
  };

  return <PromptContext.Provider value={{...statePrompt, updatePrompt}}>
            {props.children}
          </PromptContext.Provider>
};