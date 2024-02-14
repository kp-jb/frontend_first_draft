import React from "react";

import {useErrorContext} from "@/contexts/ErrorContext";

const PageContext = React.createContext();

export function usePageContext() {
  return React.useContext(PageContext);
};

export default function PageProvider(props) {
  const {updateError} = useErrorContext();
  const [statePage, setStatePage] = React.useState({
    page:""
  });

  function updatePage (newPage){
    try{
      setStatePage(prevState => ({...prevState, page:newPage}));      
    } catch(error){
      updateError(["*"],`Failture updating page: ${error.message}`);
    };
  };

  return <PageContext.Provider value={{...statePage, updatePage}}>
            {props.children}
          </PageContext.Provider>
};