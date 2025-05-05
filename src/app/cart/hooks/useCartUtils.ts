import { format, differenceInDays } from "date-fns";

export const useCartUtils = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (date: string) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  // Get cart status info based on creation date
  const getCartStatusInfo = (createdAt: string) => {
    const daysDiff = differenceInDays(new Date(), new Date(createdAt));

    if (daysDiff <= 1) {
      return { label: "New", color: "success" as const };
    } else if (daysDiff <= 7) {
      return { label: "Recent", color: "info" as const };
    } else {
      return { label: "Old", color: "default" as const };
    }
  };

  return {
    formatCurrency,
    formatDate,
    getCartStatusInfo,
  };
};
