import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: { title: string; id: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-qatar-maroon">
      <h3 className="text-lg font-bold mb-4 text-qatar-maroon">Table of Contents</h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block text-sm transition-all duration-200 py-2 px-3 rounded-md font-medium",
              activeId === item.id
                ? "text-qatar-maroon bg-qatar-maroon/10 translate-x-2 font-bold"
                : "text-gray-600 hover:text-qatar-maroon hover:bg-gray-100 hover:translate-x-1"
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(item.id);
            }}
          >
            {activeId === item.id ? '● ' : '→ '} {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;