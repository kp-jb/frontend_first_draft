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
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();
  let { getChatGPT } = useChatGPT();

  // unpack userData
  let { userData } = useAuthContext();

  // unpack updateContent
  let { updateContent } = useContentContext();

  let router = useRouter();

  async function handlerSubmit() {
    updateError(["coverletter"],"",true);
    let formattedPrompt = await formatPrompt();
    if (!formattedPrompt){return;}
    let response = await getChatGPT(formattedPrompt);

    // update ContentContext
    if (response.status == "200") {
      refreshContent(response.data);
      updatePrompt("resume", "");
      updatePrompt("coverLetter", "");
      router.push("/editandsave");
    } else {
      updateError(
        ["coverletter"],
        `Request failed with response status of ${response.status}.`,
        false
      );
    }
  }

  // enable user to
  function refreshContent(data) {
    let userId = userData.id;

    let info = {
      content_name: "",
      content: data.generated_text,
      is_resume: false,
      id:null
    };

    Object.entries(info).map(([key, value]) => {
      updateContent(key, value);
    });
  }

  function handlerUpdateCoverLetter(item) {
    if (item === coverLetter) {
      updatePrompt("coverLetter", "");
    } else {
      updatePrompt("coverLetter", item);
    }
  }

  // filter down to only cover letters
  let coverLettersData = recordsData.filter((item) => !item.is_resume);
  // make cover letter row components
  let coverLettersRows = coverLettersData.map((item, idx) => {
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
            onChange={() => handlerUpdateCoverLetter(item)}
            checked={coverLetter && coverLetter.id === item.id}
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

  // console.log("CoverLetter Page: ", recordsData);
  return (
    <div className="h-full w-full flex flex-col flex-nowrap justify-evenly items-center overflow-y-auto">
      <ErrorModal
        isOpen={Array.isArray(errorPages) && errorPages.includes("coverletter") && loading===false}
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <div className="h-full w-5/6 flex flex-col flex-nowrap justify-evenly">
        {coverLettersData.length === 0 ? (
          <NoRecords
            loading={Array.isArray(errorPages) && errorPages.includes("coverletter") && loading}
            title="NO COVER LETTERS"
            message="Follow the link to create new cover letters."
          />
        ) : (
          <div className="h-5/6 min-h-5/6 overflow-y-auto">
            <h2 className="mt-5 mb-3 text-xl font-bold text-center underline">
              COVER LETTERS
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
              <tbody>{coverLettersRows}</tbody>
            </table>
          </div>
        )}
        {coverLettersData.length > 0 ? (
          <div className="h-1/6 flex flex-row flex-nowrap items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/resume")}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg opacity-90 sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              PREVIOUS
            </button>

            <button
              onClick={() => handlerUpdateCoverLetter(coverLetter)}
              className={`${
                coverLetter ? "opacity-90" : "opacity-0"
              } h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6`}
            >
              UNSELECT
            </button>

            {loading && errorPages.includes("coverletter") ? 
                <button
                type="button"
                className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg opacity-90 sm:w-1/2 md:w-1/3 lg:w-1/6"
              >
                LOADING...
              </button>
             : 
              <button
                type="button"
                onClick={handlerSubmit}
                className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg opacity-90 sm:w-1/2 md:w-1/3 lg:w-1/6"
              >
                SUBMIT
              </button>
            }
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
