
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
  const categoryColors: Record<string, { base: string; hover: string }> = {
    attractions: { base: 'bg-blue-100 text-blue-800', hover: 'hover:bg-blue-200' },
    food: { base: 'bg-green-100 text-green-800', hover: 'hover:bg-green-200' },
    culture: { base: 'bg-purple-100 text-purple-800', hover: 'hover:bg-purple-200' },
    events: { base: 'bg-yellow-100 text-yellow-800', hover: 'hover:bg-yellow-200' },
    'expat-tips': { base: 'bg-red-100 text-red-800', hover: 'hover:bg-red-200' },
    travel: { base: 'bg-indigo-100 text-indigo-800', hover: 'hover:bg-indigo-200' },
    lifestyle: { base: 'bg-pink-100 text-pink-800', hover: 'hover:bg-pink-200' },
    finance: { base: 'bg-emerald-100 text-emerald-800', hover: 'hover:bg-emerald-200' },
  };

  const colors = categoryColors[category.toLowerCase()] || { base: 'bg-gray-100 text-gray-800', hover: 'hover:bg-gray-200' };
  const fallbackImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop";
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const articleHref = `/blog/${slug}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full card-hover">
      <Link to={`/blog/${slug}`}>
        <div className="relative w-full h-48 bg-gray-200">
          <img
            src={imgSrc}
            alt={`${title} - ${category} guide image`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width={800}
            height={384}
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`${colors.base} ${colors.hover}`}>
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
          to={articleHref}
          aria-label={`Read article: ${title}`}
          className="text-qatar-maroon font-medium hover:text-qatar-gold transition-colors inline-flex items-center"
        >
          Read article: {title}
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
