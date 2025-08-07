import React, { useEffect, useState } from "react";
import { DataTable } from "./employee/DataTable";
import { getUserRentalService } from "@/services";
import type { RentalHistoryResponse } from "@/interfaces";
import { createRentalHistoryColumns } from "@/components/RentalHistoryColumns";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [data, setData] = useState<RentalHistoryResponse[]>([]);
  // pagination
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  // additional
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getUserRentalService(currentPage, pageSize);

      setData(response.data);
      setTotalItems(response.totalItems);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaginationChange = (page: number, newPageSize?: number) => {
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1); // kembali ke halaman 1 jika pageSize berubah
    } else {
      setCurrentPage(page);
    }
  };

  const handlePayment = (rentalId: string) => {
    navigate(`/payment/${rentalId}`);
  };

  const rentalHistoryColumns = createRentalHistoryColumns({
    onPayment: handlePayment,
  });

  return (
    <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
      <DataTable
        columns={rentalHistoryColumns}
        data={data}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={pageSize}
        isLoading={isLoading}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default HistoryPage;
