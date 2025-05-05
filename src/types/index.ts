export interface User {
  username: string;
  token: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  createdAt: string;
  totalAmount: number;
}

// Fake Store API types
export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCartProduct {
  productId: number;
  quantity: number;
}

export interface FakeStoreCart {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartProduct[];
  __v: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
