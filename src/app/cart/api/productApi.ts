"use client";

import { Product, FakeStoreProduct } from "../types";

const FAKE_STORE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_API_URL;

// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${FAKE_STORE_API_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const products = (await response.json()) as FakeStoreProduct[];

  // Transform to our application's format
  return products.map((product) => ({
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
  }));
};

// Function to fetch a single product by ID
export const fetchProductById = async (productId: number): Promise<Product> => {
  const response = await fetch(`${FAKE_STORE_API_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const product = (await response.json()) as FakeStoreProduct;

  return {
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
  };
};
