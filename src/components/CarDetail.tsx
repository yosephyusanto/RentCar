import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { GetCarDetail } from "../services";
import Carousel from "./Carousel";
import { baseImageApi } from "../constant";
import type { MsCarResponse } from "../interfaces";
import NoImage from "../assets/no_image.jpg";

type CarDetailProps = {
  onClose: () => void;
  carId: string;
  formatPrice: (price: number) => string;
};

const CarDetail = ({ carId, onClose, formatPrice }: CarDetailProps) => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<MsCarResponse | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await GetCarDetail(carId);
      const images = response.images.map(
        (image) => `${baseImageApi + image.image_link}`
      );

      setSlides(images);
      setData(response);
    } catch (e: any) {
      setError(e.message || "Something went wrong when getting the data");
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Background Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <i
          className="bx bx-x absolute top-3 right-3 text-white text-4xl cursor-pointer"
          onClick={onClose}
        ></i>
        {/* White Modal box */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-hidden relative animate-modal-appear">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-4/6 lg:w-3/5 bg-gray-50">
              <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
                <Carousel isThereImage={slides.length < 1 ? false : true}>
                  {slides.length > 0
                    ? slides.map((slide, idx) => (
                        <img
                          key={idx}
                          src={slide}
                          alt={`Car image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = NoImage;
                          }}
                        />
                      ))
                    : [
                        <img
                          key="no-image"
                          src={NoImage}
                          alt="No image available"
                          className="w-full h-full object-cover"
                        />,
                      ]}
                </Carousel>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 md:2-6 lg:w-2/5">
              <div className="space-y-2 lg:space-y-6">
                {/* Car name */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {data?.name}
                  </h1>
                </div>

                {/* Price */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center flex-col lg:flex-row">
                    <span className="text-gray-600 font-medium">
                      Price per day
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">
                        {" "}
                        Rp.{" "}
                        {data?.price_per_day
                          ? formatPrice(data.price_per_day)
                          : "NA"}
                      </span>
                      <p className="text-gray-500 text-sm">per day</p>
                    </div>
                  </div>
                </div>

                {/* Car Details Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Vehicle Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">License Plate</span>
                        <span className="font-medium text-gray-900">
                          {data?.license_plate || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model</span>
                        <span className="font-medium text-gray-900">
                          {data?.model || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year</span>
                        <span className="font-medium text-gray-900">
                          {data?.year || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats</span>
                        <span className="font-medium text-gray-900">
                          {data?.number_of_car_seats || "N/A"} seats
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {data?.transmission || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default CarDetail;
