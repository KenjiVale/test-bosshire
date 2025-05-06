"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Cart, Product } from "../app/cart/types";
import { useNotification } from "./NotificationContext";
import {
  fetchCarts as apiFetchCarts,
  createCart as apiCreateCart,
  updateCart as apiUpdateCart,
  deleteCart as apiDeleteCart,
  fetchProducts,
} from "../app/cart/api";
import { fetchCartById } from "../app/cart/api/cartApi";

interface CartContextType {
  carts: Cart[];
  filteredCarts: Cart[];
  products: Product[];
  isLoading: boolean;
  deleteLoading: boolean;
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ start: Date | null; end: Date | null }>
  >;
  addCart: (
    items: { productId: string; product: Product; quantity: number }[]
  ) => Promise<void>;
  getCart: (cartId: string) => Promise<Cart | null>;
  updateCart: (
    cartId: string,
    items: { productId: string; product: Product; quantity: number }[]
  ) => Promise<void>;
  deleteCart: (cartId: string) => Promise<void>;
  filterCartsByDateRange: (
    startDate: Date | null,
    endDate: Date | null
  ) => void;
  refetchCarts: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [filteredCarts, setFilteredCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const { showNotification } = useNotification();

  // Function to fetch cart data
  const refetchCarts = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch products first to ensure we have the latest
      const productsData = await fetchProducts();
      setProducts(productsData);

      // Then fetch carts
      const cartsData = await apiFetchCarts();
      setCarts(cartsData);
      setFilteredCarts(cartsData);
    } catch {
      showNotification("Failed to refresh data from API", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Fetch carts and products from API on mount
  useEffect(() => {
    refetchCarts();
  }, [refetchCarts]);

  // Get a single cart by ID
  const getCart = async (cartId: string): Promise<Cart | null> => {
    try {
      setIsLoading(true);
      const cart = await fetchCartById(cartId);
      return cart;
    } catch {
      showNotification("Failed to fetch cart", "error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new cart via API
  const addCart = async (
    items: { productId: string; product: Product; quantity: number }[]
  ) => {
    if (items.length === 0) return;

    try {
      setIsLoading(true);
      // Call API to create new cart with the full item data including product details
      await apiCreateCart(items);
      showNotification("Cart created successfully", "success");

      // Refetch all carts to ensure data consistency
      await refetchCarts();

      // Reset filters to show all carts including the new one
      setDateRange({ start: null, end: null });
    } catch {
      showNotification("Failed to create cart", "error");
      throw new Error("Failed to create cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing cart
  const updateCart = async (
    cartId: string,
    items: { productId: string; product: Product; quantity: number }[]
  ) => {
    if (items.length === 0) return;

    try {
      setIsLoading(true);
      // Call API to update cart with the full item data including product details
      await apiUpdateCart(cartId, items);
      showNotification("Cart updated successfully", "success");

      // Refetch all carts to ensure data consistency
      await refetchCarts();
    } catch {
      showNotification("Failed to update cart", "error");
      throw new Error("Failed to update cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a cart
  const deleteCart = async (cartId: string) => {
    try {
      setDeleteLoading(true);
      // Call API to delete cart
      await apiDeleteCart(cartId);
      showNotification("Cart deleted successfully", "success");

      // Refetch all carts to ensure data consistency
      await refetchCarts();
    } catch {
      showNotification("Failed to delete cart", "error");
      throw new Error("Failed to delete cart");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter carts by date range
  const filterCartsByDateRange = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      setDateRange({ start: startDate, end: endDate });
    },
    []
  );

  // Update filtered carts when carts or date range changes
  useEffect(() => {
    let filtered = [...carts];

    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter((cart) => {
        const cartDate = new Date(cart.createdAt);

        if (dateRange.start && dateRange.end) {
          return cartDate >= dateRange.start && cartDate <= dateRange.end;
        } else if (dateRange.start) {
          return cartDate >= dateRange.start;
        } else if (dateRange.end) {
          return cartDate <= dateRange.end;
        }

        return true;
      });
    }

    setFilteredCarts(filtered);
  }, [carts, dateRange]);

  return (
    <CartContext.Provider
      value={{
        carts,
        filteredCarts,
        products,
        isLoading,
        deleteLoading,
        dateRange,
        setDateRange,
        addCart,
        getCart,
        updateCart,
        deleteCart,
        filterCartsByDateRange,
        refetchCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
