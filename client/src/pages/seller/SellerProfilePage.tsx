"use client";

import { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SellerProfilePage() {
  const sellerData = {
    name: "ArtisanCrafts",
    email: "artisan.crafts@example.com",
    bio: "A local seller passionate about creating unique, handmade jewelry and home decor. Our products are crafted with love and care.",
    location: "Mumbai, India",
    rating: 4.9,
    productsCount: 45,
    joinedDate: "2023-01-15",
    avatarUrl: "https://placehold.co/100x100/e5e7eb/6b7280?text=AC",
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., send data to an API
    console.log("Profile updated!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 p-4 md:p-8">
        <main className="flex-1 space-y-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Seller Profile</h2>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={sellerData.avatarUrl} alt={sellerData.name} />
                  <AvatarFallback>{sellerData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{sellerData.name}</h3>
                  <p className="text-muted-foreground">{sellerData.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-sm font-medium">Rating: {sellerData.rating} ⭐</Badge>
                    <Badge variant="outline" className="text-sm font-medium">{sellerData.productsCount} Products</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <Label htmlFor="bio">Store Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about your store..." className="mt-2" defaultValue={sellerData.bio} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" type="text" className="mt-2" defaultValue={sellerData.location} />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Email</Label>
                    <Input id="contact" type="email" className="mt-2" defaultValue={sellerData.email} />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
