import { useRouter } from "next/router";

import ErrorModal from "@/components/ErrorModal";
import { useErrorContext } from "@/contexts/ErrorContext";
import {usePromptContext} from "@/contexts/PromptContext";


export default function DescriptionPage() {
  // unpack prompt context
  let {description, updatePrompt} = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let router = useRouter();

  // update prompt context
  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("description",value)
  };

  // reset prompt context
  const handlerReset = () => {
    updatePrompt("description", "");
  };

  
  // console.log("Description Page",description);
  return (
    <div>
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("description")} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      <form>
        <h2 className="font-semibold">Job Description:</h2>
        <div className="flex flex-col">
          <label>
          Enter job details below:
          <textarea
            type="text"
            name="description"
            value={description || ""}
            onChange={handlerOnChange}
            className="w-full h-full"
            rows={20}
            columns={40}
          />
        </label>
        </div>
        <br />
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={()=>router.push("/query")}
            className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
          >
            Previous
          </button>
          <br />
          <button 
            type="button"
            onClick={handlerReset}
            className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
          >
            Reset
          </button>
          <br></br>
          <button 
          type="button"
          onClick={()=>router.push("/resume")}
          className="px-2 py-1 my-1 rounded-md text-slate-50 bg-slate-900 outline-double"
          >
            Next</button>
        </div>
        
      </form>
  </div>
  );
};