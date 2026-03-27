
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryTabsProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const GalleryTabs = ({ currentCategory, setCurrentCategory }: GalleryTabsProps) => {
  return (
    <TabsList className="w-full justify-start mb-6 bg-qatar-sand/50">
      <TabsTrigger 
        value="all" 
        onClick={() => setCurrentCategory('all')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        All Photos
      </TabsTrigger>
      <TabsTrigger 
        value="landmarks" 
        onClick={() => setCurrentCategory('landmarks')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        Landmarks
      </TabsTrigger>
      <TabsTrigger 
        value="cityscapes" 
        onClick={() => setCurrentCategory('cityscapes')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        Cityscapes
      </TabsTrigger>
      <TabsTrigger 
        value="culture" 
        onClick={() => setCurrentCategory('culture')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        Culture
      </TabsTrigger>
      <TabsTrigger 
        value="experiences" 
        onClick={() => setCurrentCategory('experiences')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        Experiences
      </TabsTrigger>
      <TabsTrigger 
        value="food" 
        onClick={() => setCurrentCategory('food')}
        className="data-[state=active]:bg-qatar-maroon data-[state=active]:text-white"
      >
        Food
      </TabsTrigger>
    </TabsList>
  );
};

export default GalleryTabs;
