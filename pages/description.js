import { useRouter } from "next/router";

import ErrorModal from "@/components/ErrorModal";
import { useErrorContext } from "@/contexts/ErrorContext";
import { usePromptContext } from "@/contexts/PromptContext";

export default function DescriptionPage() {
  // unpack prompt context
  let { description, updatePrompt } = usePromptContext();
  // unpack error context
  let { errorPages, errorMessage, loading, updateError } = useErrorContext();
  let router = useRouter();

  // update prompt context
  function handlerOnChange(event) {
    const { value } = event.target;
    updatePrompt("description", value);
  }

  // reset prompt context
  const handlerReset = () => {
    updatePrompt("description", "");
  };

  // console.log("Description Page",description);
  return (
    <div className="h-full w-full flex flex-col flex-nowrap justify-evenly items-center">
      <ErrorModal
        isOpen={
          Array.isArray(errorPages) &&
          errorPages.includes("description") &&
          loading === false
        }
        updateError={updateError}
        errorMessage={errorMessage}
      />
      <form className="h-full w-5/6 flex flex-col flex-nowrap justify-between">
        <fieldset className="h-full">
          <div className="h-5/6 flex flex-col border-b border-ivory">
            <label className="pt-5 font-bold text-center rounded text-ivory overflow-y-auto">
              <h2 className="underline text-xl">JOB DESCRIPTION</h2>
              <p className="p-3 text-sm no-underline">
                Add all relevant job details below.
              </p>
              <textarea
                type="text"
                name="description"
                value={description || ""}
                onChange={handlerOnChange}
                className="w-full h-full p-3 text-gray-400 border resize-none bg-gray-950"
                rows={100}
              />
            </label>
          </div>
          <div className="h-1/6 flex flex-row flex-nowrap items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/query")}
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
            >
              PREVIOUS
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
              onClick={() => router.push("/resume")}
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
