import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [salesChart, setSalesChart] = useState([]);
  const [statusChart, setStatusChart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const pageSize = 5;

  /* =====================
     Backend-ready fetching
     ===================== */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [ordersRes, salesRes, statusRes] = await Promise.all([
          axios.get("/api/Order"),
          axios.get("/api/charts/sales"), // [{ date, revenue }]
          axios.get("/api/charts/order-status"), // [{ status, count }]
        ]);

        setOrders(ordersRes.data);
        setSalesChart(salesRes.data);
        setStatusChart(statusRes.data);
      } catch {
        // Mock fallback
        const mockOrders = Array.from({ length: 22 }, (_, i) => ({
          id: 1020 + i,
          customer: `Customer ${i + 1}`,
          total: Math.floor(Math.random() * 300 + 50),
          status: i % 2 === 0 ? "Completed" : "Pending",
        }));

        setOrders(mockOrders);

        setSalesChart([
          { date: "Mon", revenue: 400 },
          { date: "Tue", revenue: 300 },
          { date: "Wed", revenue: 500 },
          { date: "Thu", revenue: 250 },
          { date: "Fri", revenue: 650 },
          { date: "Sat", revenue: 700 },
          { date: "Sun", revenue: 450 },
        ]);

        setStatusChart([
          { status: "Completed", count: 14 },
          { status: "Pending", count: 8 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* =====================
     Search & Filters
     ===================== */
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search);

    const matchesStatus = status === "all" || o.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* =====================
     Export PDF
     ===================== */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["Order ID", "Customer", "Total", "Status"]],
      body: filteredOrders.map((o) => [
        `#${o.id}`,
        o.customer,
        `$${o.total}`,
        o.status,
      ]),
    });

    doc.save("orders-report.pdf");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black">
          Logout
        </Button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Revenue", value: "$12,430", icon: DollarSign },
          { label: "Orders", value: orders.length, icon: ShoppingCart },
          { label: "Products", value: "85", icon: Package },
          { label: "Customers", value: "210", icon: Users },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="rounded-2xl border-white/20 bg-black text-white">
              <CardContent className="p-6 flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="text-xl font-medium">{item.value}</p>
                </div>
                <item.icon />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="rounded-2xl border-white/20 bg-black text-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Revenue (Weekly)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesChart}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="revenue" stroke="#fff" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/20 bg-black text-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Orders by Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChart}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#fff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="rounded-2xl border-white/20 bg-black text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-lg font-medium">Orders</h2>

            <div className="flex gap-2">
              <input
                className="border border-white/30 bg-black px-3 py-1 text-sm text-white placeholder-gray-400"
                placeholder="Search orders"
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />

              <select
                className="border border-white/30 bg-black px-2 text-sm text-white"
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value);
                }}>
                <option value="all">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>

              <Button variant="outline" onClick={exportPDF}>
                Export PDF
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead className="border-b border-white/20">
                  <tr>
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-white/10 last:border-0">
                      <td className="py-2">#{o.id}</td>
                      <td className="py-2">{o.customer}</td>
                      <td className="py-2">${o.total}</td>
                      <td className="py-2">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}>
              Prev
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
