import type { MsCarCardResponse } from "../interfaces";
import { baseImageApi } from "../constant";
import NoImage from "../assets/no_image.jpg";
import { useState } from "react";
import CarDetail from "./CarDetail";

type CarCardProps = {
  data: MsCarCardResponse;
};

const CarCard = ({ data }: CarCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const imageUrl = data.imageLink ? baseImageApi + data.imageLink : null;
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    // max-w-xs
    <div className=" w-full bg-white rounded-2xl  shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={imageUrl || NoImage}
          alt={data.name}
        />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-black opacity-40 w-full h-full rounded-t-2xl"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {data.name}
        </h3>
        <p className="text-lg font-medium text-blue-600 mt-2">
          <span className="font-semibold">
            Rp. {formatPrice(data.price_per_day)}
          </span>{" "}
          <span className="text-gray-500 text-sm">/hari</span>
        </p>
      </div>

      {/* Button Section */}
      <div className="p-4 pt-0">
        <button
          onClick={handleModal}
          className="w-full py-2 text-white font-semibold bg-blue-600 rounded-xl transition-all duration-300 hover:bg-blue-700 transform hover:scale-105"
        >
          <span className="flex justify-center items-center">
            {/* <span className="mr-2">🚗</span> */}
            Detail
          </span>
        </button>
      </div>

      {/* Card Detail Modal */}
      {showModal && (
        <CarDetail
          formatPrice={formatPrice}
          onClose={handleModal}
          carId={data.car_id}
        />
      )}
    </div>
  );
};

export default CarCard;
