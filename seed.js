import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/productModel.js';

dotenv.config();

const products = [
  { name: "Wireless Headphones", description: "Noise-cancelling over-ear wireless headphones with deep bass.", category: "Electronics", price: 4999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop" },
  { name: "Classic White Sneakers", description: "Stylish and comfortable sneakers for everyday wear.", category: "Footwear", price: 2999, image: "https://images.unsplash.com/photo-1528701800489-20be3c2ea4f9?q=80&w=1200&auto=format&fit=crop" },
  { name: "Smartwatch Pro", description: "Water-resistant smartwatch with fitness tracking.", category: "Electronics", price: 7999, image: "https://images.unsplash.com/photo-1511732351666-a1a5476b1d4f?q=80&w=1200&auto=format&fit=crop" },
  { name: "Leather Laptop Bag", description: "Premium leather bag with multiple compartments.", category: "Accessories", price: 5999, image: "https://images.unsplash.com/photo-1520975922323-190a2fe0baae?q=80&w=1200&auto=format&fit=crop" },
  { name: "Cotton Hoodie", description: "Soft and warm hoodie for winter.", category: "Clothing", price: 1999, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop" },
  { name: "Analog Watch", description: "Minimal analog wrist watch with leather strap.", category: "Accessories", price: 1799, image: "https://images.unsplash.com/photo-1511735111819-9a3f0b5f7f34?q=80&w=1200&auto=format&fit=crop" },
  { name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with rich bass.", category: "Electronics", price: 2499, image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop" },
  { name: "Backpack", description: "Durable backpack with laptop compartment.", category: "Bags", price: 1899, image: "https://images.unsplash.com/photo-1582123900604-4c7d9b88f1c4?q=80&w=1200&auto=format&fit=crop" },
  { name: "Sunglasses", description: "Stylish sunglasses with UV protection.", category: "Accessories", price: 999, image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1200&auto=format&fit=crop" }
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');

  for (const p of products) {
    const exists = await Product.findOne({ name: p.name });
    if (!exists) {
      await Product.create(p);
      console.log('Inserted:', p.name);
    } else {
      console.log('Skipped (exists):', p.name);
    }
  }

  console.log('Seeding finished');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
