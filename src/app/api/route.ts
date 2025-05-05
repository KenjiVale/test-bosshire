import { NextResponse } from "next/server";

// Use environment variable with fallback
const FAKE_STORE_API_URL =
  process.env.NEXT_PUBLIC_FAKE_STORE_API_URL || "https://fakestoreapi.com";

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

// GET handler to fetch all products directly from root /api endpoint
export async function GET() {
  try {
    const response = await fetch(`${FAKE_STORE_API_URL}/products`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch products: ${response.statusText}` },
        { status: response.status }
      );
    }

    const products = (await response.json()) as FakeStoreProduct[];

    // Transform to our application's format
    const formattedProducts = products.map((product: FakeStoreProduct) => ({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("API Critical Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
