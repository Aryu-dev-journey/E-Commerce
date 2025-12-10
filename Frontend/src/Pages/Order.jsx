import React from "react";

export default function Order() {
  const orders = [
    {
      id: "ORD12345",
      date: "15 Nov 2025",
      status: "Delivered",
      total: "₹2499",
      items: [
        {
          name: "Black Hoodie",
          image: "https://via.placeholder.com/100",
          price: "₹1499",
        },
        {
          name: "White Sneakers",
          image: "https://via.placeholder.com/100",
          price: "₹999",
        },
      ],
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Delivered") return "text-green-400";
    if (status === "Shipped") return "text-blue-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition shadow-md"
          >
            {/* ORDER INFO */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-white/10 pb-4 mb-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Date</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Status</p>
                <p className={`font-semibold ${getStatusStyle(order.status)}`}>
                  {order.status}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Total</p>
                <p className="font-semibold">{order.total}</p>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="flex flex-wrap gap-4 mb-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition w-40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover border border-white/10 mb-2"
                  />
                  <p className="font-medium text-center">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.price}</p>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="flex-1 px-4 py-2 border border-white/20 rounded-lg hover:bg-white hover:text-black transition text-sm">
                Track Order
              </button>
              <button className="flex-1 px-4 py-2 border border-white/20 rounded-lg hover:bg-white hover:text-black transition text-sm">
                View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
