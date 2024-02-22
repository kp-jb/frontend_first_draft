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
        <td className="border">{item.name}</td>
        <td className="border">{createdDate.toLocaleDateString(undefined, options)}</td>
        <td className="border">{modifiedDate.toLocaleDateString(undefined, options)}</td>
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
              <div className="text-ivory">
                <h2 className="text-lg font-semibold text-center">Resumes:</h2>
                <div className="m-4">
                  <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th className="px-2 py-2">Select</th>
                      <th className="px-2 py-2">Name</th>
                      <th className="px-2 py-2">Created</th>
                      <th className="px-2 py-2">Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                      {resumeRows}
                  </tbody>
                  </table>
                </div>
              </div>
              )}
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => router.push("/description")}
                  className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
                >
                  Previous
                </button>
                <br />
                {resume && (
                <div>
                  <button 
                    onClick={() => handlerUpdateResume("")}
                    className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
                  >
                    Remove
                  </button>
                  <br />
                </div>
              )}
                <br />
                <button 
                  type="button" 
                  onClick={() => router.push("/coverletter")}
                  className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
  );
};
