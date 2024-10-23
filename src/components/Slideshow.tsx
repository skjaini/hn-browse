import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react';
import type { Story } from '../types';

interface SlideshowProps {
  stories: Story[];
  isLoading: boolean;
}

export function Slideshow({ stories, isLoading }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (stories.length > 0) {
        setCurrentIndex((current) => (current + 1) % stories.length);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [stories.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => 
      current === 0 ? stories.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) => 
      current === stories.length - 1 ? 0 : current + 1
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="aspect-[16/9] relative">
          {currentStory.screenshot ? (
            <img
              src={currentStory.screenshot}
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900">
              <Newspaper className="w-20 h-20 text-slate-700" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white mb-4 line-clamp-2">
              {currentStory.title}
            </h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-300">
                <span className="font-medium">By {currentStory.by}</span>
                <span>•</span>
                <span>{new Date(currentStory.time * 1000).toLocaleDateString()}</span>
                <span>•</span>
                <span>{currentStory.score} points</span>
              </div>
              
              <a
                href={currentStory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Read Article <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/50">
          <div className="flex space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-6' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-slate-300" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}