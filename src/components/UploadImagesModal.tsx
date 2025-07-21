import React, { useRef, useState } from "react";
import { UploadCarImagesService } from "../services";
import { toast } from "sonner";
import ReactDOM from "react-dom";

type UploadImagesModalProps = {
  carId: string;
  onClose: () => void;
};

const UploadImagesModal = ({ carId, onClose }: UploadImagesModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    try {
      await UploadCarImagesService(carId, files);
      setFiles([]);
    } catch (e: any) {
      toast.error(e.message || "Something went wrong when sending the data");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <i
        className="bx bx-x absolute top-3 right-3 text-white text-4xl cursor-pointer"
        onClick={onClose}
      ></i>
      {/* White Card */}
      <div
        className="bg-white p-6 rounded-lg w-full max-w-xl overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Upload Car Images
        </h2>

        {files.length === 0 ? (
          <div
            className="border-2 border-dashed border-gray-400 rounded-lg h-64 flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-500">
              Drag & Drop Picture or Tap to Upload
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-2 py-0 text-xs hidden group-hover:block"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default UploadImagesModal;
