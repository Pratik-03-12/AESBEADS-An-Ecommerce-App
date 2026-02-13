import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

type CartItem = {
  product: { _id: string };
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body?.items as CartItem[] | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "INVALID_ITEMS_PAYLOAD" },
        { status: 400 },
      );
    }

    const normalizedItems = items.filter(
      (item) =>
        item &&
        item.product &&
        typeof item.product._id === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );

    if (normalizedItems.length === 0) {
      return NextResponse.json(
        { ok: false, error: "NO_VALID_ITEMS" },
        { status: 400 },
      );
    }

    const ids = Array.from(
      new Set(normalizedItems.map((item) => item.product._id)),
    );

    // Batch fetch all products once for better performance
    const products = await client.fetch<
      { _id: string; stock?: number }[]
    >(`*[_id in $ids]{ _id, stock }`, { ids });

    const productMap = new Map(
      products.map((p) => [p._id, p] as const),
    );

    for (const item of normalizedItems) {
      const product = productMap.get(item.product._id);

      if (!product || (product.stock ?? 0) < item.quantity) {
        return NextResponse.json({
          ok: false,
          productId: item.product._id,
          available: product?.stock ?? 0,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Stock validation error:", error);
    return NextResponse.json(
      { ok: false, error: "STOCK_VALIDATION_FAILED" },
      { status: 500 },
    );
  }
}
