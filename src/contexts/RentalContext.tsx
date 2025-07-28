import { useContext, useState, type ReactNode, createContext } from "react";

interface RentalContextType {
  pickupDate: string;
  returnDate: string;
  setPickupDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setRentalDates: (pickup: string, returnDate: string) => void;
  clearRentalDates: () => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

interface RentalProviderProps {
  children: ReactNode;
}

export const RentalProvider: React.FC<RentalProviderProps> = ({ children }) => {
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");

  const setRentalDates = (pickup: string, returnDate: string) => {
    setPickupDate(pickup);
    setReturnDate(returnDate);
  };

  const clearRentalDates = () => {
    setPickupDate("");
    setReturnDate("");
  };

  const value: RentalContextType = {
    pickupDate,
    returnDate,
    setPickupDate,
    setReturnDate,
    setRentalDates,
    clearRentalDates,
  };

  return (
    <RentalContext.Provider value={value}>{children}</RentalContext.Provider>
  );
};

// Custom hook to use the rental context
export const useRental = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error("useRental must be used within a RentalProvider");
  }
  return context;
};
