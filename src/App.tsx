import { Header } from './components/Header';
import { Slideshow } from './components/Slideshow';
import { useStories } from './hooks/useStories';

export function App() {
  const { stories, isLoading } = useStories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <Slideshow stories={stories} isLoading={isLoading} />
      </div>
    </div>
  );
}