import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
  ...props
}) => {
  const getUnsplashUrl = (url: string, width: number) => {
    if (!url || !url.includes('images.unsplash.com')) return url;
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', '75');
      urlObj.searchParams.set('fm', 'webp');
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    } catch {
      return url;
    }
  };

  const generateSrcSet = (url: string) => {
    if (!url || !url.includes('images.unsplash.com')) return undefined;
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    return widths
      .map(w => `${getUnsplashUrl(url, w)} ${w}w`)
      .join(', ');
  };

  const srcSet = generateSrcSet(src);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={cn("transition-opacity duration-300", className)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      {...props}
    />
  );
};

export default OptimizedImage;