
import React, { useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
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
  const fallbackImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop";
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full card-hover">
      <Link to={`/blog/${slug}`}>
        <div className="relative w-full h-48 bg-gray-200">
          <img
            src={imgSrc}
            alt={`${title} - ${category} guide image`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgSrc(fallbackImage)}
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
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
