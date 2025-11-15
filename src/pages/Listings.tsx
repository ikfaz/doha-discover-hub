import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import { listings } from '@/data/listings';
import { ListingCategory } from '@/types/listing';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  const filteredListings = listings
    .filter(listing => selectedCategory === 'all' || listing.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="content-container">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Discover Doha
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Explore our curated collection of hotels, restaurants, activities, and attractions in Qatar's vibrant capital.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-background border-b">
          <div className="content-container py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ListingCategory | 'all')} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="hotel">Hotels</TabsTrigger>
                  <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
                  <TabsTrigger value="activity">Activities</TabsTrigger>
                  <TabsTrigger value="attraction">Attractions</TabsTrigger>
                  <TabsTrigger value="neighborhood">Neighborhoods</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'}
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No listings found in this category.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
