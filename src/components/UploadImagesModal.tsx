import React, { useRef, useState } from "react";
import { UploadCarImagesService } from "../services";
import { toast } from "sonner";
import ReactDOM from "react-dom";

type UploadImagesModalProps = {
  onClose: () => void;
  onFetchData: () => void;
};

const UploadImagesModal = ({
  onClose,
  onFetchData,
}: UploadImagesModalProps) => {
  const [carId, setCarId] = useState<string>("");
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

  const handleCarIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarId(e.target.value);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!carId) {
      toast.error("Please enter a valid Car ID");
      return;
    }
    if (files.length === 0) {
      toast.error("Please select at least one image to upload");
      return;
    }
    try {
      await UploadCarImagesService(carId, files);
      setFiles([]);
      onFetchData();
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
        {/* Input Car id */}
        <div className="flex items-center mb-8 gap-x-2">
          <label htmlFor="">CarId: </label>
          <input
            type="text"
            value={carId}
            onChange={handleCarIdChange}
            className="w-full border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            placeholder="CARXXX"
          />
        </div>

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
              <>
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover rounded"
                  />

                  <i
                    onClick={() => handleRemoveImage(index)}
                    className="bx bx-x text-2xl text-white  rounded-full absolute top-1 right-1 bg-black/50 cursor-pointer"
                  ></i>
                </div>
              </>
            ))}
            {/* add more picture COMING SOON */}
            <div className="flex items-center justify-center bg-gray-100 cursor-pointer border-blue-500 border-2">
              <i className='bx bx-plus text-3xl text-blue-500'></i>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 ${
              files.length && "cursor-pointer"
            }`}
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
