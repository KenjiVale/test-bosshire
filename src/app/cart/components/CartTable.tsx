import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Button,
  Stack,
  IconButton,
  Chip,
  Skeleton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Cart } from "../../../types";

interface CartTableProps {
  carts: Cart[];
  isLoading: boolean;
  isFiltering: boolean;
  page: number;
  rowsPerPage: number;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  getCartStatusInfo: (date: string) => {
    label: string;
    color: "success" | "info" | "default";
  };
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onViewDetails: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
  onAddCart: () => void;
}

export const CartTable: React.FC<CartTableProps> = ({
  carts,
  isLoading,
  isFiltering,
  page,
  rowsPerPage,
  formatCurrency,
  formatDate,
  getCartStatusInfo,
  onPageChange,
  onRowsPerPageChange,
  onViewDetails,
  onDeleteCart,
  onAddCart,
}) => {
  // Loading skeleton for table
  const TableLoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton animation="wave" height={24} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={24} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={24} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" height={24} />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              animation="wave"
              height={24}
              width={24}
              sx={{ mx: "auto" }}
            />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              animation="wave"
              height={24}
              width={24}
              sx={{ mx: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="Carts table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Cart ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Date Created
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Items
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Details
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableLoadingSkeleton />
            ) : carts.length > 0 ? (
              carts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cart) => {
                  const statusInfo = getCartStatusInfo(cart.createdAt);

                  return (
                    <TableRow
                      key={cart.id}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ fontWeight: "medium" }}
                          >
                            #{cart.id}
                          </Typography>
                          <Chip
                            label={statusInfo.label}
                            color={statusInfo.color}
                            size="small"
                            sx={{
                              height: 20,
                              "& .MuiChip-label": { px: 1, py: 0.2 },
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>{formatDate(cart.createdAt)}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${cart.items.length} ${
                            cart.items.length === 1 ? "item" : "items"
                          }`}
                          variant="outlined"
                          size="small"
                          color="default"
                          sx={{ height: 22, "& .MuiChip-label": { px: 1 } }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "medium", color: "primary.main" }}
                      >
                        {formatCurrency(cart.totalAmount)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => onViewDetails(cart.id)}
                          title="View Details"
                          size="small"
                          sx={{
                            bgcolor: (theme) =>
                              theme.palette.primary.light + "20",
                            "&:hover": {
                              bgcolor: (theme) =>
                                theme.palette.primary.light + "30",
                            },
                          }}
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => onDeleteCart(cart.id)}
                          title="Delete Cart"
                          size="small"
                          sx={{
                            bgcolor: (theme) =>
                              theme.palette.error.light + "20",
                            "&:hover": {
                              bgcolor: (theme) =>
                                theme.palette.error.light + "30",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {isFiltering
                      ? "No carts found for the selected date range."
                      : "No carts available."}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={onAddCart}
                    sx={{ mt: 2 }}
                  >
                    Create your first cart
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={carts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      />
    </Paper>
  );
};
