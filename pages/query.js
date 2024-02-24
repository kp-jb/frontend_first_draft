import { useRouter } from "next/router";

import { defaultQuery } from "@/public/data/data";
import ErrorModal from "@/components/ErrorModal";
import { useErrorContext } from "@/contexts/ErrorContext";
import { usePromptContext } from "@/contexts/PromptContext";

export default function QueryPage() {
  // unpack prompt context
  let { query, updatePrompt } = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();
  let router = useRouter();

  // update prompt context with each edit
  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("query", value);
  }

  // reset prompt context
  const handlerReset = () => {
    updatePrompt("query", defaultQuery);
  };

  // console.log("Query Page",query);
  return (
    <div className="h-full w-full flex flex-col flex-nowrap justify-evenly items-center overflow-y-auto">
      <ErrorModal
        isOpen={Array.isArray(errorPages) && errorPages.includes("query") && loading===false}
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <form className="h-full w-5/6 flex flex-col flex-wrap justify-between">
        <fieldset className="h-full">
          <div className="h-5/6 flex flex-col border-b border-ivory">
            <label className="pt-5 font-bold text-center rounded text-ivory border-b border-ivory overflow-y-auto">
              <h2 className="underline text-xl">QUERY INSTRUCTIONS</h2>
              <p className="p-3 text-sm no-underline">
                Change the instructions as needed or use the default...
              </p>
              <textarea
                type="text"
                name="query"
                rows={50}
                value={query || ""}
                onChange={handlerOnChange}
                className="w-full p-3 text-gray-400 border resize-none bg-gray-950"
                maxLength={1000}
              />
            </label>
          </div>
          <div className="h-1/6 flex flex-row flex-nowrap items-center justify-between">
            <button
              className="opacity-0 h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              type="button"
            >
              RECORDS
            </button>
            <button
              type="button"
              onClick={handlerReset}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              RESET
            </button>
            <button
              type="button"
              onClick={() => router.push("/description")}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              NEXT
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
