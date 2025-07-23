import Carousel from "./Carousel";
import ReactDOM from "react-dom";

type ImageViewModalProps = {
  images: Array<{ image_link: string; image_car_id: string }>;
  carName: string;
  isOpen: boolean;
  isAutoSlide: boolean;
  onClose: () => void;
};

const ImageViewModal = ({
  images,
  carName,
  isOpen,
  isAutoSlide,
  onClose,
}: ImageViewModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center p-4"
    >
      <i
        className="bx bx-x absolute top-3 right-3 text-white text-4xl cursor-pointer"
        onClick={onClose}
      ></i>
      {/* White modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {carName} - Images ({images.length})
          </h3>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button> */}
           <i
        className="bx bx-x  text-gray-600 text-4xl cursor-pointer"
        onClick={onClose}
      ></i>
        </div>

        {/* Carousel Content */}
        <div className="p-4">
          {images && images.length > 0 ? (
            <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] w-full">
              <Carousel
                autoSlide={isAutoSlide}
                children={images.map((image, index) => (
                  <div
                    key={image.image_car_id || index}
                    className="min-w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]"
                  >
                    <img
                      src={image.image_link}
                      alt={`${carName} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-car.jpg"; // Fallback image
                      }}
                    />
                  </div>
                ))}
                isThereImage={images.length > 1}
              />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No images available</p>
                <p className="text-gray-400 text-sm">
                  Upload images for this car to see them here
                </p>
              </div>
            </div>
          )}
        </div>

      
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default ImageViewModal;
