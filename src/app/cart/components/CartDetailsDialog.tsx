import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "../../../types";

interface CartDetailsDialogProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  formatCurrency: (amount: number) => string;
}

export const CartDetailsDialog: React.FC<CartDetailsDialogProps> = ({
  open,
  items,
  onClose,
  formatCurrency,
}) => {
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
            <ShoppingCartIcon sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="h6">Cart Items</Typography>
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
      <DialogContent dividers sx={{ p: 0 }}>
        {items.length > 0 ? (
          <Box>
            <TableContainer component={Paper} sx={{ mb: 0, boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                      }}
                    >
                      Product
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: (theme) =>
                          theme.palette.background.default,
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {item.product.image ? (
                            <Box
                              component="img"
                              sx={{
                                width: 50,
                                height: 50,
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
                                width: 50,
                                height: 50,
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
                              <Typography variant="caption">
                                No image
                              </Typography>
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.product.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(item.product.price)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.quantity}
                          size="small"
                          variant="outlined"
                          sx={{ minWidth: 32 }}
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 500, color: "primary.main" }}
                      >
                        {formatCurrency(item.product.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
                p: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: (theme) => theme.palette.background.default,
              }}
            >
              <Typography variant="subtitle1">Total:</Typography>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                {formatCurrency(
                  items.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                  )
                )}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography align="center" color="text.secondary">
              No items in this cart
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 1 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
