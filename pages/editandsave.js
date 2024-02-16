import Modal from "react-modal"
import { useState } from "react";

let editPlaceholder = "Paste resumes or cover letters here to be saved. Or review the cover letter generated from the query."

export default function EditAndSavePage() {
  let [ editState, setEditState] = useState(editPlaceholder);
  let [ modalIsOpen, setModalIsOpen] = useState(false);
  let [fileType, setFileType] = useState("resume");
  let [fileName, setFileName] = useState("");
  let [isAI, setIsAI] = useState(false);
  let [isFinalDraft, setIsFinalDraft] = useState(false);
  
  const handleChange = (event) => {
    setEditState(event.target.value);
  }
  
  const handleClear = (event) => {
    setEditState(editPlaceholder);
  }
  
  const handleSave = () => {
    console.log("Save button clicked")
    setModalIsOpen(true);
  }

  // const handleSaveEdit = {
    
  // }

  const closeModal = () => {
    console.log("Modal closed")
    setModalIsOpen(false);
  }
  
  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleIsAI = (event) => {
    setIsAI(event.target.checked);
  };

  const handleIsFinalDraft = (event) => {
    setIsFinalDraft(event.target.checked);
  };

  return (
      <div>
        <form>
          <fieldset>
            <div className="flex flex-col w-96">
              <label>EDIT AND SAVE:</label>
              <textarea 
                placeholder={editPlaceholder} 
                maxLength="1000" 
                name="content"
                rows={20}
                cols={40}
                className="border"
                value={editState}
                onChange={handleChange}
              />
            </div>
            <div className="m-1">
              <button className="m-1 border bg-slate-100" onClick={handleClear}>CLEAR</button>
              <button className="m-1 border bg-slate-100">DOWNLOAD</button>
              <button className="m-1 border bg-slate-100" onClick={handleSave}>SAVE</button>
            </div>
          </fieldset>
        </form>
        <p>EditAndSavePage</p>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Save Modal"
          shouldCloseOnOverlayClick={false}
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black opacity-50"
        >
          <div className="p-6 bg-white rounded-lg w-[600px] h-[300px]">
            <label>
              FILE TYPE:
              <select value={fileType} onChange={handleFileTypeChange}>
                <option value="resume">Resume</option>
                <option value="cover-letter">Cover Letter</option>
              </select>
            </label>
            <br/>
            <label>
              FILE NAME:
              <input type="text" value={fileName} onChange={handleFileNameChange} />
            </label>
            <br/>
            <label>
              AI GENERATED: (cover letters only)
              <input type="radio" checked={isAI} onChange={handleIsAI}/>
            </label>
            <br/>
            <label>
              FINAL DRAFT:
              <input type="radio" checked={isFinalDraft} onChange={handleIsFinalDraft}/>
            </label>
          </div>
          <div className="flex flex-row">
            <button onClick={closeModal} className="bg-red-400 border">CANCEL</button>
            <button onClick={closeModal} className="bg-green-400 border">SAVE</button>
          </div>
        
        </Modal>
      </div>
  );
}