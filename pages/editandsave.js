import Modal from "react-modal"
import { useState } from "react";

let editPlaceholder = "Paste resumes or cover letters here to be saved. Or review the cover letter generated from the query."

export default function EditAndSavePage() {
  let [ editState, setEditState] = useState(editPlaceholder);
  let [ openModal, setOpenModal] = useState(false);
  
  const handleChange = (event) => {
    setEditState(event.target.value)
  }
  
  const handleClear = (event) => {
    setEditState(editPlaceholder)
  }
  
  const handleSave = () => {
    setOpenModal(true)
  }

  const handleSaveEdit = {
    
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  
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
          isOpen={openModal}
          onClose={closeModal}
          contentLabel="Save Modal"
        >
          <div>
            <p>FILE TYPE:</p>
            <p>FILE NAME:</p>
            <p>AI GENERATED: (cover letters only)</p>
            <p>EARLY OR FINAL DRAFT:</p>
          </div>
          <div className="flex flex-row">
            <button onClick={closeModal} className="bg-red-400 border">CANCEL</button>
            <button onClick={handleSaveEdit} className="bg-green-400 border">SAVE</button>
          </div>
        
        </Modal>
      </div>
  );
}