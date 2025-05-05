"use client";

import React, { useState } from "react";
import { Container } from "@mui/material";
import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "../../components/Header";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";
import { Product } from "../../types";
import {
  CartHeader,
  DateRangeFilter,
  DeleteCartDialog,
  CartTable,
  CartDetailsDialog,
  AddCartDialog,
} from "./components";
import { useCartDialogs, useCartFilters, useCartUtils } from "./hooks";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContent />
    </ProtectedRoute>
  );
}

function CartPageContent() {
  const {
    carts,
    products,
    isLoading,
    deleteLoading,
    addCart,
    deleteCart,
    refetchCarts,
  } = useCart();
  const { showNotification } = useNotification();

  // Use the extracted hooks
  const {
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
  } = useCartFilters(carts);

  const {
    dialogOpen,
    selectedCartItems,
    deleteDialogOpen,
    selectedCartId,
    addCartDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleOpenAddCartDialog,
    handleCloseAddCartDialog,
  } = useCartDialogs();

  const { formatCurrency, formatDate, getCartStatusInfo } = useCartUtils();

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Toggle filter menu
  const toggleFilterMenu = () => {
    setFilterMenuOpen((prev) => !prev);
  };

  // Apply date filters
  const handleApplyDateFilter = () => {
    applyDateFilter(startDate, endDate);
    setFilterMenuOpen(false);
  };

  // Handle form submission for creating a new cart
  const handleAddCart = async (
    items: { productId: string; product: Product; quantity: number }[]
  ) => {
    try {
      await addCart(items);
      handleCloseAddCartDialog();
      showNotification("Cart created successfully", "success");
    } catch {
      showNotification("Failed to create cart", "error");
    }
  };

  // Handle cart deletion
  const handleDeleteCart = async () => {
    if (!selectedCartId) return;

    try {
      await deleteCart(selectedCartId);
      handleCloseDeleteDialog();
      showNotification("Cart deleted successfully", "success");
    } catch {
      showNotification("Failed to delete cart", "error");
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      await refetchCarts();
      showNotification("Data refreshed successfully", "success");
    } catch {
      showNotification("Failed to refresh data", "error");
    }
  };

  // Handle date changes
  const handleStartDateChange = (newValue: Date | null) => {
    applyDateFilter(newValue, endDate);
  };

  const handleEndDateChange = (newValue: Date | null) => {
    applyDateFilter(startDate, newValue);
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <CartHeader
          isLoading={isLoading}
          isFiltering={isFiltering}
          onToggleFilter={toggleFilterMenu}
          onRefresh={handleRefresh}
          onAddCart={handleOpenAddCartDialog}
        />

        <DateRangeFilter
          open={filterMenuOpen}
          startDate={startDate}
          endDate={endDate}
          isLoading={isLoading}
          isFiltering={isFiltering}
          onClose={toggleFilterMenu}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onApplyFilter={handleApplyDateFilter}
          onClearFilter={handleClearFilters}
        />

        <CartTable
          carts={filteredCarts}
          isLoading={isLoading}
          isFiltering={isFiltering}
          page={page}
          rowsPerPage={rowsPerPage}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          getCartStatusInfo={getCartStatusInfo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onViewDetails={(cartId) =>
            handleOpenDialog(carts.find((c) => c.id === cartId)?.items || [])
          }
          onDeleteCart={handleOpenDeleteDialog}
          onAddCart={handleOpenAddCartDialog}
        />

        <CartDetailsDialog
          open={dialogOpen}
          items={selectedCartItems}
          onClose={handleCloseDialog}
          formatCurrency={formatCurrency}
        />

        <DeleteCartDialog
          open={deleteDialogOpen}
          deleteLoading={deleteLoading}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteCart}
        />

        <AddCartDialog
          open={addCartDialogOpen}
          products={products}
          isLoading={isLoading}
          onClose={handleCloseAddCartDialog}
          onAddCart={handleAddCart}
        />
      </Container>
    </>
  );
}
