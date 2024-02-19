import React from "react";
import {useRouter} from "next/router";

import { useContentContext } from "@/contexts/ContentContext";
import useRecords from "@/hooks/useRecords";
// import {defaultResumes} from "@/public/data/data.js";

export default function RecordsPage() {
  // state for selected record
  let [ stateRecordsPage, setStateRecordsPage] = React.useState({
    selectedRecord:null
  });
  // get request for all records
  // separate into resumes and cover letters
  let { recordsData , deleteRecord } = useRecords();
  let resumesData = recordsData.filter(item => item.is_resume);
  let coverLettersData = recordsData.filter(item => !item.is_resume);
  // access contentContext
  let { content_name, is_resume, content, updateContent } = useContentContext();
  let router = useRouter();

  // will remove item from local state if exists already
  // otherwise will add to local state
  function handlerUpdateRecords(item){
    if (stateRecordsPage.selectedRecord===item){
      setStateRecordsPage(prevState => ({...prevState, selectedRecord:null}))
    } else {
      setStateRecordsPage(prevState => ({...prevState, selectedRecord:item}))
    };
  };

  // generate the rows for resumes
  let resumeRows = resumesData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  
    return (
      <tr key={`resumeRow${idx}`}>
        <td><input 
              type="checkbox" 
              onClick={()=>handlerUpdateRecords(item)}
              checked={stateRecordsPage.selectedRecord && stateRecordsPage.selectedRecord.id === item.id}/></td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  // generate the rows for cover letters
  let coverLettersRows = coverLettersData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  
    return (
      <tr key={`coverLetterRow${idx}`}>
        <td><input 
              type="checkbox" 
              onClick={()=>handlerUpdateRecords(item)}
              checked={stateRecordsPage.selectedRecord && stateRecordsPage.selectedRecord.id === item.id}/></td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  // delete records from database and local state
  function handlerDeleteRecord(item){
    deleteRecord(item.id);
    handlerUpdateRecords(item);
  };

  // enable user to 
  function handlerEditRecord(item){
    // move record data to contentContext
    let info = { 
      content_name: item.name,
      content: item.content,
      owner: item.owner, 
      is_resume: item.is_resume,
      id: item.id
    };
    Object.entries(info).map(([key, value]) => {
      updateContent(key, value);
    });
    // remove record from local state
    handlerUpdateRecords(item);
    // move user to editandsave page
    router.push({
      pathname:"/editandsave"
    });
    
  };
  
  // console.log("Records Page: ", recordsData);
  return (
      <>
        <div>
          <div>
            <h2>Resumes</h2>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Modified</th>
                </tr>
              </thead>
              <tbody>
                {resumesData.length===0?
                <tr>
                  <td></td>
                  <td>no resumes on record</td>
                  <td></td>
                  <td></td>
                </tr>
                :resumeRows}
              </tbody>
            </table>
            {
              stateRecordsPage.selectedRecord && stateRecordsPage.selectedRecord.is_resume &&
            <div>
              <button
                onClick={()=>handlerDeleteRecord(stateRecordsPage.selectedRecord)}
              >
                DELETE
              </button>
              <br/>
              <button
                onClick={()=>handlerEditRecord(stateRecordsPage.selectedRecord)}
              >
                EDIT
              </button>
            </div>
            }
          </div>
          <br></br>
          <div>
            <h2>Cover Letters</h2>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Modified</th>
                </tr>
              </thead>
              <tbody>
              {coverLettersData.length===0?
                <tr>
                  <td></td>
                  <td>no cover letters on record</td>
                  <td></td>
                  <td></td>
                </tr>
                :coverLettersRows}
              </tbody>
            </table>
            {
              stateRecordsPage.selectedRecord && !stateRecordsPage.selectedRecord.is_resume &&
            <div>
              <button
                onClick={()=>handlerDeleteRecord(stateRecordsPage.selectedRecord)}
              >DELETE</button>
              <br></br>
              <button
                onClick={()=>handlerEditRecord(stateRecordsPage.selectedRecord)}
                >EDIT</button>
            </div>
            }
          </div>


        </div>
      </>
  );
}

