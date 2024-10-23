import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Story } from '../types';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data: storyIds } = await axios.get(
          'https://hacker-news.firebaseio.com/v0/topstories.json'
        );

        const storyPromises = storyIds.slice(0, 5).map((id: number) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );

        const storyResponses = await Promise.all(storyPromises);
        const storyDetails = storyResponses.map(response => response.data);
        
        const storiesWithScreenshots = await Promise.all(
          storyDetails.map(async (story) => {
            if (!story.url) return story;
            
            try {
              const { data } = await axios.get(
                `https://api.microlink.io/?url=${encodeURIComponent(story.url)}&screenshot=true&meta=false`
              );
              
              return {
                ...story,
                screenshot: data.data.screenshot?.url
              };
            } catch (error) {
              return story;
            }
          })
        );
        
        setStories(storiesWithScreenshots);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, isLoading };
}