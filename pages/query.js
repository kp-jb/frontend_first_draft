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
      <form className="bg-gray-950 text-ivory">
        <h2 className="text-xl font-semibold text-center">Request Instructions:</h2>
        <label className="italic">
          Keep these instructions or update as needed:
          <textarea
            type="text"
            name="query"
            value={query || ""}
            onChange={handlerOnChange}
            className="w-full h-full border resize-none bg-gray-950"
            rows={10}
            maxLength={1000}
          />
        </label>
        <br />
        <div className="flex gap-3 p-4 bg-gray-950">
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
            onClick={()=>router.push("/description")}
            className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
          >
            Next
          </button>
        </div>
        
      </form>
  </div>
  );
};