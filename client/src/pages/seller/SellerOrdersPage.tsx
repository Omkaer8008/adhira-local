"use client";

import { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

// Mock data for orders
const mockOrders = [
  { id: "#3210", customer: "Liam Johnson", date: "2023-10-18", amount: "$250.00", status: "Delivered" },
  { id: "#3209", customer: "Olivia Smith", date: "2023-10-17", amount: "$150.00", status: "Shipped" },
  { id: "#3208", customer: "Noah Williams", date: "2023-10-16", amount: "$300.00", status: "Pending" },
  { id: "#3207", customer: "Emma Brown", date: "2023-10-15", amount: "$450.00", status: "Delivered" },
  { id: "#3206", customer: "Sophia Wilson", date: "2023-10-14", amount: "$550.00", status: "Delivered" },
  { id: "#3205", customer: "Liam Johnson", date: "2023-10-13", amount: "$120.00", status: "Shipped" },
  { id: "#3204", customer: "Olivia Smith", date: "2023-10-12", amount: "$75.00", status: "Pending" },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 p-4 md:p-8">
        <main className="flex-1 space-y-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search orders..." className="pl-9" />
                </div>
                <Button variant="outline" className="ml-4">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              {order.status}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Pending")}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>Shipped</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Delivered")}>Delivered</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
