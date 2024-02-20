import Modal from "react-modal";

export default function ErrorModal(props) {

  let errorComponents
  if (typeof props.errorMessage === "string" && props.errorMessage.includes("\n")){
    errorComponents = props.errorMessage.split("\n").map((item, idx) => <p key={idx}>{item}</p>);
  } else {
    errorComponents = <p>{props.errorMessage}</p>
  };

  // console.log("Error Modal:",props.errorMessage);
  return (
    <Modal
    isOpen={props.isOpen}
    onRequestClose={props.handlerControlModal}
    contentLabel="Error Modal"
    shouldCloseOnOverlayClick={false}
    className="fixed inset-0 flex items-center justify-center"
    overlayClassName="fixed inset-0 bg-black opacity-50"
  >
    <div className="p-6 bg-white rounded-lg w-[600px] h-[300px] flex flex-col">
      <div>
        <h2 className="">
          ERROR MESSAGE:
        </h2>
        {errorComponents}
      </div>
      <div className="justify-center m-1">
        <button onClick={props.updateError} className="bg-red-400 border">
          CLEAR
        </button>
      </div>
    </div>
  </Modal>
  );
};