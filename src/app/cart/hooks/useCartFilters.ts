import { useState, useEffect } from "react";
import { Cart } from "../../../types";

export const useCartFilters = (carts: Cart[]) => {
  const [filteredCarts, setFilteredCarts] = useState<Cart[]>(carts);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Update filtered carts when carts or date range changes
  useEffect(() => {
    let filtered = [...carts];

    if (startDate || endDate) {
      filtered = filtered.filter((cart) => {
        const cartDate = new Date(cart.createdAt);

        if (startDate && endDate) {
          return cartDate >= startDate && cartDate <= endDate;
        } else if (startDate) {
          return cartDate >= startDate;
        } else if (endDate) {
          return cartDate <= endDate;
        }

        return true;
      });
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }

    setFilteredCarts(filtered);
    setPage(0); // Reset to first page when filters change
  }, [carts, startDate, endDate]);

  // Apply date filter
  const applyDateFilter = (
    newStartDate: Date | null,
    newEndDate: Date | null
  ) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Clear filters
  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setIsFiltering(false);
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    filteredCarts,
    startDate,
    endDate,
    isFiltering,
    page,
    rowsPerPage,
    applyDateFilter,
    handleClearFilters,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
