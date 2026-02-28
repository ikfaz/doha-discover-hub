
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnailUrl: string; // Add thumbnail URL
}

// Sample data to use when API is not available
const mockVideos: YouTubeVideo[] = [
  {
    videoId: 'NJaD4HZOGG0',
    title: 'The Real Qatar Beyond The Headlines',
    description: 'Experience the authentic side of Qatar, going beyond the skyscrapers to discover the rich culture and traditions.',
    date: 'May 1, 2025',
    category: 'attractions',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  },
  {
    videoId: 'NJaD4HZOGG1',
    title: 'Exploring Doha\'s Cultural Districts',
    description: 'Join us as we explore the rich cultural heritage and modern attractions in Doha\'s most vibrant neighborhoods.',
    date: 'April 15, 2025',
    category: 'attractions',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  },
  {
    videoId: 'NJaD4HZOGG2',
    title: 'Best Street Food in Doha',
    description: 'Discover the most delicious street food options in Qatar\'s capital city.',
    date: 'April 10, 2025',
    category: 'food',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  },
  {
    videoId: 'NJaD4HZOGG3',
    title: 'Qatar Cultural Festival 2025',
    description: 'Highlights from the annual cultural festival showcasing Qatar\'s rich traditions.',
    date: 'April 5, 2025',
    category: 'events',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  },
  {
    videoId: 'NJaD4HZOGG4',
    title: 'Living in Doha: An Expat\'s Guide',
    description: 'Essential tips for expatriates living in or moving to Doha, Qatar.',
    date: 'March 25, 2025',
    category: 'expat-tips',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  },
  {
    videoId: 'NJaD4HZOGG5',
    title: 'Luxury Shopping in Doha',
    description: 'Tour the most exclusive shopping destinations in Qatar\'s cosmopolitan capital.',
    date: 'March 15, 2025',
    category: 'lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/NJaD4HZOGG0/hqdefault.jpg'
  }
];

// Function to fetch videos from YouTube API
const fetchYouTubeVideos = async (): Promise<YouTubeVideo[]> => {
  const apiKey = localStorage.getItem('youtube_api_key');
  const channelId = 'UC-wTo4Yzj8H4KHid3QoFWGA';
  
  if (!apiKey) {
    console.log('No YouTube API key found, using mock data');
    return mockVideos;
  }
  
  try {
    // First, get the channel uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data');
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }
    
    // Then, get the videos from that playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=24&playlistId=${uploadsPlaylistId}&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const videosData = await videosResponse.json();
    
    // Map the YouTube API response to our video format
    return videosData.items.map((item: any) => {
      // Assign a category based on video title or description
      let category = 'attractions'; // Default category
      const title = item.snippet.title.toLowerCase();
      const description = item.snippet.description.toLowerCase();
      
      if (title.includes('food') || description.includes('food') || 
          title.includes('restaurant') || description.includes('restaurant') ||
          title.includes('dining') || description.includes('dining')) {
        category = 'food';
      } else if (title.includes('event') || description.includes('event') || 
                title.includes('festival') || description.includes('festival')) {
        category = 'events';
      } else if (title.includes('expat') || description.includes('expat') || 
                title.includes('living in') || description.includes('living in')) {
        category = 'expat-tips';
      } else if (title.includes('luxury') || description.includes('luxury') || 
                title.includes('shopping') || description.includes('shopping') ||
                title.includes('lifestyle') || description.includes('lifestyle')) {
        category = 'lifestyle';
      }
      
      return {
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description.substring(0, 120) + (item.snippet.description.length > 120 ? '...' : ''),
        date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        category: category,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return mockVideos; // Fall back to mock data if the API call fails
  }
};

export const useYoutubeVideos = () => {
  return useQuery({
    queryKey: ['youtubeVideos'],
    queryFn: fetchYouTubeVideos,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false
  });
};
