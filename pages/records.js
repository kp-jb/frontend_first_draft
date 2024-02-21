import React from "react";
import { useRouter } from "next/router";

import ErrorModal from "@/components/ErrorModal";
import NoRecords from "@/components/NoRecords";
import { useContentContext } from "@/contexts/ContentContext";
import { useErrorContext } from "@/contexts/ErrorContext";
import useRecords from "@/hooks/useRecords";
// import {defaultResumes} from "@/public/data/data.js";

export default function RecordsPage() {
  // state for selected record
  let [stateRecordsPage, setStateRecordsPage] = React.useState({
    selectedRecord: null,
  });
  // get request for all records
  // separate into resumes and cover letters
  let { recordsData, deleteRecord } = useRecords();
  let resumesData = recordsData.filter((item) => item.is_resume);
  let coverLettersData = recordsData.filter((item) => !item.is_resume);
  // access contentContext
  let { content_name, is_resume, content, updateContent } = useContentContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let router = useRouter();


  // will remove item from local state if exists already
  // otherwise will add to local state
  function handlerUpdateRecords(item) {
    if (stateRecordsPage.selectedRecord === item) {
      setStateRecordsPage((prevState) => ({
        ...prevState,
        selectedRecord: null,
      }));
    } else {
      setStateRecordsPage((prevState) => ({
        ...prevState,
        selectedRecord: item,
      }));
    }
  }

  // generate the rows for resumes
  let resumeRows = resumesData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };

    return (
      <tr key={`resumeRow${idx}`}>
        <td>
          <input
            type="checkbox"
            onClick={() => handlerUpdateRecords(item)}
            checked={
              stateRecordsPage.selectedRecord &&
              stateRecordsPage.selectedRecord.id === item.id
            }
          />
        </td>
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

    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };

    return (
      <tr key={`coverLetterRow${idx}`}>
        <td>
          <input
            type="checkbox"
            onClick={() => handlerUpdateRecords(item)}
            checked={
              stateRecordsPage.selectedRecord &&
              stateRecordsPage.selectedRecord.id === item.id
            }
          />
        </td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  // delete records from database and local state
  function handlerDeleteRecord(item) {
    deleteRecord(item.id);
    handlerUpdateRecords(item);
  }

  // enable user to
  function handlerEditRecord(item) {
    // move record data to contentContext
    let info = {
      content_name: item.name,
      content: item.content,
      owner: item.owner,
      is_resume: item.is_resume,
      id: item.id,
    };
    Object.entries(info).map(([key, value]) => {
      updateContent(key, value);
    });
    // remove record from local state
    handlerUpdateRecords(item);
    // move user to editandsave page
    router.push({
      pathname: "/editandsave",
    });
  }

  // console.log("Records Page: ", recordsData);
  return (
    <div>
      <ErrorModal
        isOpen={Array.isArray(errorPages) && errorPages.includes("records")}
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <div>
        <div>
          {resumesData.length === 0 ? (
            <NoRecords
              title="No Resumes:"
              message="Follow the link to create new resumes."
            />
          ) : (
            <>
              <h2 className="text-lg font-bold text-center">Resumes:</h2>
              <div className="m-4">
                <table className="w-full text-center">
                  <thead>
                    <tr className="">
                      <th className="px-4 py-2">Select</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Created</th>
                      <th className="px-4 py-2">Modified</th>
                    </tr>
                  </thead>
                  <tbody>{resumeRows}</tbody>
                </table>
              </div>
            </>
          )}
          {stateRecordsPage.selectedRecord &&
            stateRecordsPage.selectedRecord.is_resume && (
              <div>
                <button
                  onClick={() =>
                    handlerDeleteRecord(stateRecordsPage.selectedRecord)
                  }
                >
                  DELETE
                </button>
                <br />
                <button
                  onClick={() =>
                    handlerEditRecord(stateRecordsPage.selectedRecord)
                  }
                >
                  EDIT
                </button>
              </div>
            )}
        </div>
        <br></br>
        <div>
          {coverLettersData.length === 0 ? (
            <NoRecords
              title="No Cover Letters:"
              message="Follow the link to create new cover letters."
            />
          ) : (
            <>
              <h2 className="text-lg font-bold text-center">Cover Letters:</h2>
              <div className="m-4">
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Select</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Created</th>
                      <th className="px-4 py-2">Modified</th>
                    </tr>
                  </thead>
                  <tbody>{coverLettersRows}</tbody>
                </table>
              </div>
            </>
          )}
          {stateRecordsPage.selectedRecord &&
            !stateRecordsPage.selectedRecord.is_resume && (
              <div className="flex gap-4 p-4 bg-blue-500 bg-opacity-50">
                <button
                  onClick={() =>
                    handlerDeleteRecord(stateRecordsPage.selectedRecord)
                  }
                  className="px-4 py-2 bg-white rounded"
                >
                  DELETE
                </button>
                <br></br>
                <button
                  onClick={() =>
                    handlerEditRecord(stateRecordsPage.selectedRecord)
                  }
                  className="px-4 py-2 bg-white rounded"
                >
                  EDIT
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
