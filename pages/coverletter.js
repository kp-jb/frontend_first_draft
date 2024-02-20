import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import useChatGPT from "@/hooks/useChatGPT";
import ErrorModal from "@/components/ErrorModal";
import NoRecords from "@/components/NoRecords";
import useRecords from "@/hooks/useRecords";
import { useErrorContext } from "@/contexts/ErrorContext";
import { usePromptContext } from "@/contexts/PromptContext";


export default function CoverLetterPage() {
  // unpack all user records
  let { recordsData } = useRecords();
  let { coverLetter, updatePrompt, formatPrompt } = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let { getChatGPT } = useChatGPT();
  let router = useRouter();

  async function handlerSubmit() {
    let formattedPrompt = await formatPrompt();
    let responseData = await getChatGPT(formattedPrompt);
    console.log(responseData);
    console.log(responseData.success);
    console.log(responseData.generated_text);
  };

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
                <h2>Cover Letters:</h2>
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
                      {coverLettersRows}
                  </tbody>
                </table>
              </>
              )}
          <button 
            type="button" 
            onClick={() => router.push("/resume")}>
            Previous
          </button>
          <br />
          {coverLetter && (
            <div>
              <button onClick={() => handlerUpdateCoverLetter("")}>Remove</button>
            </div>
          )}
          <br></br>
          {/* TODO: add submit function */}
          <button 
          type="button"
          onClick={handlerSubmit}>
            Submit
          </button>
        </div>
      </div>
  );
}
