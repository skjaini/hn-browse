import { Newspaper } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Newspaper className="w-12 h-12 text-blue-400" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">
        Hacker News Highlights
      </h1>
      <p className="text-slate-400">
        Visual preview of today's top stories
      </p>
    </div>
  );
}