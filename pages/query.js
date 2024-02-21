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
        <h2>Request Instructions:</h2>
        <label>
          Keep this instructions or update as needed:
          <input
            type="text"
            name="query"
            value={query || ""}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <button 
          type="button"
          onClick={handlerReset}
          >
            Reset</button>
        <br></br>
        <button 
          type="button"
          onClick={()=>router.push("/description")}
          >
            Next</button>
      </form>
  </div>
  );
};