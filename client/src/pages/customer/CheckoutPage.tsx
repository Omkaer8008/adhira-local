import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, MapPin, Truck, Shield, ArrowLeft } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState("address1");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [newAddress, setNewAddress] = useState(false);

  // Mock data
  const orderItems = [
    {
      id: "1",
      name: "Handmade Silver Necklace",
      price: 89.99,
      quantity: 2,
      seller: "ArtisanCrafts",
    },
    {
      id: "2",
      name: "Organic Artisan Soap Set",
      price: 24.99,
      quantity: 1,
      seller: "NaturalSoaps Co",
    },
  ];

  const savedAddresses = [
    {
      id: "address1",
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "address2",
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      phone: "+1 (555) 123-4567",
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    console.log("Order placed");
    // Redirect to order confirmation
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={address.id} id={address.id} />
                        <Label htmlFor={address.id} className="font-medium">
                          {address.type}
                        </Label>
                      </div>
                      <div className="ml-6 text-sm text-muted-foreground">
                        <p>{address.name}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.phone}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="font-medium">
                      Add new address
                    </Label>
                  </div>
                </RadioGroup>

                {selectedAddress === "new" && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last name" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Street address" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input id="zipCode" placeholder="ZIP code" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Phone number" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-medium">
                        Credit/Debit Card
                      </Label>
                    </div>
                    
                    {selectedPayment === "card" && (
                      <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="Full name" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="font-medium">
                        UPI Payment
                      </Label>
                    </div>

                    {selectedPayment === "upi" && (
                      <div className="ml-6">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="yourname@upi" />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="font-medium">
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>
                  </Label>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full btn-hero"
                  size="lg"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Place Order
                </Button>

                <div className="text-center text-sm text-muted-foreground space-y-1">
                  <p>Your payment is secured with SSL encryption</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on all orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;