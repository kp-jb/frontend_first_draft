import React from "react";
import { useRouter } from "next/router";

import useRecords from "@/hooks/useRecords";
import { usePromptContext } from "@/contexts/PromptContext";

export default function ResumePage() {
  let { recordsData } = useRecords();
  let { resume, updatePrompt } = usePromptContext();
  let router = useRouter();

  let resumesData = recordsData.filter((item) => item.is_resume);
  
  // console.log(resumesData)
  
  function handlerUpdateResume(item) {
    updatePrompt("resume", item);
  }

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
    <>
      <div>
        <div>
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
              {resumesData.length === 0 ? (
                <tr>
                  <td></td>
                  <td>no resumes on record</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                resumeRows
              )}
            </tbody>
          </table>
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
    </>
  );
};
