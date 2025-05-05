import { NextRequest, NextResponse } from "next/server";

// Use environment variable with fallback
const FAKE_STORE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_API_URL;

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

// After the existing interfaces, add a new interface for the product payload
interface ProductPayload {
  id?: string | number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  quantity?: number;
}

// Helper function to fetch product details
async function fetchProduct(productId: number) {
  const response = await fetch(`${FAKE_STORE_API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${productId}`);
  }
  const product = (await response.json()) as FakeStoreProduct;
  return {
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
  };
}

// GET handler to fetch a single cart
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = params.id;

    const response = await fetch(`${FAKE_STORE_API_URL}/carts/${cartId}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch cart: ${response.statusText}` },
        { status: response.status }
      );
    }

    const cart = (await response.json()) as FakeStoreCart;

    // Get product details for each item in the cart
    const items = await Promise.all(
      cart.products.map(async (item) => {
        const product = await fetchProduct(item.productId);
        return {
          id: `ci-${cart.id}-${item.productId}`,
          productId: item.productId.toString(),
          product,
          quantity: item.quantity,
        };
      })
    );

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const formattedCart = {
      id: cart.id.toString(),
      items,
      createdAt: cart.date,
      totalAmount,
    };

    return NextResponse.json(formattedCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// PUT handler to update a cart
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = params.id;
    const body = await request.json();
    const { products, userId = 1 } = body;

    // Format items for Fake Store API
    const fakeStoreItems = products.map((item: ProductPayload) => ({
      productId: parseInt(item.id?.toString() || "0"),
      quantity: item.quantity || 1,
    }));

    const response = await fetch(`${FAKE_STORE_API_URL}/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId || 1,
        date: new Date().toISOString(),
        products: fakeStoreItems,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to update cart: ${response.statusText}` },
        { status: response.status }
      );
    }

    const updatedCart = (await response.json()) as FakeStoreCart;

    // Get product details from the request payload
    const items = await Promise.all(
      products.map(async (item: ProductPayload, index: number) => {
        // Use the product details from the request payload
        const product = {
          id: item.id?.toString() || "0",
          name: item.title || "Unknown Product",
          price: item.price || 0,
          description: item.description || "",
          image: item.image || "",
        };

        return {
          id: `ci-${updatedCart.id}-${item.id || index}`,
          productId: product.id,
          product,
          quantity: fakeStoreItems[index].quantity,
        };
      })
    );

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const formattedCart = {
      id: updatedCart.id.toString(),
      userId: updatedCart.userId.toString(),
      items,
      createdAt: updatedCart.date,
      totalAmount,
    };

    return NextResponse.json(formattedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = params.id;

    const response = await fetch(`${FAKE_STORE_API_URL}/carts/${cartId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to delete cart: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
