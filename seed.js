import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/productModel.js';

dotenv.config();

const products = [
  { name: "Wireless Headphones", description: "Noise-cancelling over-ear wireless headphones with deep bass.", category: "Electronics", price: 4999, image: "/images/wireless-headphone.jpg" },
  { name: "Classic White Sneakers", description: "Stylish and comfortable sneakers for everyday wear.", category: "Footwear", price: 2999, image: "images/white-sneakers.jpg" },
  { name: "Smartwatch Pro", description: "Water-resistant smartwatch with fitness tracking.", category: "Electronics", price: 7999, image: "/images/smartwatch-pro.jpg" },
  { name: "Leather Laptop Bag", description: "Premium leather bag with multiple compartments.", category: "Accessories", price: 5999, image: "/images/leather-laptop-bag.jpg" },
  { name: "Cotton Hoodie", description: "Soft and warm hoodie for winter.", category: "Clothing", price: 1999, image: "/images/cotton-hoodie.jpg" },
  { name: "Analog Watch", description: "Minimal analog wrist watch with leather strap.", category: "Accessories", price: 1799, image: "/images/analog-watch.jpg" },
  { name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with rich bass.", category: "Electronics", price: 2499, image: "/images/bluetooth-speaker.jpg" },
  { name: "Backpack", description: "Durable backpack with laptop compartment.", category: "Bags", price: 1899, image: "/images/backpack.jpg" },
  { name: "Sunglasses", description: "Stylish sunglasses with UV protection.", category: "Accessories", price: 999, image: "/images/sunglasses.jpg" }
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
