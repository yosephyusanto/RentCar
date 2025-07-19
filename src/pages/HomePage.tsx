import { useEffect, useState } from "react";
import { GetCarCardService } from "../services";
import type { MsCarCardResponse } from "../interfaces";
import CarCard from "../components/CarCard";

const HomePage = () => {
  const [cards, setCards] = useState<MsCarCardResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCarCardData();
  }, []);

  const fetchCarCardData = async () => {
    try {
      const response = await GetCarCardService();
      setCards(response);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Something went wrong when getting the data");
    }
  };

  const renderCards = (card: MsCarCardResponse, index: number) => {
    return [<CarCard data={card} key={index} />];
  };

  return (
    <>
      <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
        {/* Filtering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mb-16">
          {/* Pickup Date */}
          <div className="space-y-2">
            <label
              htmlFor="pickupDate"
              className="block text-sm font-semibold text-gray-700"
            >
              Pickup Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                // value={filters.pickupDate}
                // onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {/* icon */}
              </div>
            </div>
          </div>
          {/* Return Date */}
          <div className="space-y-2">
            <label
              htmlFor="returnDate"
              className="block text-sm font-semibold text-gray-700"
            >
              Return Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                // value={filters.returnDate}
                // onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {/* icon */}
              </div>
            </div>
          </div>
          {/* Production Year */}
          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <label
              htmlFor="productionYear"
              className="block text-sm font-semibold text-gray-700"
            >
              Production Year
            </label>
            <div className="relative">
              <select
                id="productionYear"
                name="productionYear"
                // value={filters.productionYear}
                // onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
              >
                <option value="">Any Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {/* icon */}
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:justify-end  sm:col-span-2  md:col-span-3 md:justify-end gap-3  lg:col-span-1 lg:justify-start lg:items-end">
            <button
              // onClick={handleSearch}
              className="flex-1 sm:flex-none lg:h-[49.33px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Search Cars
            </button>
          </div>
        </div>

        {/* Cars List */}
        <div className="min-h-screen flex flex-col">
          {error ? (
            <div className="flex flex-1 justify-center items-center">
              <p className="text-center">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
              {cards.map(renderCards)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
