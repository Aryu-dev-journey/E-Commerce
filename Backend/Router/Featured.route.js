const express = require("express");
const route2 = express.Router(); 

route2.get("/featured", (req, res) => {
  const featured = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: 6499,
      image:
        "https://images.unsplash.com/photo-1580226223521-5412ec88237a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1271",
    },
    {
      id: 2,
      name: "Classic White Sneakers",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1695552835881-fdcf4bf18aa6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      id: 3,
      name: "Black Leather Backpack",
      price: 7299,
      image:
        "https://images.unsplash.com/photo-1595724281096-bd3e2b66c86a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: 4,
      name: "Monochrome Sunglasses",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1615210768832-159ca3912a05?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      id: 5,
      name: "White Cotton Hoodie",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1687275159801-d8e41303062e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    },
    {
      id: 6,
      name: "Black Wireless Earbuds",
      price: 5599,
      image:
        "https://images.unsplash.com/photo-1648447272271-1c2292144c50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
  ];

  res.json(featured);
});

module.exports = route2;
