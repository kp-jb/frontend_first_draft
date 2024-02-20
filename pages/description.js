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
        <h2>Job Description:</h2>
        <label>
          Enter job details below:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handlerOnChange}
          />
        </label>
        <br></br>
        <button 
          type="button"
          onClick={()=>router.push("/query")}
          >
            Previous</button>
        <br />
        <button 
          type="button"
          onClick={handlerReset}
          >
            Reset</button>
        <br></br>
        <button 
          type="button"
          onClick={()=>router.push("/resume")}
          >
            Next</button>
      </form>
  </div>
  );
};