"use client";

import axios from "axios";
import { Product, Cart, CartItem } from "../types";

// Use environment variable with fallback
const FAKE_STORE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_API_URL;

// Define FakeStore API types
interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface FakeStoreCartItem {
  productId: number;
  quantity: number;
}

interface FakeStoreCart {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartItem[];
  __v?: number;
}

// Function to transform FakeStore product to our app's product format
const transformProduct = (product: FakeStoreProduct): Product => ({
  id: product.id.toString(),
  name: product.title,
  price: product.price,
  description: product.description,
  image: product.image,
});

// Function to fetch all products directly from FakeStoreAPI
export const fetchProductsDirect = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<FakeStoreProduct[]>(
      `${FAKE_STORE_API_URL}/products`
    );
    return response.data.map(transformProduct);
  } catch (error) {
    throw error;
  }
};

// Function to fetch a single product directly from FakeStoreAPI
export const fetchProductDirect = async (
  productId: string | number
): Promise<Product> => {
  try {
    const response = await axios.get<FakeStoreProduct>(
      `${FAKE_STORE_API_URL}/products/${productId}`
    );
    return transformProduct(response.data);
  } catch (error) {
    throw error;
  }
};

// Function to fetch all carts directly from FakeStoreAPI
export const fetchCartsDirect = async (): Promise<Cart[]> => {
  try {
    const response = await axios.get<FakeStoreCart[]>(
      `${FAKE_STORE_API_URL}/carts`
    );

    // First fetch all products to have complete product data
    const products = await fetchProductsDirect();

    // Transform carts
    const carts = await Promise.all(
      response.data.map(async (cart: FakeStoreCart) => {
        // Transform cart items
        const items: CartItem[] = await Promise.all(
          cart.products.map(async (item: FakeStoreCartItem) => {
            const productData =
              products.find((p) => p.id === item.productId.toString()) ||
              (await fetchProductDirect(item.productId));

            return {
              id: `ci-${cart.id}-${item.productId}`,
              productId: item.productId.toString(),
              product: productData,
              quantity: item.quantity,
            };
          })
        );

        // Calculate total
        const totalAmount = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        return {
          id: cart.id.toString(),
          items,
          createdAt: cart.date,
          totalAmount,
        };
      })
    );

    return carts;
  } catch (error) {
    throw error;
  }
};

// Function to create a cart directly with FakeStoreAPI
export const createCartDirect = async (
  items: { productId: string; product: Product; quantity: number }[]
): Promise<Cart> => {
  try {
    // Transform items to FakeStoreAPI format
    const fakeStoreProducts = items.map((item) => ({
      productId: parseInt(item.productId),
      quantity: item.quantity,
    }));

    // Call FakeStoreAPI to create cart
    const response = await axios.post<FakeStoreCart>(
      `${FAKE_STORE_API_URL}/carts`,
      {
        userId: 1,
        date: new Date().toISOString(),
        products: fakeStoreProducts,
      }
    );

    // Transform response to our app's format
    const newCart = response.data;

    const cartItems = items.map((item, index) => ({
      id: `ci-${newCart.id}-${index}`,
      productId: item.productId,
      product: item.product,
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return {
      id: newCart.id.toString(),
      items: cartItems,
      createdAt: newCart.date,
      totalAmount,
    };
  } catch (error) {
    throw error;
  }
};

// Function to delete a cart directly with FakeStoreAPI
export const deleteCartDirect = async (cartId: string): Promise<void> => {
  try {
    await axios.delete(`${FAKE_STORE_API_URL}/carts/${cartId}`);
  } catch (error) {
    throw error;
  }
};
