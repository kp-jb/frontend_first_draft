import React from "react";

import {defaultQuery} from "@/public/data/data";
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
  const [statePrompt, setStatePrompt] = React.useReducer(reducer, {
    query: defaultQuery,
    description: "",
    resume: "",
    coverLetter: ""
  });

  function updatePrompt (type, payload){
    try{
      setStatePrompt({type:type,payload:payload});    
    } catch(error){
      updateError(["query","description","resume","coverletter"],`Failure to update prompt:\n\n${error.message}`,false);
    };  
  };

  function formatQuery(query) {
    if (typeof query === "string" && query.length>0) {
      let queryDemarc = ["[INSTRUCTIONS_STARTS]", "[INSTRUCTIONS_ENDS]"];
      let trimQuery = query.trim();
      let combinedQuery = `${queryDemarc[0]} ${trimQuery} ${queryDemarc[1]}`;
      return combinedQuery;
    } else {
      updateError(["coverletter"],"Query instructions cannot be left empty.",false)
      return "";
    };
  };
  
  function formatJobDesc(desc) {
    if (typeof desc === "string" && desc.length>0){
      let jobDescDemarc = ["[JOB_DESCRIPTION_STARTS]", "JOB_DESCRIPTION_ENDS"];
      let trimJobDesc = desc.trim();
      let combinedJobDesc = `${jobDescDemarc[0]} ${trimJobDesc} ${jobDescDemarc[1]}`;
      return combinedJobDesc;
    } else {
      updateError(["coverletter"],"Job description cannot be left empty.",false)
      return "";
    };
  };
  
  function formatResume(resume) {
    if (typeof resume === "string" && resume.length>0){
      let resumeDemarc = ["[RESUME_STARTS]", "[RESUME_ENDS]"];
      let trimResume = resume.trim();
      let combinedResume = `${resumeDemarc[0]} ${trimResume} ${resumeDemarc[1]}`;
      return combinedResume;
    } else {
      updateError(["coverletter"],"Resume cannot be left empty.",false);
      return "";
    };
  };
  
  function formatCoverLetter(letter) {
    if (typeof letter === "string" && letter.length>0){
      let coverLetterDemarc = ["[COVER_LETTER_STARTS]", "[COVER_LETTER_ENDS]"];
      let trimCoverLetter = letter.trim();
      let combinedCoverLetter = `${coverLetterDemarc[0]} ${trimCoverLetter} ${coverLetterDemarc[1]}`;
      return combinedCoverLetter;
    } else {
      updateError(["coverletter"],"Cover letter cannot be left empty.",false);
      return "";
    };
  };

  function formatPrompt() {
    let revisedQuery = formatQuery(statePrompt.query);
    let revisedJobDesc = formatJobDesc(statePrompt.description);
    let revisedResume = formatResume(statePrompt.resume.content);
    let revisedCoverLetter = formatCoverLetter(statePrompt.coverLetter.content);
    let revisedPrompt = `${revisedQuery} ${revisedJobDesc} ${revisedResume} ${revisedCoverLetter}`;

    if (!revisedQuery || !revisedJobDesc || !revisedResume || !revisedCoverLetter){return ""};
    return JSON.stringify(revisedPrompt)
  };

  return <PromptContext.Provider value={{...statePrompt, updatePrompt, formatPrompt}}>
            {props.children}
          </PromptContext.Provider>
};