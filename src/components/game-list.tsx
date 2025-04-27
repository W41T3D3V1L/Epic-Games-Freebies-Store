import type { GameOffer } from '@/services/epic-games';
import { GameCard } from './game-card';

interface GameListProps {
  games: GameOffer[];
  title: string;
  type: 'current' | 'upcoming';
}

export function GameList({ games, title, type }: GameListProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-foreground">{title}</h2>
      {games.length === 0 ? (
        <p className="text-muted-foreground">No games to display currently.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} type={type} />
          ))}
        </div>
      )}
    </section>
  );
}
