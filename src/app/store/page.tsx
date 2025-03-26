"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/data/products"

export default function Store() {
  return (
    <div className="font-sans bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 min-h-screen">
      <header className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        />
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex justify-center space-x-8">
              {["Home", "About", "Experience", "Gallery", "Contact", "Store"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item === "Store" 
                      ? "/store" 
                      : item === "Home" 
                        ? "/" 
                        : `/#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.nav>

        {/* Store Content */}
        <div className="container mx-auto px-4 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold mb-4 gradient-text">
              3D Printed Products
            </h1>
            <p className="text-2xl text-gray-300 mb-6">
              Handcrafted with precision and care
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-400"
            >
              Based in Boston, MA
            </motion.div>
            <motion.a
              href="https://www.etsy.com/shop/YourShopName"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="inline-block mt-6 px-6 py-3 bg-[#F1641E] text-white rounded-full font-semibold hover:bg-[#E55C18] transition-colors"
            >
              <i className="fab fa-etsy mr-2"></i>
              Visit Our Etsy Shop
            </motion.a>
          </motion.div>

          {/* Best Sellers Section */}
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4 gradient-text"
            >
              Best Sellers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-8"
            >
              Check out our most popular items below, or visit our{" "}
              <a
                href="https://www.etsy.com/shop/YourShopName"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F1641E] hover:text-[#E55C18] transition-colors underline"
              >
                Etsy shop
              </a>
              {" "}for our complete collection of unique 3D printed designs.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="relative h-64 bg-gradient-to-b from-transparent to-slate-900/10">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 bg-gradient-to-b from-slate-800/30 to-slate-900/30">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-2xl font-bold text-blue-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <motion.a
                      href="https://www.etsy.com/shop/YourShopName"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#F1641E] text-white rounded-full font-semibold hover:bg-[#E55C18] transition-colors"
                    >
                      Buy on Etsy
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center p-8 rounded-lg backdrop-blur-sm border border-gray-700/30"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xl text-gray-300">Located in</p>
                <p className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors">Boston, Massachusetts</p>
              </div>
              <div>
                <p className="text-xl text-gray-300">Email</p>
                <a href="mailto:jfkengineeringcswp@gmail.com" className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  jfkengineeringcswp@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xl text-gray-300">Phone</p>
                <a href="tel:+1908-798-8082" className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  908-798-8082
                </a>
              </div>
              <div>
                <p className="text-xl text-gray-300">Shop</p>
                <a 
                  href="https://www.etsy.com/shop/YourShopName" //Update with actual Etsy shop link
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold text-[#F1641E] hover:text-[#E55C18] transition-colors"
                >
                  Visit our Etsy Shop
                </a>
              </div>
              <p className="mt-6 text-gray-400">
                Custom orders and inquiries are welcome. Please feel free to reach out!
              </p>
            </div>
          </motion.div>
        </div>
      </header>
    </div>
  )
} 