import React from "react";

import { defaultEditAndSave } from "@/public/data/data";
import { useErrorContext } from "./ErrorContext";

const ContentContext = React.createContext();

export function useContentContext() {
  return React.useContext(ContentContext);
};

export default function ContentProvider(props) {
  const {updateError} = useErrorContext();
  const [stateContent, setStateContent] = React.useState({
    content: defaultEditAndSave,
    is_resume: false,
    content_name: "",
  });

  function updateContent (type, newState){
    try{
      setStateContent((prevState) => ({...prevState, [type]: newState}));      
    } catch(error){
      updateError(["editandsave"],`Failure to update content: ${error.message}`);
    };  
  };

  console.log("ContentContext", stateContent);

  return <ContentContext.Provider value={{...stateContent, updateContent}}>
            {props.children}
          </ContentContext.Provider>
};