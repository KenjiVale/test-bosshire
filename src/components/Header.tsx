import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { useRouter, usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NextLink from "next/link";

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    showNotification("Successfully logged out", "success");
    router.push("/login");
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigationLinks = [
    {
      name: "Cart",
      path: "/cart",
      icon: <ShoppingCartIcon fontSize="small" />,
    },
  ];

  const stringAvatar = (name: string) => {
    return {
      children: `${name.split(" ")[0][0]}${
        name.split(" ").length > 1 ? name.split(" ")[1][0] : ""
      }`,
    };
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Typography
            variant="h6"
            noWrap
            component={NextLink}
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              textDecoration: "none",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              mr: 4,
            }}
          >
            E-Commerce Admin
          </Typography>

          {user && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                {navigationLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={NextLink}
                    href={link.path}
                    color={pathname === link.path ? "primary" : "inherit"}
                    startIcon={link.icon}
                    sx={{
                      mr: 2,
                      py: 1,
                      fontWeight: pathname === link.path ? 600 : 400,
                      borderBottom:
                        pathname === link.path
                          ? `2px solid ${theme.palette.primary.main}`
                          : `2px solid transparent`,
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "transparent",
                        borderBottom: `2px solid ${theme.palette.primary.light}`,
                      },
                      transition: "border-bottom 0.2s ease-in-out",
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    "& .MuiTypography-root": {
                      color: "primary.main",
                    },
                  },
                }}
                onClick={handleClick}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    mr: 1.5,
                  }}
                  {...(user.username ? stringAvatar(user.username) : {})}
                />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body2" fontWeight={500}>
                    {user.username || "User"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
                <KeyboardArrowDownIcon
                  sx={{ ml: 0.5, color: "text.secondary" }}
                />
              </Box>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                    mt: 1.5,
                    width: 200,
                    border: "1px solid",
                    borderColor: "divider",
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1.5,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose} sx={{ color: "text.primary" }}>
                  <AccountCircleIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
