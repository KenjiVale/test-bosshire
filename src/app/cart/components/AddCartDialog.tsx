import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../../types";

interface AddCartDialogProps {
  open: boolean;
  products: Product[];
  isLoading: boolean;
  onClose: () => void;
  onAddCart: (
    items: { productId: string; product: Product; quantity: number }[]
  ) => void;
}

export const AddCartDialog: React.FC<AddCartDialogProps> = ({
  open,
  products,
  isLoading,
  onClose,
  onAddCart,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<
    {
      productId: string;
      product: Product;
      quantity: number;
    }[]
  >([]);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Reset state when dialog is opened
  useEffect(() => {
    if (open) {
      setSelectedProducts([]);
      setProductId("");
      setError(null);
    }
  }, [open]);

  // Add a product to the cart
  const handleAddProduct = (product: Product) => {
    // Check for duplicates
    const isDuplicate = selectedProducts.some(
      (item) => item.productId === product.id
    );

    if (isDuplicate) {
      setError("This product is already in your cart");
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      {
        productId: product.id,
        product,
        quantity: 1,
      },
    ]);
    setProductId("");
    setError(null);
  };

  // Remove a product from the cart
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(
      selectedProducts.filter((item) => item.productId !== productId)
    );
  };

  // Update product quantity
  const handleQuantityChange = (productId: string, quantity: number) => {
    // Don't allow quantities less than 1
    if (quantity < 1) {
      return;
    }

    setSelectedProducts(
      selectedProducts.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Handle creating the cart
  const handleCreateCart = async () => {
    if (selectedProducts.length === 0) {
      setError("Please add at least one product to the cart");
      return;
    }

    onAddCart(selectedProducts);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <DialogTitle
        sx={{ borderBottom: "1px solid", borderColor: "divider", p: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddShoppingCartIcon sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="h6">Create New Cart</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Select products to add to your cart
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                const product = products.find((p) => p.id === productId);
                if (product) {
                  handleAddProduct(product);
                }
              }}
              sx={{ display: "flex", gap: 1 }}
            >
              <TextField
                select
                placeholder=""
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                fullWidth
                SelectProps={{
                  native: true,
                }}
                error={Boolean(error)}
                helperText={error}
                size="small"
                sx={{ "& .MuiInputBase-root": { borderRadius: 1 } }}
              >
                <option value="" disabled>
                  -- Select --
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {formatCurrency(product.price)}
                  </option>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={() => {
                  const product = products.find((p) => p.id === productId);
                  if (product) {
                    handleAddProduct(product);
                  }
                }}
                disabled={!productId}
                sx={{ borderRadius: 1 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Selected Products
        </Typography>

        {selectedProducts.length > 0 ? (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mt: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      bgcolor: (theme) => theme.palette.background.default,
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      bgcolor: (theme) => theme.palette.background.default,
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      bgcolor: (theme) => theme.palette.background.default,
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      bgcolor: (theme) => theme.palette.background.default,
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      bgcolor: (theme) => theme.palette.background.default,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((item) => (
                  <TableRow key={item.productId} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {item.product.image ? (
                          <Box
                            component="img"
                            sx={{
                              width: 40,
                              height: 40,
                              objectFit: "contain",
                              mr: 2,
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 1,
                              p: 0.5,
                            }}
                            alt={item.product.name}
                            src={item.product.image}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: "grey.100",
                              mr: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Typography variant="caption">No image</Typography>
                          </Box>
                        )}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.product.price)}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            height: 22,
                            width: 22,
                          }}
                        >
                          -
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{ mx: 1, fontWeight: "medium" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            height: 22,
                            width: 22,
                            bgcolor: (theme) =>
                              theme.palette.primary.light + "10",
                          }}
                        >
                          +
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 500, color: "primary.main" }}
                    >
                      {formatCurrency(item.product.price * item.quantity)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleRemoveProduct(item.productId)}
                        sx={{
                          bgcolor: (theme) => theme.palette.error.light + "20",
                          "&:hover": {
                            bgcolor: (theme) =>
                              theme.palette.error.light + "30",
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{ bgcolor: (theme) => theme.palette.background.default }}
                >
                  <TableCell colSpan={3} align="right">
                    <Typography variant="subtitle1" fontWeight="medium">
                      Total:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {formatCurrency(
                        selectedProducts.reduce(
                          (sum, item) =>
                            sum + item.product.price * item.quantity,
                          0
                        )
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
              mt: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No products added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Select a product from the dropdown above to add it to your cart
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button onClick={onClose} sx={{ borderRadius: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateCart}
          disabled={selectedProducts.length === 0 || isLoading}
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{ borderRadius: 1 }}
        >
          {isLoading ? "Creating..." : "Create Cart"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
