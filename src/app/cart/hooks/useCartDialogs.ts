import { useState } from "react";
import { CartItem } from "../../../types";

export const useCartDialogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [addCartDialogOpen, setAddCartDialogOpen] = useState(false);

  // Open cart details dialog
  const handleOpenDialog = (items: CartItem[]) => {
    setSelectedCartItems(items);
    setDialogOpen(true);
  };

  // Close cart details dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCartItems([]);
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (cartId: string) => {
    setSelectedCartId(cartId);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCartId(null);
  };

  // Open add cart dialog
  const handleOpenAddCartDialog = () => {
    setAddCartDialogOpen(true);
  };

  // Close add cart dialog
  const handleCloseAddCartDialog = () => {
    setAddCartDialogOpen(false);
  };

  return {
    // States
    dialogOpen,
    selectedCartItems,
    deleteDialogOpen,
    selectedCartId,
    addCartDialogOpen,

    // Handlers
    handleOpenDialog,
    handleCloseDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleOpenAddCartDialog,
    handleCloseAddCartDialog,
  };
};
