/* eslint-disable react/prop-types */
const Modal = ({ isOpen, errorMessage, onClose }) => {
  const handleModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-2xl flex-col w-1/3 min-h-48"
    >
      <p className="text-lg mb-4 text-red-500">{errorMessage}</p>
      <button
        onClick={handleModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </button>
    </dialog>
  );
};

export default Modal;
