import Modal from "react-modal"
import { useRouter } from "next/router";
import { useState } from "react";

import { defaultEditAndSave } from "@/public/data/data";
import { useAuthContext } from "@/contexts/AuthContext";
import { useContentContext } from "@/contexts/ContentContext";
import useRecords from "@/hooks/useRecords";

// export default function EditAndSavePage() {
//   return (
//     <>
//     </>
//   )
// }


export default function EditAndSavePage() {
  let [ modalIsOpen, setModalIsOpen] = useState(false);
  let { content_name, is_resume, content, updateContent } = useContentContext();
  let { createRecord, updateRecord } = useRecords();
  let { userData } = useAuthContext();
  let router = useRouter();
  
  const handlerChange = (event) => {
    let {name, value} = event.target;
    if (name === "is_resume") {
      value = value === "true"
    }
    // console.log("handlerChange name", name)
    // console.log("handlerChange value", value)
    updateContent(name, value);
  }
  
  const handlerReset = (type, newState) => {
    updateContent(type, newState);
  }
  
  const handlerControlModal = () => {
    setModalIsOpen(prevState => (!prevState));
  }

  const handlerCancel = () => {
    handlerReset("content_name", "");
    handlerReset("is_resume", false);
    handlerControlModal();
  };

  async function handlerSaveContent() {
   // validate is_resume, name, content, id and update locate error if invalid
    let id = userData.id;
    let info = { 
      name: content_name, 
      owner: id, 
      content: content,
      is_resume: is_resume
    };

    let response = await createRecord(info)
    console.log(response)
  }
//     if ("error" in response && !response.error) {
//       router.push("/records");
// } catch (error) {
//   console.error("Error in handlerSaveContent:", error);
// }
    
//     if ("error" in response && !response.error) {
//       router.push("/records");
    


  return (
      <div>
        <form>
          <fieldset>
            <div className="flex flex-col w-96">
              <label>EDIT AND SAVE:</label>
              <textarea 
                placeholder={defaultEditAndSave} 
                maxLength="10000" 
                name="content"
                rows={20}
                cols={40}
                className="border"
                value={content}
                onChange={handlerChange}
              />
            </div>
            <div className="m-1">
              <button className="m-1 border bg-slate-100" onClick={() => handlerReset("content", "")} type="button">CLEAR</button>
              <button className="m-1 border bg-slate-100" type="button">DOWNLOAD</button>
              <button className="m-1 border bg-slate-100" onClick={handlerControlModal} type="button">SAVE</button>
            </div>
          </fieldset>
        </form>
        {/* <p>EditAndSavePage</p> */}
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
              <select name="is_resume" value={is_resume} onChange={handlerChange} >
                <option value="true" >Resume</option>
                <option value="false">Cover Letter</option>
              </select>
            </label>
            <br/>
            <label className="flex justify-between">
              FILE NAME:
              <input type="text" name="content_name" value={content_name} onChange={handlerChange} className="border text-slate-600"/>
            </label>
            <br/>
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
              <button onClick={handlerCancel} className="bg-red-400 border">CANCEL</button>
              <button onClick={handlerSaveContent} className="bg-green-400 border">SAVE</button>
            </div>
          </div>
        </Modal>
      </div>
  );
}