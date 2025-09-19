"use client";

import { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for products
const mockProducts = [
  { id: "1", name: "Handmade Silver Necklace", image: "https://placehold.co/100x100/e5e7eb/6b7280?text=Jewelry", price: "$89.99", stock: 124, status: "Active" },
  { id: "2", name: "Organic Artisan Soap Set", image: "https://placehold.co/100x100/e5e7eb/6b7280?text=Soap", price: "$24.99", stock: 89, status: "Active" },
  { id: "3", name: "Premium Leather Handbag", image: "https://placehold.co/100x100/e5e7eb/6b7280?text=Handbag", price: "$156.99", stock: 67, status: "Active" },
  { id: "4", name: "Modern Coffee Table", image: "https://placehold.co/100x100/e5e7eb/6b7280?text=Table", price: "$250.00", stock: 10, status: "Active" },
  { id: "5", name: "Vintage T-Shirt", image: "https://placehold.co/100x100/e5e7eb/6b7280?text=T-Shirt", price: "$29.99", stock: 0, status: "Draft" },
];

export default function SellerProductsPage() {
  const [products, setProducts] = useState(mockProducts);

  const handleEdit = (productId) => {
    // Implement product editing logic here
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Optimistically update UI
    setProducts(products.filter(product => product.id !== productId));
    // Here you would add an API call to delete the product from the database
    console.log(`Deleting product with ID: ${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 p-4 md:p-8">
        <main className="flex-1 space-y-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Badge variant={product.stock === 0 ? "destructive" : "secondary"}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
