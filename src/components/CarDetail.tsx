import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { GetCarDetail } from "../services";
import Carousel from "./Carousel";
import { baseImageApi } from "../constant";
import type { MsCarResponse } from "../interfaces";
import NoImage from "../assets/no_image.jpg";
import { useRental } from "@/contexts/RentalContext";

type CarDetailProps = {
  onClose: () => void;
  carId: string;
  formatPrice: (price: number) => string;
};

const CarDetail = ({ carId, onClose, formatPrice }: CarDetailProps) => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<MsCarResponse | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const { pickupDate, returnDate } = useRental();

  const rentalDateInfo = {
    pickupDate,
    returnDate,
  };
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [rentalDays, setRentalDays] = useState<number>(0);

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
      const response = await GetCarDetail(carId, pickupDate, returnDate);
      const images = response.car.images.map(
        (image) => `${baseImageApi + image.image_link}`
      );

      setSlides(images);
      setData(response.car);
      setTotalPrice(response.totalPrice);
      setRentalDays(response.rentalDays);
    } catch (e: any) {
      setError(e.message || "Something went wrong when getting the data");
    }
  };

  const handleRent = () => {
    // validation if user login as customer
    // if login go to payment page
    // if not go to login page
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return ReactDOM.createPortal(
    <>
      {/* Background Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <i
          className="bx bx-x absolute top-3 right-3 text-white text-4xl cursor-pointer hover:scale-110 transition-transform"
          onClick={onClose}
        ></i>
        {/* White Modal box */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl max-h-[95vh] overflow-y-auto relative animate-modal-appear">
          {error && (
            <div className="text-red-500 text-center p-4 bg-red-50 m-4 rounded-lg">
              <i className="bx bx-error-circle text-xl mr-2"></i>
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row">
            {/* ✅ Left Section: Image + Price */}
            <div className="md:w-4/6 lg:w-3/5 bg-gray-50">
              {/* Image Carousel */}
              <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                <Carousel isThereImage={slides.length > 0} autoSlide={true}>
                  {slides.length > 0
                    ? slides.map((slide, idx) => (
                        <div
                          key={idx}
                          className="min-w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
                        >
                          <img
                            src={slide}
                            alt={`Car image ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = NoImage;
                            }}
                          />
                        </div>
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

              {/* ✅ Price Details Section (Moved Here) */}
              <div className="p-4 md:p-6 bg-white border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <i className="bx bx-money mr-2 text-lg"></i>
                    Price Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Price per day</span>
                      <span className="font-semibold text-gray-900">
                        Rp {data ? formatPrice(data.price_per_day) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Duration</span>
                      <span className="font-semibold text-gray-900">
                        {rentalDays} days
                      </span>
                    </div>
                    <hr className="border-green-200" />
                    <div className="flex justify-between items-center bg-green-100 rounded-lg p-3">
                      <span className="text-green-800 font-bold text-lg">
                        Total Price
                      </span>
                      <span className="text-green-900 font-bold text-xl md:text-2xl">
                        Rp {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <p className="text-green-600 text-xs md:text-sm text-center">
                      * Price includes taxes and fees
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Right Section: Car Details + Rental Info */}
            <div className="p-6 md:p-8 md:w-2/6 lg:w-2/5 overflow-y-auto">
              <div className="space-y-4 lg:space-y-6">
                {/* Car name & Status */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {data?.name || "Loading..."}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        data?.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {data?.status ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>

                {/* ✅ Rental Period Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <i className="bx bx-calendar mr-2 text-lg"></i>
                    Rental Period
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <span className="text-blue-700 font-medium text-sm">
                          Pickup Date
                        </span>
                        <p className="text-gray-900 font-semibold text-sm md:text-base">
                          {formatDate(rentalDateInfo.pickupDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <span className="text-blue-700 font-medium text-sm">
                          Return Date
                        </span>
                        <p className="text-gray-900 font-semibold text-sm md:text-base">
                          {formatDate(rentalDateInfo.returnDate)}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">
                          Total Duration
                        </span>
                        <span className="text-blue-900 font-bold text-lg">
                          {rentalDays} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <i className="bx bx-car mr-2 text-lg"></i>
                    Vehicle Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center text-sm">
                        <i className="bx bx-id-card mr-2"></i>
                        License Plate
                      </span>
                      <span className="font-semibold text-gray-900 bg-white px-2 py-1 rounded border text-sm">
                        {data?.license_plate || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center text-sm">
                        <i className="bx bx-category mr-2"></i>
                        Model
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {data?.model || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center text-sm">
                        <i className="bx bx-calendar-alt mr-2"></i>
                        Year
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {data?.year || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center text-sm">
                        <i className="bx bx-group mr-2"></i>
                        Capacity
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {data?.number_of_car_seats || "N/A"} seats
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center text-sm">
                        <i className="bx bx-cog mr-2"></i>
                        Transmission
                      </span>
                      <span className="font-semibold text-gray-900 capitalize text-sm">
                        {data?.transmission || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 sticky bottom-0 bg-white">
                  <button
                    onClick={handleRent}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!data?.status}
                  >
                    <i className="bx bx-credit-card text-xl"></i>
                    <span>{data?.status ? "Rent Now" : "Not Available"}</span>
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
