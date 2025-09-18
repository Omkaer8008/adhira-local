import { useState } from "react";
import { Filter, Grid, List, Search, ChevronDown } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import productJewelry from "@/assets/product-jewelry.jpg";
import productSoap from "@/assets/product-soap.jpg";
import productHandbag from "@/assets/product-handbag.jpg";

const ProductListPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set());

  // Mock data
  const products = [
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
    },
    // Duplicate for demonstration
    {
      id: "4",
      name: "Handcrafted Ceramic Vase",
      price: 45.99,
      image: productJewelry,
      rating: 4.6,
      reviewCount: 32,
      seller: "PotteryStudio",
      category: "Home Decor",
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
    },
    {
      id: "6",
      name: "Vintage Style Crossbody Bag",
      price: 78.99,
      image: productHandbag,
      rating: 4.4,
      reviewCount: 43,
      seller: "VintageStyle",
      category: "Fashion",
    },
  ];

  const categories = ["Fashion", "Beauty", "Jewelry", "Home Decor", "Electronics", "Books"];
  const brands = ["ArtisanCrafts", "NaturalSoaps Co", "LeatherWorks", "PotteryStudio", "EcoCandles"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const newWishlisted = new Set(wishlistedProducts);
    if (newWishlisted.has(productId)) {
      newWishlisted.delete(productId);
    } else {
      newWishlisted.add(productId);
    }
    setWishlistedProducts(newWishlisted);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}+ stars
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">Discover amazing products from local sellers</p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm">
                    Clear All
                  </Button>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="px-3 py-1">
                      {category}
                      <button
                        onClick={() => handleCategoryChange(category, false)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="px-3 py-1">
                      {brand}
                      <button
                        onClick={() => handleBrandChange(brand, false)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {products.length} results
              </p>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isWishlisted={wishlistedProducts.has(product.id)}
                  onToggleWishlist={() => handleToggleWishlist(product.id)}
                  onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="sm"
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListPage;