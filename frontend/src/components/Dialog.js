import PropTypes from "prop-types";
import { useEffect } from "react";

function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function DialogContent({ children }) {
  return <div className="mt-4">{children}</div>;
}

function DialogHeader({ children }) {
  return (
    <div className="pb-2 mb-4 text-xl font-semibold border-b">{children}</div>
  );
}

function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DialogContent.propTypes = {
  children: PropTypes.node,
};

DialogHeader.propTypes = {
  children: PropTypes.node,
};

DialogTitle.propTypes = {
  children: PropTypes.node,
};

export { Dialog, DialogContent, DialogHeader, DialogTitle };
