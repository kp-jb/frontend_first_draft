import React from "react";
import { useRouter } from "next/router";

import useChatGPT from "@/hooks/useChatGPT";
import useRecords from "@/hooks/useRecords";
import { usePromptContext } from "@/contexts/PromptContext";


export default function CoverLetterPage() {
  let { recordsData } = useRecords();
  let { coverLetter, updatePrompt, formatPrompt } = usePromptContext();
  let { getChatGPT } = useChatGPT();
  let router = useRouter();

  let coverLettersData = recordsData.filter((item) => !item.is_resume);

  async function handlerSubmit() {
    let formattedPrompt = await formatPrompt();
    let responseData = await getChatGPT(formattedPrompt);
    console.log(responseData);
    console.log(responseData.success);
    console.log(responseData.generated_text);
  }

  function handlerUpdateCoverLetter(item) {
    updatePrompt("coverLetter", item);
  };

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
    <>
      <div>
        <div>
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
              {coverLettersData.length === 0 ? (
                <tr>
                  <td></td>
                  <td>no resumes on record</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                coverLettersRows
              )}
            </tbody>
          </table>
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
    </>
  );
}
