export type Offer = {
  id: string
  title: string
  subtitle?: string
  image: string
  ctaLabel: string
  href: string
  badge?: string
}

export const latestOffers: Offer[] = [
  {
    id: "limited-20",
    title: "Limited Offer",
    subtitle: "10% Off!",
    image: "/offers/offer-1.jpg",
    ctaLabel: "Shop Now",
    href: "/shop",
    badge: "New",
  },
  {
    id: "limited-30",
    title: "Limited Offer",
    subtitle: "10% Off!",
    image: "/offers/offer-7.jpg",
    ctaLabel: "Shop Now",
    href: "/shop",
    badge: "New",
  },
]


