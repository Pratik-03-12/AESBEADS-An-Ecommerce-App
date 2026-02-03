import NoAccess from "@/components/NoAccess";
import WishListProducts from "../../../components/WishListProducts";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";

const WishListPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don't miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
