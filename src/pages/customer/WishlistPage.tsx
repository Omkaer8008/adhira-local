import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import productJewelry from "@/assets/product-jewelry.jpg";
import productSoap from "@/assets/product-soap.jpg";
import productHandbag from "@/assets/product-handbag.jpg";

const WishlistPage = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Handmade Silver Necklace with Gemstones",
      price: 89.99,
      originalPrice: 129.99,
      image: productJewelry,
      rating: 4.8,
      reviewCount: 124,
      seller: "ArtisanCrafts",
      category: "Jewelry",
      addedDate: "2024-01-15",
      inStock: true,
    },
    {
      id: "2",
      name: "Organic Artisan Soap Set - Lavender & Rose",
      price: 24.99,
      originalPrice: 34.99,
      image: productSoap,
      rating: 4.9,
      reviewCount: 89,
      seller: "NaturalSoaps Co",
      category: "Beauty",
      addedDate: "2024-01-12",
      inStock: true,
    },
    {
      id: "3",
      name: "Premium Italian Leather Handbag",
      price: 156.99,
      originalPrice: 199.99,
      image: productHandbag,
      rating: 4.7,
      reviewCount: 67,
      seller: "LeatherWorks",
      category: "Fashion",
      addedDate: "2024-01-10",
      inStock: false,
    },
    {
      id: "4",
      name: "Handcrafted Ceramic Vase",
      price: 45.99,
      image: productJewelry,
      rating: 4.6,
      reviewCount: 32,
      seller: "PotteryStudio",
      category: "Home Decor",
      addedDate: "2024-01-08",
      inStock: true,
    },
    {
      id: "5",
      name: "Natural Beeswax Candles Set",
      price: 18.99,
      originalPrice: 24.99,
      image: productSoap,
      rating: 4.5,
      reviewCount: 56,
      seller: "EcoCandles",
      category: "Home Decor",
      addedDate: "2024-01-05",
      inStock: true,
    },
  ]);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const moveToCart = (productId: string) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      console.log(`Moving ${item.name} to cart`);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    console.log(`Moving ${inStockItems.length} items to cart`);
    toast({
      title: "Added to cart",
      description: `${inStockItems.length} items have been added to your cart.`,
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you love for later. Start browsing and add items to your wishlist.
            </p>
            <Button asChild className="btn-hero">
              <a href="/products">
                Start Shopping
              </a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const inStockCount = wishlistItems.filter(item => item.inStock).length;
  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} items • {inStockCount} in stock
                {totalSavings > 0 && ` • Save $${totalSavings.toFixed(2)}`}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={moveAllToCart}
                disabled={inStockCount === 0}
                className="flex items-center"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart ({inStockCount})
              </Button>
              <Button
                variant="ghost"
                onClick={clearWishlist}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Stats */}
          {totalSavings > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    You could save ${totalSavings.toFixed(2)} on these items!
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard
                {...item}
                isWishlisted={true}
                onToggleWishlist={() => removeFromWishlist(item.id)}
                onAddToCart={() => moveToCart(item.id)}
              />
              
              {/* Added Date */}
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-muted-foreground">
                Added {new Date(item.addedDate).toLocaleDateString()}
              </div>

              {/* Out of Stock Overlay */}
              {!item.inStock && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-muted-foreground mb-2">
                      Out of Stock
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove from Wishlist
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recently Viewed or Recommended */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock recommended products */}
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                key={`rec-${i}`}
                id={`rec-${i}`}
                name={`Recommended Product ${i}`}
                price={49.99}
                originalPrice={69.99}
                image={i % 2 === 0 ? productJewelry : productSoap}
                rating={4.5}
                reviewCount={45}
                seller="RecommendedSeller"
                category="Various"
                onAddToCart={() => console.log(`Added recommended product ${i} to cart`)}
                onToggleWishlist={() => console.log(`Toggled wishlist for recommended product ${i}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;