
import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  slug,
}) => {
  const categoryColors: Record<string, string> = {
    attractions: 'bg-blue-100 text-blue-800',
    food: 'bg-green-100 text-green-800',
    culture: 'bg-purple-100 text-purple-800',
    events: 'bg-yellow-100 text-yellow-800',
    'expat-tips': 'bg-red-100 text-red-800',
  };

  const categoryClass = categoryColors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  
  // Fallback image in case the provided URL fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2670&auto=format&fit=crop";
  
  const [imgSrc, setImgSrc] = React.useState(imageUrl);
  const [isLoading, setIsLoading] = React.useState(true);

  // Handle image load error
  const handleImageError = () => {
    console.log(`Failed to load image: ${imageUrl}, using fallback`);
    setImgSrc(fallbackImage);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full card-hover">
      <Link to={`/blog/${slug}`}>
        <div className="relative w-full h-48 bg-gray-200">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-qatar-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isLoading ? 0 : 1 }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`${categoryClass} hover:${categoryClass}`}>
            {category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </div>
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-bold mb-2 text-qatar-maroon hover:text-qatar-gold transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <Link
          to={`/blog/${slug}`}
          className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
        >
          Read More
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
