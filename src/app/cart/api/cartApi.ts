"use client";

import { Cart, Product } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to fetch all carts
export async function fetchCarts(): Promise<Cart[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch carts: ${response.statusText}`);
    }

    const carts: Cart[] = await response.json();
    return carts;
  } catch (error) {
    throw error;
  }
}

// Function to fetch a single cart by ID
export async function fetchCartById(cartId: string): Promise<Cart> {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    throw error;
  }
}

// Function to create a new cart
export async function createCart(
  items: { productId: string; product: Product; quantity: number }[]
): Promise<Cart> {
  try {
    // Format the items to match the expected API payload
    const products = items.map((item) => ({
      id: item.productId,
      title: item.product.name,
      price: item.product.price,
      description: item.product.description,
      image: item.product.image || "",
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        products,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create cart: ${response.statusText}`);
    }

    const newCart: Cart = await response.json();
    return newCart;
  } catch (error) {
    throw error;
  }
}

// Function to update a cart
export async function updateCart(
  cartId: string,
  items: { productId: string; product: Product; quantity: number }[]
): Promise<Cart> {
  try {
    // Format the items to match the expected API payload
    const products = items.map((item) => ({
      id: item.productId,
      title: item.product.name,
      price: item.product.price,
      description: item.product.description,
      image: item.product.image || "",
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        products,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update cart: ${response.statusText}`);
    }

    const updatedCart: Cart = await response.json();
    return updatedCart;
  } catch (error) {
    throw error;
  }
}

// Function to delete a cart
export async function deleteCart(cartId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete cart: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
