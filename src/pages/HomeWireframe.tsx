import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

const HomeWireframe = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Lato'] text-slate-800">
      <NavBar />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center bg-[#8A1538] text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/50 bg-[#C5A059]/10 text-[#C5A059] text-sm font-medium tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>The Ultimate Qatar Travel Guide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-bold mb-8 leading-[1.1]">
              Discover the <br />
              <span className="text-[#C5A059]">Jewel of Arabia</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed font-light">
              Immerse yourself in the rich heritage, modern luxury, and vibrant culture of Doha. Your curated guide to Qatar's finest attractions, dining, and culture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08d4b] text-white font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-sm transition-all duration-300 backdrop-blur-sm">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending in Doha Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#C5A059] font-bold uppercase tracking-widest text-sm mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Popular Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#8A1538] mb-6">
                Trending in Doha
              </h2>
              <p className="text-gray-600 text-lg">
                Curated experiences and essential guides that are capturing the attention of travelers this season.
              </p>
            </div>
            
            <button className="group flex items-center gap-2 text-[#8A1538] font-semibold hover:text-[#C5A059] transition-colors pb-1 border-b-2 border-[#8A1538]/10 hover:border-[#C5A059]">
              View All Articles <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {/* Wireframe Card Items */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article key={i} className="group flex flex-col h-full cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-gray-100 shadow-sm">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gray-200 animate-pulse group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                  <div className="absolute top-4 left-4 bg-[#FFFFFF] text-[#8A1538] text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-md">
                    Category
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 font-medium">
                    <span className="text-[#C5A059]">May 20, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>5 min read</span>
                  </div>
                  
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#8A1538] group-hover:text-[#C5A059] transition-colors mb-3 leading-tight">
                    The Ultimate Guide to Luxury Living in Doha: A Wireframe Title
                  </h3>
                  
                  <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                    This is a placeholder description for the wireframe. It represents the excerpt of the article that will be displayed here.
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[#8A1538] font-bold text-sm uppercase tracking-wide group-hover:text-[#C5A059] transition-colors">
                      Read Story
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8A1538] -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeWireframe;