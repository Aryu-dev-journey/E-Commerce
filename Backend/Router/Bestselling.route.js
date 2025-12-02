const express = require("express");
const route3 = express.Router();

route3.get("/BestSellings", (req, res) => {
  const BestSellings = [
    {
      id: 1,
      name: "Classic Leather Backpack",
      brand: "UrbanEdge",
      price: 4999,
      currency: "INR",
      rating: 4.8,
      reviews: 326,
      image:
        "https://plus.unsplash.com/premium_photo-1664353833832-b03ab1a002b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025",
      description:
        "Handcrafted premium leather backpack with multiple compartments and durable zippers.",
    },
    {
      id: 2,
      name: "Wireless Noise-Canceling Headphones",
      brand: "SoundMax",
      price: 8999,
      currency: "INR",
      rating: 4.7,
      reviews: 421,
      image:
        "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
      description:
        "Immersive sound with active noise cancellation and 30-hour battery life.",
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      brand: "FitCore",
      price: 6499,
      currency: "INR",
      rating: 4.6,
      reviews: 512,
      image:
        "https://plus.unsplash.com/premium_photo-1712761998611-c59db7dff27e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      description:
        "Track heart rate, sleep, and steps with water resistance and 10-day battery.",
    },
    {
      id: 4,
      name: "Minimalist Analog Watch",
      brand: "Eclipse",
      price: 5999,
      currency: "INR",
      rating: 4.9,
      reviews: 290,
      image:
        "https://images.unsplash.com/photo-1723994584335-7ea1cf96fc47?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      description:
        "Slim profile, Japanese quartz movement, and stainless-steel casing for timeless style.",
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      brand: "SitWell",
      price: 10499,
      currency: "INR",
      rating: 4.5,
      reviews: 218,
      image:
        "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      description:
        "Breathable mesh design with adjustable lumbar support and 360° swivel base.",
    },
    {
      id: 6,
      name: "Compact Wireless Keyboard",
      brand: "TypeFlow",
      price: 2999,
      currency: "INR",
      rating: 4.4,
      reviews: 154,
      image:
        "https://images.unsplash.com/photo-1533105718272-e3ed3b5b5391?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167",
      description:
        "Low-profile keys and Bluetooth connectivity for seamless multi-device use.",
    },
    {
      id: 7,
      name: "Portable Bluetooth Speaker",
      brand: "BassBoom",
      price: 4499,
      currency: "INR",
      rating: 4.6,
      reviews: 389,
      image:
        "hhttps://images.unsplash.com/photo-1674303324806-7018a739ed11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
      description:
        "Rich bass, 12-hour battery life, and waterproof design for outdoor adventures.",
    },
    {
      id: 8,
      name: "Scented Soy Candle Set",
      brand: "Lumos Living",
      price: 1499,
      currency: "INR",
      rating: 4.9,
      reviews: 271,
      image:
        "https://images.unsplash.com/photo-1643122966696-a67c288b39d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      description:
        "Eco-friendly candles with lavender, vanilla, and sandalwood fragrances.",
    },
  ];
  res.json(BestSellings);
});

module.exports = route3;
