import React from "react";
import { useRouter } from "next/router";

import ErrorModal from "@/components/ErrorModal";
import NoRecords from "@/components/NoRecords";
import useRecords from "@/hooks/useRecords";
import { useErrorContext } from "@/contexts/ErrorContext";
import { usePromptContext } from "@/contexts/PromptContext";

export default function ResumePage() {
  // unpack user records
  let { recordsData } = useRecords();
  // unpack prompt context
  let { resume, updatePrompt } = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let router = useRouter();
  
  // on select, update resume in prompt context
  function handlerUpdateResume(item) {
    updatePrompt("resume", item);
  };

  // filter down to resumes
  let resumesData = recordsData.filter((item) => item.is_resume);

  // make row components from resumes
  let resumeRows = resumesData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };

    return (
      <tr key={`resumeRow${idx}`}>
        <td>
          <input
            type="checkbox"
            onChange={() => handlerUpdateResume(item)}
            checked={resume && resume.id === item.id}
          />
        </td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  // console.log("Resume Page: ", recordsData);
  return (
      <div>
        <ErrorModal 
          isOpen={Array.isArray(errorPages) && errorPages.includes("resume")} 
          updateError={updateError}
          errorMessage={errorMessage}
          />
        <div>
          {resumesData.length === 0 ? (
              <NoRecords title="No Resumes:" message="Follow the link to create new resumes."/>
              ) : (
              <>
                <h2>Resumes:</h2>
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
              </>
              )}
          <button type="button" onClick={() => router.push("/description")}>
            Previous
          </button>
          <br />
          {resume && (
            <div>
              <button onClick={() => handlerUpdateResume("")}>Remove</button>
              <br></br>
            </div>
          )}
          <br></br>
          <button type="button" onClick={() => router.push("/coverletter")}>
            Next
          </button>
        </div>
      </div>
  
  );
};
