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
    {/* <div className="fixed bg-black opacity-50 top-0 left-0 right-0 bottom-0 z-50"></div> */}
      <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
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
