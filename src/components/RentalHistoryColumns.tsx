"use client";

import type { RentalHistoryResponse } from "@/interfaces";
import { formatDate } from "@/utils/FormatDate";
import type { ColumnDef } from "@tanstack/react-table";

export interface RentalHistoryColumnsProp {
  onPayment: () => void;
  onSeeDetailTransaction: () => void;
}

export const createRentalHistoryColumns = ({
  onPayment,
  onSeeDetailTransaction,
}: RentalHistoryColumnsProp): ColumnDef<RentalHistoryResponse>[] => [
  {
    accessorKey: "rentalDate",
    header: "Rental Date",
    cell: ({ row }) => {
      const rentalDate: string = row.getValue("rentalDate");
        const returnDate: string = row.original.returnDate;
      return (
        <div>
          {formatDate(rentalDate)} - {formatDate(returnDate)}
        </div>
      );
    },
  },
  {
    accessorKey: "carName",
    header: "Car",
    cell: ({ row }) => {
      const carName: string = row.getValue("carName");
      const carModel: string = row.original.carModel;
      return <div>{carName + " " + carModel}</div>;
    },
  },
  {
    accessorKey: "pricePerDay",
    header: "Rent Price per Day ",
    cell : ({row}) => {
      const price = parseFloat(row.getValue("pricePerDay"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: "totalDay",
    header: "Total Day",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell : ({row}) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as boolean;
      return (
        <div
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
            status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status ? "Paid" : "Unpaid"}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
       const status = row.getValue("paymentStatus") as boolean;

      return (
        <div className="flex items-center gap-x-2">
        {status ? (
          <button
            className="text-blue-600 underline"
            onClick={onSeeDetailTransaction}
            type="button"
          >
            See Details
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={onPayment}
            type="button"
          >
            Pay
          </button>
        )}
        </div>
      );
    },
  },
];
