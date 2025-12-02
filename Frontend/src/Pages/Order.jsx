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
    {
      id: "ORD67890",
      date: "10 Oct 2025",
      status: "Shipped",
      total: "₹1899",
      items: [
        {
          name: "Graphic T-Shirt",
          image: "https://via.placeholder.com/100",
          price: "₹899",
        },
      ],
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Delivered") return "text-green-600";
    if (status === "Shipped") return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>

        {/* ORDER LIST */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              {/* ORDER TOP ROW */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 pb-4 border-b border-black/10">
                <div>
                  <p className="text-sm opacity-70">Order ID</p>
                  <p className="text-md font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Date</p>
                  <p className="text-md font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Status</p>
                  <p
                    className={`text-md font-semibold ${getStatusStyle(
                      order.status
                    )}`}>
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Total Amount</p>
                  <p className="text-md font-semibold">{order.total}</p>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl border border-black/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-black/20"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className="opacity-70 text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ORDER ACTIONS */}
              <div className="pt-4 mt-4 border-t border-black/10 flex justify-end gap-3">
                <button className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all text-sm">
                  Track Order
                </button>
                <button className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all text-sm">
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
