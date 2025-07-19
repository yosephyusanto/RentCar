import React, { useEffect, useState } from "react";
import type { MsCarRequest } from "../interfaces";
import { UploadCarInformationService } from "../services";
import { Toaster, toast } from "sonner";

const UploadCarPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carData, setCarData] = useState<MsCarRequest>({
    name: "",
    model: "",
    year: 2025,
    licensePlate: "",
    numberOfSeats: "",
    transmission: "",
    pricePerDay: 500000,
  });

  useEffect(() => {
    setCarData({
      name: "",
      model: "",
      year: 2025,
      licensePlate: "",
      numberOfSeats: "",
      transmission: "",
      pricePerDay: 500000,
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const validate = (data: MsCarRequest) => {
    if (
      !data.name ||
      !data.model ||
      !data.year ||
      !data.licensePlate ||
      !data.numberOfSeats ||
      !data.transmission ||
      !data.pricePerDay
    )
      return false;
    else return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(carData)) return;

    setIsLoading(true);
    try {
      const response: string = await UploadCarInformationService(carData);
      console.log("car data:", carData)
      toast.success(response);
    } catch (e: any) {
      toast.error(e.message || "Something went wrong when sending the data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
        <div className="max-w-2xl mx-auto pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Upload New Car
            </h1>
            <p className="text-gray-600">
              Add a new vehicle to your rental fleet
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Car Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Car Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={carData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="e.g., Toyota Camry"
                  required
                />
              </div>

              {/* Model */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={carData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="e.g., 2023 Hybrid"
                  required
                />
              </div>

              {/* Year and Seats - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={carData.year}
                    onChange={handleChange}
                    min="1900"
                    max="2030"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Seats <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfSeats"
                    value={carData.numberOfSeats}
                    onChange={handleChange}
                    min="2"
                    max="50"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 5"
                    required
                  />
                </div>
              </div>

              {/* License Plate */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  License Plate <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={carData.licensePlate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 uppercase"
                  placeholder="e.g., ABC-1234"
                  required
                />
              </div>

              {/* Transmission */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Transmission <span className="text-red-500">*</span>
                </label>
                <select
                  name="transmission"
                  value={carData.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select transmission type</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>

              {/* Price per Day */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price per Day (IDR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    Rp
                  </span>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={carData.pricePerDay}
                    onChange={handleChange}
                    min="0"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="500000"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span>Upload Car</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default UploadCarPage;
