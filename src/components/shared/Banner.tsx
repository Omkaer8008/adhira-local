import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

const Banner = ({
  title,
  subtitle,
  description,
  imageUrl,
  ctaText = "Shop Now",
  ctaLink = "/products",
  className = "",
  variant = "primary",
}: BannerProps) => {
  const variantClasses = {
    primary: "gradient-hero text-white",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-medium ${variantClasses[variant]} ${className}`}>
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-2xl">
          {subtitle && (
            <p className="text-sm font-medium mb-2 opacity-90">
              {subtitle}
            </p>
          )}
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-up">
            {title}
          </h2>
          
          {description && (
            <p className="text-lg mb-6 opacity-90 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {description}
            </p>
          )}
          
          <Button
            asChild
            size="lg"
            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-primary shadow-lg animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <a href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;