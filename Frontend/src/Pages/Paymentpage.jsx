import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, Home, User, Package } from "lucide-react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-white text-black flex justify-center items-start p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">

        {/* LEFT — ACCOUNT + ORDER SUMMARY */}
        <div className="space-y-8">
          {/* Account Details */}
          <Card className="bg-white border border-black/10 rounded-2xl shadow-sm  transition-all">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                <User size={20} /> Account Details
              </h2>

              <div className="grid grid-cols-2 gap-5">
                <Input placeholder="First Name" className="bg-white border-black/20" />
                <Input placeholder="Last Name" className="bg-white border-black/20" />
              </div>
              <Input placeholder="Email Address" className="bg-white border-black/20" />
              <Input placeholder="Phone Number" className="bg-white border-black/20" />
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-white border border-black/10 rounded-2xl shadow-sm  transition-all">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                <Package size={20} /> Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <span>Subtotal</span>
                  <span>₹ 2,999</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Shipping</span>
                  <span>₹ 149</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Tax</span>
                  <span>₹ 89</span>
                </div>
                <hr className="border-black/10" />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>₹ 3,237</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — PAYMENT METHODS */}
        <Card className="bg-white border border-black/10 rounded-2xl shadow-sm  transition-all">
          <CardContent className="p-8 space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Payment Method</h2>

            {/* Method Selector */}
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                className="w-full border-black/20"
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={18} className="mr-2" /> Card
              </Button>

              <Button
                variant={paymentMethod === "upi" ? "default" : "outline"}
                className="w-full border-black/20"
                onClick={() => setPaymentMethod("upi")}
              >
                <Smartphone size={18} className="mr-2" /> UPI
              </Button>

              <Button
                variant={paymentMethod === "cod" ? "default" : "outline"}
                className="w-full border-black/20"
                onClick={() => setPaymentMethod("cod")}
              >
                <Home size={18} className="mr-2" /> COD
              </Button>
            </div>

            {/* CARD PAYMENT */}
            {paymentMethod === "card" && (
              <div className="space-y-6 p-8 border border-black/10 rounded-xl bg-black/5 backdrop-blur-sm">
                <Input placeholder="Cardholder Name" className="bg-white border-black/20" />
                <Input placeholder="Card Number" className="bg-white border-black/20" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" className="bg-white border-black/20" />
                  <Input placeholder="CVV" className="bg-white border-black/20" />
                </div>
              </div>
            )}

            {/* UPI PAYMENT */}
            {paymentMethod === "upi" && (
              <div className="space-y-6 p-8 border border-black/10 rounded-xl bg-black/5 backdrop-blur-sm">
                <Input placeholder="Enter UPI ID (example@bank)" className="bg-white border-black/20" />
              </div>
            )}

            {/* COD */}
            {paymentMethod === "cod" && (
              <div className="p-8 border border-black/10 rounded-xl bg-black/5 backdrop-blur-sm text-sm leading-relaxed">
                Cash on Delivery available for selected items. Please ensure mobile number is active for confirmation.
              </div>
            )}

            <Button className="w-full py-6 text-lg font-semibold bg-black text-white rounded-xl hover:bg-black/90">
              Complete Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
