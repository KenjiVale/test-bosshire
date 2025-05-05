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

// GET handler to fetch all carts
export async function GET() {
  try {
    // Fetch all carts
    const response = await fetch(`${FAKE_STORE_API_URL}/carts`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch carts: ${response.statusText}` },
        { status: response.status }
      );
    }

    const carts = (await response.json()) as FakeStoreCart[];

    // Transform carts to our application's format with product details
    const formattedCarts = await Promise.all(
      carts.map(async (cart) => {
        try {
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

          return {
            id: cart.id.toString(),
            items,
            createdAt: cart.date,
            totalAmount,
          };
        } catch {
          return null;
        }
      })
    );

    // Filter out any null carts (failed to process)
    const validCarts = formattedCarts.filter((cart) => cart !== null);

    return NextResponse.json(validCarts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch carts" },
      { status: 500 }
    );
  }
}

// POST handler to create a new cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, userId = 1 } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid request: items array is required" },
        { status: 400 }
      );
    }

    // Transform the items array to the format expected by FakeStoreAPI
    const fakeStoreProducts = items.map((item) => ({
      productId: parseInt(item.productId || item.product?.id || "0"),
      quantity: item.quantity || 1,
    }));

    const response = await fetch(`${FAKE_STORE_API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        date: new Date().toISOString(),
        products: fakeStoreProducts,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to create cart: ${response.statusText}` },
        { status: response.status }
      );
    }

    const newCart = (await response.json()) as FakeStoreCart;

    // Map the items from your request format to the response format
    const cartItems = items.map((item, index) => {
      return {
        id: `ci-${newCart.id}-${index}`,
        productId: item.productId || item.product?.id,
        product: item.product || {
          id: item.productId || "0",
          name: item.title || "Unknown Product",
          price: item.price || 0,
          description: item.description || "",
          image: item.image || "",
        },
        quantity: item.quantity || 1,
      };
    });

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const formattedCart = {
      id: newCart.id.toString(),
      items: cartItems,
      createdAt: newCart.date,
      totalAmount,
    };

    return NextResponse.json(formattedCart);
  } catch {
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}
