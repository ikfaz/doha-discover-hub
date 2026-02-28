import React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LastUpdatedProps {
  date: string;
  className?: string;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-all hover:bg-white/20",
        "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400", // Default style
        className
      )}
    >
      <RefreshCw className="w-3.5 h-3.5" />
      <span className="uppercase tracking-wider opacity-80 text-[10px]">Last Updated</span>
      <span className="font-bold">{date}</span>
    </div>
  );
};

export default LastUpdated;