import { Link, useParams } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import productJewelry from "@/assets/product-jewelry.jpg";
import productSoap from "@/assets/product-soap.jpg";

const OrderTrackingPage = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: "ORD-2024-001",
    status: "shipped",
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-20",
    trackingNumber: "TRK123456789",
    total: 204.97,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "+1 (555) 123-4567",
    },
    items: [
      {
        id: "1",
        name: "Handmade Silver Necklace",
        price: 89.99,
        quantity: 2,
        image: productJewelry,
        seller: "ArtisanCrafts",
      },
      {
        id: "2",
        name: "Organic Artisan Soap Set",
        price: 24.99,
        quantity: 1,
        image: productSoap,
        seller: "NaturalSoaps Co",
      },
    ],
    tracking: [
      {
        status: "placed",
        title: "Order Placed",
        description: "Your order has been placed successfully",
        date: "2024-01-15 10:30 AM",
        completed: true,
      },
      {
        status: "accepted",
        title: "Order Accepted",
        description: "Your order has been accepted by the seller",
        date: "2024-01-15 11:45 AM",
        completed: true,
      },
      {
        status: "shipped",
        title: "Order Shipped",
        description: "Your order has been shipped and is on the way",
        date: "2024-01-16 02:15 PM",
        completed: true,
      },
      {
        status: "delivered",
        title: "Delivered",
        description: "Your order has been delivered successfully",
        date: "Expected: 2024-01-20",
        completed: false,
      },
    ],
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    const iconClass = completed ? "text-green-500" : "text-muted-foreground";
    
    switch (status) {
      case "placed":
        return <Package className={`h-5 w-5 ${iconClass}`} />;
      case "accepted":
        return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
      case "shipped":
        return <Truck className={`h-5 w-5 ${iconClass}`} />;
      case "delivered":
        return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "placed":
        return <Badge variant="secondary">Order Placed</Badge>;
      case "accepted":
        return <Badge variant="secondary">Accepted</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      default:
        return <Badge variant="secondary">Processing</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
              <p className="text-muted-foreground">Order #{order.id}</p>
            </div>
            {getStatusBadge(order.status)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tracking Number</p>
              <p className="font-medium">{order.trackingNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.tracking.map((event, index) => (
                    <div key={event.status} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`rounded-full p-2 ${
                          event.completed ? 'bg-green-100' : 'bg-muted'
                        }`}>
                          {getStatusIcon(event.status, event.completed)}
                        </div>
                        {index < order.tracking.length - 1 && (
                          <div className={`w-px h-8 mt-2 ${
                            event.completed ? 'bg-green-200' : 'bg-border'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${
                            event.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {event.title}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">
                          <Link to={`/products/${item.id}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {item.seller}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(order.total - (order.total * 0.08)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(order.total * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
              
              {order.status === "delivered" && (
                <Button variant="outline" className="w-full">
                  Return Order
                </Button>
              )}
              
              <Button asChild className="w-full">
                <Link to="/profile">
                  View All Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage;