import { useEffect, useState } from "react";
import UploadImagesModal from "../../components/UploadImagesModal";
import { createManageMsCarColumns } from "./Columns";
import { DataTable } from "./DataTable";
import { deleteCar, GetManageCarData } from "@/services";
import type {
  MsCarImages,
  MsCarPaginatedResponse,
  MsCarResponse,
} from "@/interfaces";
import ImageViewModal from "@/components/ImageViewModal";
import { baseImageApi } from "@/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageCarPage = () => {
  const [data, setData] = useState<MsCarResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUploadImagesModal, setShowUploadImagesModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  // state untuk image view modal
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<MsCarImages[]>([]);
  const [selectedCarName, setSelectedCarName] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: MsCarPaginatedResponse = await GetManageCarData();
      console.log("Fetched car data:", response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleUploadImagesModal = () => {
    setShowUploadImagesModal(!showUploadImagesModal);
  };

  // Handler untuk membuka image modal dengan URL yang sudah di-concat
  const handleOpenImageModal = (images: MsCarImages[], carName: string) => {
    // Transform images to include full URL
    const imagesWithFullUrl = images.map((image) => ({
      ...image,
      image_link: `${baseImageApi}${image.image_link}`,
    }));

    setSelectedImages(imagesWithFullUrl);
    setSelectedCarName(carName || "Unknown Car");
    setShowImageModal(true);
  };
  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImages([]);
    setSelectedCarName("");
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      const response: string = await deleteCar(carId);
      await fetchData();
      toast.success(response);
    } catch (e: any) {
      toast.error(
        e.message || "Something went wrong when trying to delete car"
      );
    }
  };

  const manageMsCarColumns = createManageMsCarColumns({
    onOpenImageModal: handleOpenImageModal,
    onDeleteRow: handleDeleteCar,
  });

  return (
    <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
      <h2 className="font-bold text-3xl mb-8">Manage Cars</h2>
      <div>
        <button
          onClick={() => navigate("/employee/upload")}
          className="bg-blue-600 px-4 py-3 text-white rounded-md font-semibold cursor-pointer hover:bg-blue-900 transition-colors duration-200"
        >
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

      {/* Modal View Images */}
      <ImageViewModal
        images={selectedImages}
        carName={selectedCarName}
        isOpen={showImageModal}
        isAutoSlide={false}
        onClose={handleCloseImageModal}
      />

      {/* Table */}
      <div className="container mx-auto py-10">
        <DataTable columns={manageMsCarColumns} data={data} />
      </div>
    </div>
  );
};

export default ManageCarPage;
