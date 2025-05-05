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

// GET handler to fetch a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await fetch(`${FAKE_STORE_API_URL}/products/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch product: ${response.statusText}` },
        { status: response.status }
      );
    }

    const product = (await response.json()) as FakeStoreProduct;

    // Transform to our application's format
    const formattedProduct = {
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch product with ID ${id}` },
      { status: 500 }
    );
  }
}
