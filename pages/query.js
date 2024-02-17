import { useRouter } from "next/router";


import {defaultQuery} from "@/public/data/data";
import {usePromptContext} from "@/contexts/PromptContext";

export default function QueryPage() {
  let {query, updatePrompt} = usePromptContext();
  let router = useRouter();

  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("query",value)
  };

  const handlerResetClick = () => {
    updatePrompt("query", defaultQuery);
  };

  
  // console.log("Query Page",query);
  return (
    <>
      <form>
        <h2>Request Instructions:</h2>
        <label>
          Keep this instructions or update as needed:
          <input
            type="text"
            name="query"
            value={query}
            onChange={handlerOnChange}
          />
        </label>
        <br />
        <button 
          type="button"
          onClick={handlerResetClick}
          >
            Reset</button>
        <br></br>
        <button 
          type="button"
          onClick={()=>router.push("/description")}
          >
            Next</button>
      </form>
  </>
  );
};