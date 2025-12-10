import React from "react";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-12">

        {/* Header */}
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>

        {/* Profile Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-300">Profile Details</h2>

          <div className="space-y-4">
            {["Full Name", "Email", "Phone Number", "Address"].map((ph) => (
              <input
                key={ph}
                type="text"
                placeholder={ph}
                className="w-full p-3 rounded-xl border border-white/10 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/5 transition"
              />
            ))}
          </div>

          <button className="w-full py-3 rounded-xl border border-white/20 bg-white text-black hover:bg-black hover:text-white transition font-medium">
            Save Changes
          </button>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-300">Recent Orders</h2>

          <div className="space-y-3">
            {[1, 2, 3].map((o) => (
              <div
                key={o}
                className="p-4 rounded-xl border border-white/10 bg-white/5 flex justify-between items-center hover:bg-white/10 transition"
              >
                <div className="space-y-1">
                  <p className="font-medium">{`Order #${o}482X`}</p>
                  <p className="text-sm text-gray-400">Delivered • 3 items</p>
                </div>
                <button className="text-sm underline text-gray-400 hover:text-white transition">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
