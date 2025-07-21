import React, { useState } from "react";
import UploadImagesModal from "../../components/UploadImagesModal";

const ManageCarPage = () => {
  const [showUploadImagesModal, setShowUploadImagesModal] =
    useState<boolean>(false);

  const handleUploadImagesModal = () => {
    setShowUploadImagesModal(!showUploadImagesModal);
  };

  return (
    <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
      <h2 className="font-bold text-3xl mb-8">Manage Cars</h2>
      <div>
        <button className="bg-blue-600 px-4 py-3 text-white rounded-md font-semibold cursor-pointer hover:bg-blue-900 transition-colors duration-200">
          Add new car
        </button>
        <button
          onClick={handleUploadImagesModal}
          className="bg-blue-600 px-4 py-3 text-white rounded-md font-semibold cursor-pointer hover:bg-blue-900 transition-colors duration-200"
        >
          Upload car images
        </button>
      </div>
      {/* Modal Upload Images */}
      {showUploadImagesModal && (
        <UploadImagesModal carId="" onClose={handleUploadImagesModal} />
      )}
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default ManageCarPage;
