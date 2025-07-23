"use client";

import type { MsCarImages, MsCarResponse } from "@/interfaces";
import type { ColumnDef } from "@tanstack/react-table";

export interface ManageMsCarColumnsProp {
  onOpenImageModal: (images: MsCarImages[], carName: string) => void;
  onDeleteRow: (carId: string) => void;
}

export const createManageMsCarColumns = ({
  onOpenImageModal,
  onDeleteRow,
}: ManageMsCarColumnsProp): ColumnDef<MsCarResponse>[] => [
  {
    accessorKey: "car_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "license_plate",
    header: "License Plate",
  },
  {
    accessorKey: "number_of_car_seats",
    header: "Seats",
  },
  {
    accessorKey: "transmission",
    header: "Transmission",
  },
  {
    accessorKey: "price_per_day",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price_per_day"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <div
          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
            status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status ? "Available" : "Unavailable"}
        </div>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as MsCarImages[];
      const carData: MsCarResponse = row.original;
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {images.length || 0} image(s)
          </span>
          <button
            onClick={() => onOpenImageModal(images || [], carData.name)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200 cursor-pointer"
          >
            See Pictures
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const carId = row.getValue("car_id") as string;
      return (
        <div className="flex items-center gap-x-2">
          <button className="px-3 py-2 bg-amber-500 text-white rounded-md cursor-pointer transition-colors hover:bg-amber-800">
            Edit
          </button>
          <button
            onClick={() => onDeleteRow(carId)}
            className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer transition-colors hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
