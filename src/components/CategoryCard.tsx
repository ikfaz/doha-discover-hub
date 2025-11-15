import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon: Icon, image, link }) => {
  return (
    <Link to={link} className="group">
      <div className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <Icon className="w-10 h-10 text-secondary mb-3" />
          <h3 className="font-heading font-bold text-2xl text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
