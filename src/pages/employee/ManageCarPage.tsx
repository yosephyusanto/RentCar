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
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

const ManageCarPage = () => {
  const [data, setData] = useState<MsCarResponse[]>([]);
  const [showUploadImagesModal, setShowUploadImagesModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  // state untuk image view modal
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<MsCarImages[]>([]);
  const [selectedCarName, setSelectedCarName] = useState<string>("");
  // state untuk delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [carToDelete, setCarToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  // show delete confirmation modal
  const handleDeleteRequest = (carId: string) => {
    const car = data.find((c) => c.car_id === carId);
    if (car) {
      setCarToDelete({ id: carId, name: car.name });
      setShowDeleteModal(true);
    }
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return; // Prevent closing while deleting
    setShowDeleteModal(false);
    setCarToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;

    try {
      setIsDeleting(true);
      const response: string = await deleteCar(carToDelete.id);

      // Update local state immediately for better UX
      setData((prevData) =>
        prevData.filter((car) => car.car_id !== carToDelete.id)
      );

      toast.success(
        response || `${carToDelete.name} has been deleted successfully`
      );

      // Close modal
      setShowDeleteModal(false);
      setCarToDelete(null);
    } catch (e: any) {
      console.error("Delete car error:", e);
      toast.error(
        e.message || "Something went wrong when trying to delete car"
      );

      // Refresh data to ensure UI is in sync if delete failed
      await fetchData();
    } finally {
      setIsDeleting(false);
    }
  };

  const manageMsCarColumns = createManageMsCarColumns({
    onOpenImageModal: handleOpenImageModal,
    onDeleteRequest: handleDeleteRequest,
  });

  return (
    <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
      <h2 className="font-bold text-3xl mb-8">Manage Cars</h2>
      <div className="flex gap-y-4  flex-col items-start md:flex-row md:gap-x-4">
        <button
          onClick={() => navigate("/employee/upload")}
          className="bg-blue-600 px-4 py-3 text-white rounded-md font-semibold cursor-pointer hover:bg-blue-800 transition-colors duration-200"
        >
          Add new car
        </button>
        <button
          onClick={handleUploadImagesModal}
          className="bg-green-500 px-4 py-3 text-white rounded-md font-semibold cursor-pointer hover:bg-green-800 transition-colors duration-200"
        >
          Upload car images
        </button>
      </div>
      {/* Modal Upload Images */}
      {showUploadImagesModal && (
        <UploadImagesModal
          onFetchData={fetchData}
          onClose={handleUploadImagesModal}
        />
      )}

      {/* Modal View Images */}
      <ImageViewModal
        images={selectedImages}
        carName={selectedCarName}
        isOpen={showImageModal}
        isAutoSlide={false}
        onClose={handleCloseImageModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        carName={carToDelete?.name || ""}
        carId={carToDelete?.id || ""}
        isLoading={isDeleting}
      />

      {/* Table */}
      <div className="container mx-auto py-10">
        <DataTable columns={manageMsCarColumns} data={data} />
      </div>
    </div>
  );
};

export default ManageCarPage;
