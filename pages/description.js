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
            className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
          >
            Previous
          </button>
          <br />
          <button 
            type="button"
            onClick={handlerReset}
            className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
          >
            Reset
          </button>
          <br></br>
          <button 
          type="button"
          onClick={()=>router.push("/resume")}
          className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
          >
            Next</button>
        </div>
        
      </form>
  </div>
  );
};