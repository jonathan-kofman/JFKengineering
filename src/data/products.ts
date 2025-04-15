// File: data/products.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'toys' | 'jewelry' | 'household';
}

export const products: Product[] = [
  {
    id: 1,
    name: "Mini Robot Figurine",
    description: "A cute desk companion for tech enthusiasts",
    price: 19.99,
    imageUrl: "/images/products/robot.jpg",
    category: "toys"
  },
  {
    id: 2,
    name: "Geometric Puzzle Cube",
    description: "Challenge your mind with this 3D printed puzzle",
    price: 24.99,
    imageUrl: "/images/products/puzzle.jpg",
    category: "toys"
  },
  {
    id: 3,
    name: "DNA Helix Earrings",
    description: "Science-inspired jewelry for the modern intellectual",
    price: 29.99,
    imageUrl: "/images/products/earrings.jpg",
    category: "jewelry"
  },
  {
    id: 4,
    name: "Molecular Necklace",
    description: "Custom molecule structure pendant on a silver chain",
    price: 34.99,
    imageUrl: "/images/products/necklace.jpg",
    category: "jewelry"
  },
  {
    id: 5,
    name: "Phone Stand",
    description: "Ergonomic design to hold your phone at the perfect angle",
    price: 14.99,
    imageUrl: "/images/products/phone-stand.jpg",
    category: "household"
  },
  {
    id: 6,
    name: "Cable Organizer",
    description: "Keep your desk tidy with this sleek cable management solution",
    price: 9.99,
    imageUrl: "/images/products/cable-organizer.jpg",
    category: "household"
  },
  // Add more products as needed
]