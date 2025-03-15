import PropTypes from "prop-types";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
        <button
          className="absolute text-gray-600 top-2 right-2 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
