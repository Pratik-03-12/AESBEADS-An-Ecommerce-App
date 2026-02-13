"use client";

import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = term.trim();
    if (!value) return;

    // Navigate to the existing Shop page with a search param.
    // This does NOT change any Sanity queries – Shop already handles ?search.
    router.push(`/shop?search=${encodeURIComponent(value)}`);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Search products"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full p-1.5 text-shop-deepbeige hover:text-shop-coralpeach hover:bg-shop-beige6/70 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="hidden md:flex items-center">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products..."
            className="w-40 lg:w-52 px-3 py-1.5 text-sm rounded-full border border-shop-beige6 bg-white focus:outline-none focus:border-shop-coralpeach focus:ring-1 focus:ring-shop-coralpeach text-shop-deepbeige placeholder:text-shop-coralpeach/50"
          />
        </form>
      )}
    </div>
  );
};

export default SearchBar;