
import { useQuery } from '@tanstack/react-query';

const YOUTUBE_API_KEY = 'YOUR_API_KEY'; // This will be replaced by user input for now
const CHANNEL_ID = 'UC-wTo4Yzj8H4KHid3QoFWGA';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  category: string;
  date: string;
}

async function fetchYoutubeVideos(): Promise<YouTubeVideo[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  const data = await response.json();
  
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    videoId: item.id.videoId,
    category: 'all', // You might want to use YouTube categories or video tags here
    date: new Date(item.snippet.publishedAt).toLocaleDateString(),
  }));
}

export function useYoutubeVideos() {
  return useQuery({
    queryKey: ['youtube-videos'],
    queryFn: fetchYoutubeVideos,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}
