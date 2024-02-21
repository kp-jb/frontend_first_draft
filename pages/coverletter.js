import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import useChatGPT from "@/hooks/useChatGPT";
import ErrorModal from "@/components/ErrorModal";
import NoRecords from "@/components/NoRecords";
import useRecords from "@/hooks/useRecords";

import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";
import { usePromptContext } from "@/contexts/PromptContext";
import { useContentContext } from "@/contexts/ContentContext";


export default function CoverLetterPage() {
  // unpack all user records
  let { recordsData } = useRecords();
  let { coverLetter, updatePrompt, formatPrompt } = usePromptContext();

  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let { getChatGPT } = useChatGPT();

  // unpack userData
  let { userData } = useAuthContext();

  // unpack updateContent
  let { updateContent } = useContentContext();

  let router = useRouter();

  async function handlerSubmit() {
    let formattedPrompt = await formatPrompt();
    let responseData = await getChatGPT(formattedPrompt);

    // update ContentContext
    refreshContent(responseData)

    // move user to response page if request is OK
    router.push("/editandsave")
  };

  // enable user to
  function refreshContent(data) {
    let userId = userData.id

    let info = {
      content_name: "",
      content: data.generated_text,
      owner: userId,
      is_resume: false,
    };

    Object.entries(info).map(([key, value]) => {
      updateContent(key, value);
    });
  }

  function handlerUpdateCoverLetter(item) {
    updatePrompt("coverLetter", item);
  };

  // filter down to only cover letters
  let coverLettersData = recordsData.filter((item) => !item.is_resume);
  // make cover letter row components
  let coverLettersRows = coverLettersData.map((item, idx) => {
    let createdDate = new Date(item.created_date);
    let modifiedDate = new Date(item.modified_date);

    const options = { month: "2-digit", day: "2-digit", year: "2-digit" };

    return (
      <tr key={`coverLetterRow${idx}`}>
        <td>
        <input
            type="checkbox"
            onChange={() => handlerUpdateCoverLetter(item)}
            checked={coverLetter && coverLetter.id === item.id}
          />
        </td>
        <td>{item.name}</td>
        <td>{createdDate.toLocaleDateString(undefined, options)}</td>
        <td>{modifiedDate.toLocaleDateString(undefined, options)}</td>
      </tr>
    );
  });

  // console.log("CoverLetter Page: ", recordsData);
  return (
      <div>
        <ErrorModal 
          isOpen={Array.isArray(errorPages) && errorPages.includes("coverletter")} 
          updateError={updateError}
          errorMessage={errorMessage}
          />
        <div>
          {coverLettersData.length === 0 ? (
              <NoRecords title="No Cover Letters:" message="Follow the link to create new cover letters."/>
              ) : (
              <>
                <h2 className="text-lg font-bold text-center">Cover Letters:</h2>         
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
                        {coverLettersRows}
                    </tbody>
                  </table>
                </div>
              </>
              )}
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => router.push("/resume")}
                  className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
                >
                  Previous
                </button>
                <br />
                {coverLetter && (
                <div>
                  <button 
                    onClick={() => handlerUpdateCoverLetter("")}
                    className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
                  >
                    Remove
                  </button>
                </div>
              )}
                <br />
                <button 
                  type="button"
                  onClick={handlerSubmit}
                  className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
  );
}
