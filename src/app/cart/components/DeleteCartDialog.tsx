import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteCartDialogProps {
  open: boolean;
  deleteLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteCartDialog: React.FC<DeleteCartDialogProps> = ({
  open,
  deleteLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DeleteIcon sx={{ mr: 1.5, color: "error.main" }} />
          <Typography variant="h6">Delete Cart</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 1 }}>
        <Typography variant="body1">
          Are you sure you want to delete this cart? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button
          onClick={onClose}
          sx={{ borderRadius: 1 }}
          disabled={deleteLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={deleteLoading}
          startIcon={
            deleteLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <DeleteIcon />
            )
          }
          sx={{ borderRadius: 1 }}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
