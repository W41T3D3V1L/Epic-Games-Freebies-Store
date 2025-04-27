
'use client'; // Add 'use client' for useState and event handling

import type { GameOffer } from '@/services/epic-games';
import { getFreeGames } from '@/services/epic-games';
import { GameList } from '@/components/game-list';
import { Input } from '@/components/ui/input';
import { useEffect, useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

// Define types for state
type GameData = {
  currentGames: GameOffer[];
  nextGames: GameOffer[];
};

export default function Home() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getFreeGames();
        setGameData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch game data:', err);
        setError('Failed to load game data. Please try again later.');
        setGameData({ currentGames: [], nextGames: [] }); // Set empty data on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Fetch data on component mount

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Memoize filtered games to avoid re-computation on every render
  const filteredCurrentGames = useMemo(() => {
    if (!gameData) return [];
    if (!searchTerm) return gameData.currentGames;
    return gameData.currentGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gameData, searchTerm]);

  const filteredNextGames = useMemo(() => {
    if (!gameData) return [];
    if (!searchTerm) return gameData.nextGames;
    return gameData.nextGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gameData, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-foreground">
        Daily Epic Games Freebies
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Discover the latest free games and upcoming offers from the Epic Games Store.
      </p>

      <div className="mb-8 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search free games by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
          aria-label="Search free games"
        />
      </div>

      {loading && (
        <>
          <Skeleton className="h-8 w-1/4 mb-6" /> {/* Skeleton for title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
             {/* Skeleton cards */}
            {[...Array(4)].map((_, i) => (
               <div key={`current-skeleton-${i}`} className="flex flex-col space-y-3">
                 <Skeleton className="h-[192px] w-full rounded-xl" />
                 <div className="space-y-2">
                   <Skeleton className="h-4 w-[250px]" />
                   <Skeleton className="h-4 w-[200px]" />
                 </div>
                  <Skeleton className="h-4 w-[100px] mt-auto" />
               </div>
             ))}
          </div>
           <Skeleton className="h-8 w-1/4 mb-6" /> {/* Skeleton for title */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Skeleton cards */}
             {[...Array(4)].map((_, i) => (
                <div key={`next-skeleton-${i}`} className="flex flex-col space-y-3">
                  <Skeleton className="h-[192px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                   <Skeleton className="h-4 w-[100px] mt-auto" />
                </div>
              ))}
           </div>
        </>
      )}

      {error && <p className="text-center text-destructive">{error}</p>}

      {!loading && !error && gameData && (
        <>
          <GameList games={filteredCurrentGames} title="Currently Free" type="current" />
          <GameList games={filteredNextGames} title="Coming Soon" type="upcoming" />

          {/* Show message if search yields no results */}
          {searchTerm && filteredCurrentGames.length === 0 && filteredNextGames.length === 0 && (
             <p className="text-center text-muted-foreground mt-8">
                No games found matching "{searchTerm}".
             </p>
           )}
        </>
      )}
    </div>
  );
}
