import React from "react";


export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-12">
        {/* Header */}
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>

        {/* Profile Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Profile Details</h2>

          <div className="space-y-4">
            {["Full Name", "Email", "Phone Number", "Address"].map((ph) => (
              <input
                key={ph}
                type="text"
                placeholder={ph}
                className="w-full p-3 rounded-xl border border-black/5 bg-black/5 focus:bg-white transition focus:outline-none"
              />
            ))}
          </div>

          <button className="w-full py-3 rounded-xl border border-black hover:bg-black hover:text-white transition font-medium">
            Save Changes
          </button>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Recent Orders</h2>

          <div className="space-y-3">
            {[1, 2, 3].map((o) => (
              <div
                key={o}
                className="p-4 rounded-xl border border-black/10 flex justify-between items-center hover:bg-black/5 transition"
              >
                <div className="space-y-1">
                  <p className="font-medium">Order #{o}482X</p>
                  <p className="text-sm opacity-60">Delivered • 3 items</p>
                </div>
                <button className="text-sm underline opacity-70 hover:opacity-100">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
