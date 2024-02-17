import { useRouter } from "next/router";


import {usePromptContext} from "@/contexts/PromptContext";

export default function DescriptionPage() {
  let {description, updatePrompt} = usePromptContext();
  let router = useRouter();

  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("description",value)
  };

  const handlerResetClick = () => {
    updatePrompt("description", "");
  };

  
  // console.log("Description Page",description);
  return (
    <>
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
          onClick={handlerResetClick}
          >
            Reset</button>
        <br></br>
        <button 
          type="button"
          onClick={()=>router.push("/resume")}
          >
            Next</button>
      </form>
  </>
  );
};