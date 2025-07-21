import { useEffect, useState } from "react";
import { GetCarCardService } from "../services";
import type {
  MsCarCardPaginatedResponse,
  MsCarCardResponse,
} from "../interfaces";
import CarCard from "../components/CarCard";

const HomePage = () => {
  const [paginatedData, setPaginatedData] =
    useState<MsCarCardPaginatedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>(""); // asc or desc

  useEffect(() => {
    fetchCarCardData();
  }, [currentPage, sortOrder]);

  const fetchCarCardData = async () => {
    setIsLoading(true);
    try {
      const response = await GetCarCardService(currentPage, sortOrder);
      setPaginatedData(response);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Something went wrong when getting the data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderCards = (card: MsCarCardResponse, index: number) => {
    return [<CarCard data={card} key={card.car_id || index} />];
  };

  // Pagination Component
  const renderPagination = () => {
    if (!paginatedData || paginatedData.totalPages <= 1) return null;

    const { currentPage: current, totalPages } = paginatedData;
    const pages = [];
    const maxVisiblePages = 5;

    // calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
        className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="ml-1 hidden sm:inline">Previous</span>
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="ellipsis1"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
            i === current
              ? "z-10 bg-blue-600 border-blue-600 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );

      // Next button
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
          className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="ellipsis2"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-4 mt-12 mb-8">
        {/* Pagination info */}
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{(current - 1) * 10 + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(current * 10, paginatedData.totalItems)}
          </span>{" "}
          of <span className="font-medium">{paginatedData.totalItems}</span>{" "}
          results
        </div>

        {/* Pagination buttons */}
        <nav
          className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {pages}
        </nav>

        {/* Page jump */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={current}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                handlePageChange(page);
              }
            }}
            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
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
                className="w-full px-4 py-3 border-2 border-gray-300 outline-0 rounded-lg focus:border-blue-600 transition-all duration-200 bg-gray-50 hover:bg-white"
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
                className="w-full px-4 py-3 border-2 border-gray-300 outline-0 rounded-lg focus:border-blue-600  transition-all duration-200 bg-gray-50 hover:bg-white"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
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

        {/* Sorting */}
        <div className="flex justify-end items-center mb-20  ">
          <div className="flex flex-col md:flex-row md:items-center ">
            <p className="font-semibold mb-2 md:mb-0 md:pr-2">Sorting by</p>
            <select
              id="sorting"
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-0 focus:border-blue-500  transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
            >
              <option value="">Choose</option>
              <option value="asc">Lower Price - Higher Price</option>
              <option value="desc">Higher Price - Lower Price</option>
            </select>
          </div>
        </div>

        {/* Cars List with Loading State*/}
        <div className="min-h-screen flex flex-col">
          {isLoading ? (
            <div className="flex flex-1 justify-center items-center py-20">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-600 font-medium">Loading cars...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-1 justify-center items-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          ) : paginatedData?.data && paginatedData.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedData.data.map(renderCards)}
              </div>
              {renderPagination()}
            </>
          ) : (
            <div className="flex flex-1 justify-center items-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No cars found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
