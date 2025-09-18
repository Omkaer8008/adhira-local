import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  seller: string;
  category: string;
  isWishlisted?: boolean;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  seller,
  category,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) => {
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="card-product group">
      <div className="relative">
        <Link to={`/products/${id}`}>
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            {discountPercentage}% OFF
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
            isWishlisted ? "text-accent" : "text-muted-foreground"
          }`}
          onClick={onToggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="pt-4 space-y-2">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
        
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating) 
                    ? "text-yellow-400 fill-current" 
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        <p className="text-sm text-muted-foreground">by {seller}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={onAddToCart}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white font-medium py-2 rounded-xl transition-all duration-300 hover:shadow-glow"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;