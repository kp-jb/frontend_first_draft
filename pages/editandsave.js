import Modal from "react-modal";
import { useRouter } from "next/router";
import { useState } from "react";

import { defaultEditAndSave } from "@/public/data/data";
import ErrorModal from "@/components/ErrorModal";
import { useAuthContext } from "@/contexts/AuthContext";
import { useContentContext } from "@/contexts/ContentContext";
import { useErrorContext } from "@/contexts/ErrorContext";
import useRecords from "@/hooks/useRecords";

export default function EditAndSavePage() {
  // state to control modal
  let [modalIsOpen, setModalIsOpen] = useState(false);
  // unpack content context
  let { content_name, is_resume, content, id, updateContent } =
    useContentContext();
  // unpack records hooks
  let { recordsData, createRecord, updateRecord } = useRecords();
  // unpack auth context, user login
  let { userData } = useAuthContext();
  // unpack error context
  let { errorPages, errorMessage, updateError } = useErrorContext();
  let router = useRouter();

  // control modal state
  const handlerControlModal = () => {
    setModalIsOpen((prevState) => !prevState);
  };

  // update content context with each change
  const handlerChange = (event) => {
    let { name, value } = event.target;
    if (name === "is_resume") {
      value = value === "true";
    }
    updateContent(name, value);
  };

  // for returning content context to default
  const handlerReset = (type, newState) => {
    updateContent(type, newState);
  };

  // to clear content context and close modal
  const handlerCancel = () => {
    handlerReset("content_name", "");
    handlerReset("is_resume", false);
    handlerControlModal();
  };

  // test if form input is valid to process with save
  // output false and raise local error otherwise
  function inputIsInvalid(content_name, content, is_resume) {
    const forbiddenCharacters = /[!@#\$%\^&*\(\)\+={}\[\];:'\,<>/\\|]/;
    if (typeof content_name !== "string" || content_name.trim() === "" || content_name.length > 50 || forbiddenCharacters.test(content_name)) {
      updateError(["editandsave"],"Invalid file name:\nCannot be empty.\nMust be less than 50 characters.\nCannot contain these characters: ! @ # $ % ^ & * ( ) + = { } [ ] ; : ' , < > / ? \ |.");
      return true;
    };
    if (typeof content_name !== "string" || content === "") {
      updateError(["editandsave"],"Invalid file contents:\t Cannot be empty.");
      return true;
    };
    if (typeof is_resume !== "boolean") {
      updateError(["editandsave"],"Invalid file contents:\tFile type must be specified.");
      return true;
    };
  }

  // save new records
  // or update old records
  function handlerSaveContent() {
    handlerControlModal()
    // raise errors and stop function if input is invalid
    if (inputIsInvalid(content_name, content, is_resume)) {
      return;
    };

    let info = {
      name: content_name,
      owner: userData.id,
      content: content,
      is_resume: is_resume,
      id: id,
    };

    // if record has id
    if (info.id) {
      updateRecord(info);
    } else {
      createRecord(info);
    }
  };

  // console.log("Editandsave Page", recordsData);
  return (
    <div className="w-full h-full flex flex-col flex-nowrap jusitfy-center items-center">
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("editandsave")} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      <form className="h-full w-5/6 flex flex-col flex-nowrap justify-between">
        <fieldset className="h-full">
          <div className="h-5/6 flex flex-col w-full">
            <label className="p-5 text-xl font-bold text-center rounded-lg text-ivory underline">EDIT AND SAVE</label>
            <textarea
              placeholder={defaultEditAndSave}
              maxLength="10000"
              name="content"
              rows={20}
              columns={40}
              className="w-full h-full p-3 text-gray-400 border resize-none bg-gray-950"
              value={content || ""}
              onChange={handlerChange}
            />
          </div>
          <div className="h-1/6 flex flex-row flex-nowrap items-center justify-between">
            <button
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              onClick={() => handlerReset("content", "")}
              type="button"
            >
              CLEAR
            </button>
            <button
              className="h-10 w-full px-4 py-2 m-5 font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6"
              onClick={handlerControlModal}
              type="button"
            >
              SAVE
            </button>
          </div>
        </fieldset>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handlerControlModal}
        contentLabel="Save Modal"
        shouldCloseOnOverlayClick={false}
        className="fixed inset-0 flex items-center justify-center font-mono"
      >
        <div className="p-6 bg-white rounded-lg w-[600px] h-[300px] flex flex-col">
          <label className="flex justify-between">
            FILE TYPE:
            <select name="is_resume" value={is_resume || "false"} onChange={handlerChange}>
              <option value="true">Resume</option>
              <option value="false">Cover Letter</option>
            </select>
          </label>
          <label className="flex justify-between">
            FILE NAME:
            <input
              type="text"
              name="content_name"
              value={content_name || ""}
              placeholder={content_name}
              onChange={handlerChange}
              className="border text-slate-600"
            />
          </label>
          <div className="flex justify-center gap-20 m-1">
            <button 
              onClick={handlerCancel} 
              className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
            >
              CANCEL
            </button>
            <button
              onClick={handlerSaveContent}
              className="p-1 rounded-md text-gray-950 ring-2 ring-slate-100 bg-ivory opacity-90"
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
