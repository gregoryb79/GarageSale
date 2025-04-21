import { Item, ReturnCart, ReturnWishlist } from './model'; // Adjust the import path as needed

export const items: Item[] = [
  {
    _id: "1",
    name: "Classic Leather Wallet",
    description: "Handcrafted genuine leather wallet with 8 card slots and a coin pouch.",
    price: 39.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 15,
    category: "Accessories",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    name: "Wireless Bluetooth Earbuds",
    description: "Noise-canceling wireless earbuds with up to 24 hours battery life.",
    price: 59.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 30,
    category: "Electronics",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    name: "Reusable Water Bottle",
    description: "Insulated stainless steel bottle, keeps drinks hot or cold for 12 hours.",
    price: 19.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 50,
    category: "Home & Kitchen",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "4",
    name: "Yoga Mat - Extra Thick",
    description: "Durable, non-slip yoga mat with extra cushioning for joint comfort.",
    price: 29.95,
    imageurl: "/images/no_image_available.jpg",
    stock: 25,
    category: "Fitness",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "5",
    name: "Portable Phone Charger",
    description: "10000mAh slim power bank with fast charging capability.",
    price: 25.49,
    imageurl: "/images/no_image_available.jpg",
    stock: 40,
    category: "Electronics",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "6",
    name: "Ceramic Coffee Mug",
    description: "15oz large ceramic mug with a comfortable grip and modern design.",
    price: 12.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 60,
    category: "Home & Kitchen",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "7",
    name: "Men's Cotton T-Shirt",
    description: "Soft and breathable 100% cotton t-shirt available in multiple colors.",
    price: 14.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 70,
    category: "Clothing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "8",
    name: "Desk LED Lamp",
    description: "Adjustable LED desk lamp with touch controls and 5 brightness levels.",
    price: 34.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 20,
    category: "Home & Office",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "9",
    name: "Backpack for Laptop",
    description: "Water-resistant backpack with padded laptop sleeve and USB port.",
    price: 49.99,
    imageurl: "/images/no_image_available.jpg",
    stock: 18,
    category: "Accessories",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "10",
    name: "Stainless Steel Knife Set",
    description: "8-piece professional kitchen knife set with ergonomic handles.",
    price: 74.95,
    imageurl: "/images/no_image_available.jpg",
    stock: 12,
    category: "Home & Kitchen",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const cart: ReturnCart = [
    {
      itemId: "2", // Wireless Bluetooth Earbuds
      quantity: 1,
    },
    {
      itemId: "5", // Portable Phone Charger
      quantity: 2,
    },
    {
      itemId: "7", // Men's Cotton T-Shirt
      quantity: 3,
    },
  ];

  export const wishlist: ReturnWishlist = [
    {
      itemId: "3", // LED Desk Lamp with USB Charging Port
      quantity: 1,
    },
    {
      itemId: "6", // Ergonomic Office Chair
      quantity: 1,
    },
    {
      itemId: "10", // Smart Home Speaker
      quantity: 1,
    },
  ];
