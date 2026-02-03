"use server";

import { Address } from "@/sanity.types";
import { CartItem } from "@/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  userId: string;
  address: Address | null;
};

export async function createCheckoutSession(
  groupedItems: CartItem[],
  metadata: Metadata
): Promise<string | null> {
  // TODO: Implement your payment provider (e.g. Stripe) checkout session here.
  // Use metadata.userId, metadata.customerEmail, metadata.address, and groupedItems
  // to create a session and return the checkout URL.
  return null;
}
