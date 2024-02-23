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
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();
  let router = useRouter();

  // on select, update resume in prompt context
  function handlerUpdateResume(item) {
    if (item == resume) {
      updatePrompt("resume", "");
    } else {
      updatePrompt("resume", item);
    }
  }

  // filter down to resumes
  let resumesData = recordsData.filter((item) => item.is_resume);

  // make row components from resumes
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
            onChange={() => handlerUpdateResume(item)}
            checked={resume && resume.id === item.id}
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

  // console.log("Resume Page: ", resume);
  return (
    <div className="h-full w-full flex flex-col flex-nowrap justify-evenly items-center overflow-y-auto">
      <ErrorModal
        isOpen={Array.isArray(errorPages) && errorPages.includes("resume") && loading===false}
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <div className="h-full w-5/6 flex flex-col flex-nowrap justify-evenly">
        {resumesData.length === 0 ? (
          <NoRecords
            loading={Array.isArray(errorPages) && errorPages.includes("resume") && loading}
            title="NO RESUMES"
            message="Follow the link to create new resumes."
          />
        ) : (
          <div className="h-5/6 min-h-5/6 overflow-y-auto">
            <h2 className="mt-5 mb-3 text-xl font-bold text-center underline">
              RESUMES
            </h2>
            <table className="w-full mt-5 text-center table-auto border border-collapse border-ivory">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
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
        {resumesData.length > 0 ? (
          <div className="h-1/6 flex flex-row flex-nowrap items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/description")}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg opacity-90 sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              PREVIOUS
            </button>

            <button
              onClick={() => handlerUpdateResume(resume)}
              className={`${
                resume ? "opacity-90" : "opacity-0"
              } h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6`}
            >
              UNSELECT
            </button>

            <button
              type="button"
              onClick={() => router.push("/coverletter")}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg opacity-90 sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              NEXT
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
