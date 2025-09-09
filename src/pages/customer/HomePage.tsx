import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck, Star } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Banner from "@/components/shared/Banner";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-marketplace.jpg";
import productJewelry from "@/assets/product-jewelry.jpg";
import productSoap from "@/assets/product-soap.jpg";
import productHandbag from "@/assets/product-handbag.jpg";

const HomePage = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set());

  // Mock data
  const categories = [
    { name: "Fashion", icon: "👗", link: "/products?category=fashion" },
    { name: "Beauty", icon: "💄", link: "/products?category=beauty" },
    { name: "Jewelry", icon: "💍", link: "/products?category=jewelry" },
    { name: "Home Decor", icon: "🏠", link: "/products?category=home" },
    { name: "Electronics", icon: "📱", link: "/products?category=electronics" },
    { name: "Books", icon: "📚", link: "/products?category=books" },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Handmade Silver Necklace",
      price: 89.99,
      originalPrice: 129.99,
      image: productJewelry,
      rating: 4.8,
      reviewCount: 124,
      seller: "ArtisanCrafts",
      category: "Jewelry",
    },
    {
      id: "2",
      name: "Organic Artisan Soap Set",
      price: 24.99,
      originalPrice: 34.99,
      image: productSoap,
      rating: 4.9,
      reviewCount: 89,
      seller: "NaturalSoaps Co",
      category: "Beauty",
    },
    {
      id: "3",
      name: "Premium Leather Handbag",
      price: 156.99,
      originalPrice: 199.99,
      image: productHandbag,
      rating: 4.7,
      reviewCount: 67,
      seller: "LeatherWorks",
      category: "Fashion",
    },
  ];

  const topSellers = [
    { name: "ArtisanCrafts", rating: 4.9, products: 45, badge: "Top Rated" },
    { name: "NaturalSoaps Co", rating: 4.8, products: 32, badge: "Eco Friendly" },
    { name: "LeatherWorks", rating: 4.7, products: 28, badge: "Premium" },
    { name: "TechGuru Store", rating: 4.6, products: 67, badge: "Fast Shipping" },
  ];

  const handleToggleWishlist = (productId: string) => {
    const newWishlisted = new Set(wishlistedProducts);
    if (newWishlisted.has(productId)) {
      newWishlisted.delete(productId);
    } else {
      newWishlisted.add(productId);
    }
    setWishlistedProducts(newWishlisted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Banner
            title="Discover Local Treasures"
            subtitle="Welcome to Adhira"
            description="Connect with local sellers and find unique products in your community"
            imageUrl={heroImage}
            ctaText="Start Shopping"
            ctaLink="/products"
            className="min-h-[400px] md:min-h-[500px]"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="text-muted-foreground">Quick product discovery with our smart search and filters</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground">Your payments and data are protected with bank-level security</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
              <p className="text-muted-foreground">Support local businesses with fast, eco-friendly delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our diverse range of local products</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites from our local sellers</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isWishlisted={wishlistedProducts.has(product.id)}
                onToggleWishlist={() => handleToggleWishlist(product.id)}
                onAddToCart={() => console.log(`Added ${product.name} to cart`)}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Top Sellers</h2>
            <p className="text-muted-foreground">Meet our most trusted community sellers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellers.map((seller) => (
              <div key={seller.name} className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-medium">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {seller.name.charAt(0)}
                    </span>
                  </div>
                  <Badge variant="secondary">{seller.badge}</Badge>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2">{seller.name}</h3>
                
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{seller.rating}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">{seller.products} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;