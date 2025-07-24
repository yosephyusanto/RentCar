import ReactDOM from "react-dom";

type DeleteConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  carName: string;
  carId: string;
  isLoading?: boolean;
};

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  carName,
  carId,
  isLoading = false,
}: DeleteConfirmModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center transition-colors bg-black/50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transition-all scale-100 opacity-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Confirm Delete</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <i className="bx bx-trash text-3xl text-red-600"></i>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this car?
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="font-semibold text-gray-900">{carName}</p>
            <p className="text-sm text-gray-600">ID: {carId}</p>
          </div>
          <p className="text-sm text-red-600 font-medium">
            This action cannot be undone. All car data and images will be
            permanently deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Deleting...
              </>
            ) : (
              <>
                <i className="bx bx-trash"></i>
                Delete Car
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default DeleteConfirmModal;
