import React from "react";

import {defaultQuery} from "@/public/data/data";
import { useErrorContext } from "./ErrorContext";

const PromptContext = React.createContext();

function formatQuery(query) {
  let queryDemarc = ["[INSTRUCTIONS_STARTS]", "[INSTRUCTIONS_ENDS]"];
  let trimQuery = query.trim();
  let combinedQuery = `${queryDemarc[0]} ${trimQuery} ${queryDemarc[1]}`;
  return combinedQuery;
}

function formatJobDesc(desc) {
  let jobDescDemarc = ["[JOB_DESCRIPTION_STARTS]", "JOB_DESCRIPTION_ENDS"];
  let trimJobDesc = desc.trim();
  let combinedJobDesc = `${jobDescDemarc[0]} ${trimJobDesc} ${jobDescDemarc[1]}`;
  return combinedJobDesc;
}

function formatResume(resume) {
  // TODO: account for when resume is undefined
  try {
    let resumeDemarc = ["[RESUME_STARTS]", "[RESUME_ENDS]"];
    let trimResume = resume.trim();
    let combinedResume = `${resumeDemarc[0]} ${trimResume} ${resumeDemarc[1]}`;
    return combinedResume;
  } catch (TypeError) {
    console.error()
  }
}

function formatCoverLetter(letter) {
  // TODO: account for when letter is undefined
  try {
    let coverLetterDemarc = ["[COVER_LETTER_STARTS]", "[COVER_LETTER_ENDS]"];
    let trimCoverLetter = letter.trim();
    let combinedCoverLetter = `${coverLetterDemarc[0]} ${trimCoverLetter} ${coverLetterDemarc[1]}`;
    return combinedCoverLetter;
  } catch (TypeError) {
    console.error()
  }
}

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
      updateError(["query","description","resume","coverletter"],`Failure to update prompt:\n\n${error.message}`);
    };  
  };

  function formatPrompt() {
    let revisedQuery = formatQuery(statePrompt.query);
    // console.log(revisedQuery);
    let revisedJobDesc = formatJobDesc(statePrompt.description);
    let revisedResume = formatResume(statePrompt.resume.content);
    let revisedCoverLetter = formatCoverLetter(statePrompt.coverLetter.content);
    let revisedPrompt = `${revisedQuery} ${revisedJobDesc} ${revisedResume} ${revisedCoverLetter}`;
    // console.log(revisedPrompt);
    return JSON.stringify(revisedPrompt)
  }

  // console.log("PromptContext", statePrompt.query);
  // console.log("Description", statePrompt.description);
  // console.log("Resume", statePrompt.resume);
  // console.log("Resume content", statePrompt.resume.content)
  // console.log("Cover Letter", statePrompt.coverLetter.content);

  return <PromptContext.Provider value={{...statePrompt, updatePrompt, formatPrompt}}>
            {props.children}
          </PromptContext.Provider>
};