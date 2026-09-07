import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, Eye, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete order");
        setOrders(orders.filter((order) => order._id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <RefreshCw size={32} className="animate-spin text-brand-yellow-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black uppercase text-brand-ink">
            Order Management
          </h1>
          <p className="text-xs font-semibold text-gray-500">
            View and manage all customer orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-[10px] font-black uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Order Items</th>
                <th className="px-6 py-4">Payment & Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              <AnimatePresence>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-3">
                        <ShoppingBag size={24} className="text-gray-400" />
                      </div>
                      <p className="font-bold">No orders found</p>
                      <p className="text-[10px] mt-1">
                        When customers place orders, they will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={order._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-black text-brand-ink">
                          {order.orderId}
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">
                          {order.customerInfo.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {order.customerInfo.phone}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate max-w-[150px]">
                          {order.customerInfo.address}, {order.customerInfo.city} - {order.customerInfo.pincode}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-700">
                          {order.orderItems.length} Item(s)
                        </div>
                        <ul className="text-[10px] text-gray-500 list-disc list-inside mt-1 max-w-[200px]">
                          {order.orderItems.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="truncate">
                              {item.name} (x{item.quantity})
                            </li>
                          ))}
                          {order.orderItems.length > 2 && (
                            <li className="text-gray-400 italic">
                              + {order.orderItems.length - 2} more
                            </li>
                          )}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase text-amber-700 border border-amber-200">
                          {order.paymentMethod === "upi" ? "UPI / QR" : order.paymentMethod === "card" ? "Card" : "COD"}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                          <CheckCircle2 size={12} />
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-black text-brand-ink text-sm">
                          ₹{order.totalAmount}
                        </div>
                        {order.totalSavings > 0 && (
                          <div className="text-[10px] font-bold text-emerald-600 mt-0.5">
                            Saved ₹{order.totalSavings}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-gray-200 shadow-sm hover:border-red-200 hover:bg-red-50 ml-2 cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
