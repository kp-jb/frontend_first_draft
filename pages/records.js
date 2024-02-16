import React from "react";
import {userRouter} from "next/router";

import useResumes from "@/hooks/useResumes";
import {defaultResumes} from "@/public/data/data.js";

export default function RecordsPage() {
  let { resumesData , deleteResume} = useResumes();
  let router = useRouter();

  let [ stateRecordsPage, setStateRecordsPage] = React.useState({
    selectedResume:null,
    selectedCoverLetter:null,
  });

  function handlerUpdateRecords(type,item){
    if (stateRecordsPage[type]===item){
      setStateRecordsPage(prevState => ({...prevState, [type]:null}))
    } else {
      setStateRecordsPage(prevState => ({...prevState, [type]:item}))
    };
  };

  let resumeRows = resumesData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  
    return (
      <tr key={`resumeRow${idx}`}>
        <td><input 
              type="checkbox" 
              onClick={()=>handlerUpdateRecords("selectedResume",item)}
              checked={stateRecordsPage.selectedResume && stateRecordsPage.selectedResume.id === item.id}/></td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  function handlerDeleteRecord(type, item){
    if (type==="resume"){
      deleteResume(item.id);
      handlerUpdateRecords("selectedResume",item);
    } else if (type === "coverLetter"){
      //TODO: enable user to delete cover letter
    };
  };

  function handlerEditRecord(type,item){
    if (type==="resume"){
      handlerUpdateRecords("selectedResume",item);
      router.push({
        pathname:"/editandsave",
        query:{data:encodeURIComponent({...item,isResume:true})}
      });
    } else if (type === "coverLetter"){
      //TODO: enable user to edit cover letter
    };
  };
  
  console.log("Records Page: ", resumesData);
  return (
      <>
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
              {resumeRows}
            </tbody>
          </table>
          {
            stateRecordsPage.selectedResume &&
          <div>
            <button
              onClick={()=>handlerDeleteRecord("resume", stateRecordsPage.selectedResume)}
            >DELETE</button>
            <br></br>
            <button
              onClick={()=>handlerEditRecord("resume", stateRecordsPage.selectedResume)}
              >EDIT</button>
          </div>
          }
        </div>
      </>
  );
}

