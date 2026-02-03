"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-shop_light_bg p-4">
      <Card className="w-full max-w-md p-5 border border-shop-beige6">
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center text-shop-deepbeige">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-shop-deepbeige/80">
            {details}
          </p>
          <Button asChild className="w-full bg-shop-warmterracotta/80 hover:bg-shop-warmterracotta border-shop-warmterracotta text-white hoverEffect" size="lg">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-shop-deepbeige/80 text-center">
            Don&rsquo;t have an account?
          </div>
          <Button asChild variant="outline" className="w-full border-shop-deepbeige text-shop-deepbeige hover:bg-shop-beige6 hover:border-shop-warmterracotta hover:text-shop-warmterracotta" size="lg">
            <Link href="/auth/signup">Create an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
