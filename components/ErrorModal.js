import Modal from "react-modal";

export default function ErrorModal(props) {
  let errorComponents;
  if (
    typeof props.errorMessage === "string" &&
    props.errorMessage.includes("\n")
  ) {
    errorComponents = props.errorMessage
      .split("\n")
      .map((item, idx) => <p key={idx}>{item}</p>);
  } else {
    errorComponents = <p>{props.errorMessage}</p>;
  }

  // console.log("Error Modal:",props.errorMessage);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handlerControlModal}
      contentLabel="Error Modal"
      shouldCloseOnOverlayClick={false}
      className="fixed inset-0 flex items-center justify-center font-mono text-gray-950 text-center"
      overlayClassName="opacity-100"
    >
      <div className="p-6 bg-ivory rounded-lg w-1/3 ">
        <div className="">
          <h2 className="text-xl font-bold mb-4">
            ERROR MESSAGE:
          </h2>
          {errorComponents}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={props.updateError}
            className="text-ivory h-10 w-full px-4 py-2 m-5 font-bold p-1 ring-2 ring-slate-100 bg-gray-950 rounded-lg"
          >
            CLEAR
          </button>
        </div>
      </div>
    </Modal>
  );
}
