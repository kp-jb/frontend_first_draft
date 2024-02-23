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
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();
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
      <tr
        className="border border-collapse border-ivory"
        key={`resumeRow${idx}`}
      >
        <td className="flex flex-row justify-center items-center">
          <input
            className="rounded-full appearance-none w-5 h-5 border-2 bg-ivory border-gray-950 checked:bg-gray-950 checked:border-ivory"
            type="checkbox"
            onClick={() => handlerUpdateRecords(item)}
            checked={
              stateRecordsPage.selectedRecord &&
              stateRecordsPage.selectedRecord.id === item.id
            }
          />
        </td>
        <td className="border">{item.name}</td>
        <td className="border">
          {createdDate.toLocaleDateString(undefined, options)}
        </td>
        <td className="border">
          {modifiedDate.toLocaleDateString(undefined, options)}
        </td>
      </tr>
    );
  });

  // generate the rows for cover letters
  let coverLettersRows = coverLettersData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };

    return (
      <tr
        className="border border-collapse border-ivory"
        key={`coverLetterRow${idx}`}
      >
        <td className="flex flex-row justify-center items-center">
          <input
            className="rounded-full appearance-none w-5 h-5 border-2 bg-ivory border-gray-950 checked:bg-gray-950 checked:border-ivory"
            type="checkbox"
            onClick={() => handlerUpdateRecords(item)}
            checked={
              stateRecordsPage.selectedRecord &&
              stateRecordsPage.selectedRecord.id === item.id
            }
          />
        </td>
        <td className="border">{item.name}</td>
        <td className="border">
          {createdDate.toLocaleDateString(undefined, options)}
        </td>
        <td className="border">
          {modifiedDate.toLocaleDateString(undefined, options)}
        </td>
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
    <div className="h-full w-full flex flex-col flex-nowrap border justify-evenly overflow-y-auto">
      <ErrorModal
        isOpen={
          Array.isArray(errorPages) &&
          errorPages.includes("records") &&
          loading === false
        }
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <div className="h-[35vh] flex flex-col flex-nowrap align-center justify-between">
        {resumesData.length === 0 ? (
          <NoRecords
            loading={
              Array.isArray(errorPages) &&
              errorPages.includes("records") &&
              loading
            }
            title="NO RESUMES"
            message="Follow the link to create new resumes."
          />
        ) : (
          <div className="h-5/6 m-5/6 p-5 overflow-y-auto">
            <h2 className="mb-3 text-xl font-bold text-center underline">
              RESUMES
            </h2>
            <table className="w-full text-center table-auto border border-collapse border-ivory">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead className="border border-collapse border-ivory">
                <tr className="text-center font-bold">
                  <th className="px-4 py-2">SELECT</th>
                  <th className="px-4 py-2">NAME</th>
                  <th className="px-4 py-2">DATE CREATED</th>
                  <th className="px-4 py-2">DATE MODIFIED</th>
                </tr>
              </thead>
              <tbody>{resumeRows}</tbody>
            </table>
          </div>
        )}
        <div className="h-1/6">
          {stateRecordsPage.selectedRecord &&
            stateRecordsPage.selectedRecord.is_resume && (
              <div className="flex flex-row flex-nowrap justify-evenly items-center">
                <button
                  className="w-full px-2 py-1 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
                  onClick={() =>
                    handlerDeleteRecord(stateRecordsPage.selectedRecord)
                  }
                >
                  DELETE
                </button>
                <button
                  className="w-full px-2 py-1 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
                  onClick={() =>
                    handlerEditRecord(stateRecordsPage.selectedRecord)
                  }
                >
                  EDIT
                </button>
              </div>
            )}
        </div>
      </div>
      <div className="h-[35vh] flex flex-col flex-nowrap align-center justify-between">
        {coverLettersData.length === 0 ? (
          <NoRecords
            loading={
              Array.isArray(errorPages) &&
              errorPages.includes("records") &&
              loading
            }
            title="NO COVER LETTERS"
            message="Follow the link to create new cover letters."
          />
        ) : (
          <div className="h-5/6 min-h-5/6 p-5 overflow-y-auto">
            <h2 className="mb-3 text-xl font-bold text-center underline">
              COVER LETTERS
            </h2>
            <table className="w-full text-center table-auto border border-collapse border-ivory">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead className="border border-collapse border-ivory">
                <tr className="text-center font-bold">
                  <th className="px-4 py-2">Select</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Modified</th>
                </tr>
              </thead>
              <tbody>{coverLettersRows}</tbody>
            </table>
          </div>
        )}
        <div className="h-1/6">
          {stateRecordsPage.selectedRecord &&
            !stateRecordsPage.selectedRecord.is_resume && (
              <div className="flex flex-row flex-nowrap justify-evenly items-center">
                <button
                  className="w-full px-2 py-1 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
                  onClick={() =>
                    handlerDeleteRecord(stateRecordsPage.selectedRecord)
                  }
                >
                  DELETE
                </button>
                <button
                  className="w-full px-2 py-1 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
                  onClick={() =>
                    handlerEditRecord(stateRecordsPage.selectedRecord)
                  }
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
