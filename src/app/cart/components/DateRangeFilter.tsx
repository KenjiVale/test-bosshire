import React from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  IconButton,
  CardContent,
  Collapse,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";

interface DateRangeFilterProps {
  open: boolean;
  startDate: Date | null;
  endDate: Date | null;
  isLoading: boolean;
  isFiltering: boolean;
  onClose: () => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  open,
  startDate,
  endDate,
  isLoading,
  isFiltering,
  onClose,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
  onClearFilter,
}) => {
  return (
    <Collapse in={open}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: "visible",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DateRangeIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Filter By Date Range
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>

        <CardContent sx={{ pt: 3, pb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  flexBasis: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(40% - 8px)",
                  },
                }}
              >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={onStartDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  flexBasis: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(40% - 8px)",
                  },
                }}
              >
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={onEndDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-start",
                  flexBasis: {
                    xs: "100%",
                    md: "calc(20% - 8px)",
                  },
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<FilterAltIcon />}
                  onClick={onApplyFilter}
                  disabled={isLoading}
                  size="medium"
                  sx={{ borderRadius: 1 }}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={onClearFilter}
                  disabled={!isFiltering || isLoading}
                  size="medium"
                  sx={{ borderRadius: 1 }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </LocalizationProvider>
        </CardContent>
      </Paper>
    </Collapse>
  );
};
