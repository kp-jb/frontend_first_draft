import { useRouter } from "next/router";


import {defaultQuery} from "@/public/data/data";
import ErrorModal from "@/components/ErrorModal";
import { useErrorContext } from "@/contexts/ErrorContext";
import {usePromptContext} from "@/contexts/PromptContext";


export default function QueryPage() {
  // unpack prompt context
  let {query, updatePrompt} = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let router = useRouter();

  // update prompt context with each edit
  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("query",value)
  };

  // reset prompt context
  const handlerReset = () => {
    updatePrompt("query", defaultQuery);
  };

  
  // console.log("Query Page",query);
  return (
    <div>
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("query")} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      <form>
        <h2 className="font-semibold">Request Instructions:</h2>
        <label className="italic">
          Keep these instructions or update as needed:
          <textarea
            type="text"
            name="query"
            value={query || ""}
            onChange={handlerOnChange}
            className="w-full h-full border resize-none"
            rows={10}
            maxLength={1000}
          />
        </label>
        <br />
        <div className="flex gap-3 p-4">
          <button 
            type="button"
            onClick={handlerReset}
            className="px-2 py-1 rounded-md text-slate-50 bg-slate-900 outline-double"
          >
            Reset
          </button>
          <br></br>
          <button 
            type="button"
            onClick={()=>router.push("/description")}
            className="px-2 py-1 rounded-md text-slate-50 bg-slate-900 outline-double"
          >
            Next
          </button>
        </div>
        
      </form>
  </div>
  );
};