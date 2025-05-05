import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface CartHeaderProps {
  isLoading: boolean;
  isFiltering: boolean;
  onToggleFilter: () => void;
  onRefresh: () => void;
  onAddCart: () => void;
}

export const CartHeader: React.FC<CartHeaderProps> = ({
  isLoading,
  isFiltering,
  onToggleFilter,
  onRefresh,
  onAddCart,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon
            sx={{ mr: 2, fontSize: 36, color: "primary.main" }}
          />
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Cart Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage your shopping carts and orders
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            onClick={onToggleFilter}
            color={isFiltering ? "primary" : "inherit"}
            sx={{ borderRadius: 2 }}
          >
            {isFiltering ? "Filters Applied" : "Filters"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={isLoading}
            sx={{ borderRadius: 2 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={onAddCart}
            disabled={isLoading}
            sx={{ borderRadius: 2 }}
          >
            New Cart
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
