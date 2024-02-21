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
    <div>
      <ErrorModal 
        isOpen={Array.isArray(errorPages) && errorPages.includes("editandsave")} 
        updateError={updateError}
        errorMessage={errorMessage}
        />
      <form>
        <fieldset>
          <div className="flex flex-col w-full">
            <label>EDIT AND SAVE:</label>
            <textarea
              placeholder={defaultEditAndSave}
              maxLength="10000"
              name="content"
              rows={20}
              columns={40}
              className="w-full h-full border resize-none"
              value={content || ""}
              onChange={handlerChange}
            />
          </div>
          <div className="m-1">
            <button
              className="m-1 border bg-slate-100"
              onClick={() => handlerReset("content", "")}
              type="button"
            >
              CLEAR
            </button>
            {/* <button 
                className="m-1 border bg-slate-100" 
                type="button">
                  DOWNLOAD
              </button> */}
            <button
              className="m-1 border bg-slate-100"
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
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="p-6 bg-white rounded-lg w-[600px] h-[300px] flex flex-col">
          <label className="flex justify-between">
            FILE TYPE:
            {/* <input type="radio" checked={is_resume} value={is_resume} name="is_resume" onChange={handlerChange}></input> */}
            <select name="is_resume" value={is_resume || "false"} onChange={handlerChange}>
              <option value="true">Resume</option>
              <option value="false">Cover Letter</option>
            </select>
          </label>
          <br />
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
          <br />
          {/* <label className="flex justify-between">
              AI GENERATED: (cover letters only)
              <input type="radio" checked={isAI} onChange={handleIsAI}/>
            </label>
            <br/> */}
          {/* <label className="flex justify-between">
              FINAL DRAFT:
              <input type="radio" checked={isFinalDraft} onChange={handleIsFinalDraft}/>
            </label> */}
          <div className="justify-center m-1">
            <button onClick={handlerCancel} className="bg-red-400 border">
              CANCEL
            </button>
            <button
              onClick={handlerSaveContent}
              className="bg-green-400 border"
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
