
import type { GameOffer } from '@/services/epic-games';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for internal navigation
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

interface GameCardProps {
  game: GameOffer;
  type: 'current' | 'upcoming';
}

function getThumbnailUrl(game: GameOffer): string {
  const preferredTypes = ['OfferImageWide', 'Thumbnail', 'OfferImageTall'];
  for (const type of preferredTypes) {
    const image = game.keyImages.find((img) => img.type === type);
    if (image) {
      return image.url;
    }
  }
  // Fallback if no preferred image type is found
  return game.keyImages[0]?.url ?? 'https://picsum.photos/400/225'; // Placeholder
}

function getFormattedDateInfo(game: GameOffer, type: 'current' | 'upcoming'): string | null {
 try {
    if (type === 'current' && game.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0]?.endDate) {
      const endDate = parseISO(game.promotions.promotionalOffers[0].promotionalOffers[0].endDate);
      // Ensure endDate is valid before formatting
      if (!isNaN(endDate.getTime())) {
         return `Ends ${formatDistanceToNowStrict(endDate, { addSuffix: true })}`;
      }
    } else if (type === 'upcoming' && game.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0]?.startDate) {
       const startDate = parseISO(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate);
       // Ensure startDate is valid before formatting
       if (!isNaN(startDate.getTime())) {
         return `Starts ${formatDistanceToNowStrict(startDate, { addSuffix: true })}`;
       }
    }
    // Fallback for upcoming using effectiveDate if promotion data is missing/invalid
    else if (type === 'upcoming' && game.effectiveDate) {
        const effectiveDateParsed = parseISO(game.effectiveDate);
        if (!isNaN(effectiveDateParsed.getTime())) {
          return `Starts ${formatDistanceToNowStrict(effectiveDateParsed, { addSuffix: true })}`;
        }
    }
    return null;
 } catch (error) {
    console.error("Error parsing or formatting date:", error, game);
    return "Date info unavailable";
 }
}

// Function to determine the best slug for the URL
function getGameSlug(game: GameOffer): string {
    // Prefer urlSlug from offerMappings if available and seems valid
    const offerSlug = game.offerMappings?.[0]?.pageSlug;
    if (offerSlug && !offerSlug.includes("undefined")) {
        return offerSlug;
    }
    // Fallback to catalogNs mapping slug
    const catalogSlug = game.catalogNs?.mappings?.[0]?.pageSlug;
    if (catalogSlug && !catalogSlug.includes("undefined")) {
        return catalogSlug;
    }
    // Fallback to the game's unique ID as a last resort
    return game.id;
}


export function GameCard({ game, type }: GameCardProps) {
  const thumbnailUrl = getThumbnailUrl(game);
  const dateInfo = getFormattedDateInfo(game, type);
  const gameSlug = getGameSlug(game); // Use the helper function
  const gameUrl = `/game/${encodeURIComponent(gameSlug)}`; // Link to internal details page

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card text-card-foreground group">
      <Link href={gameUrl} passHref legacyBehavior>
        <a aria-label={`View details for ${game.title}`}>
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={`${game.title} thumbnail`}
              fill // Use fill to cover the container
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" // Sizes based on grid layout
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Add object-cover class
              // Priority might be added conditionally if the first few cards are LCP candidates
            />
          </div>
        </a>
      </Link>
      <CardHeader className="p-4 flex-grow">
         <Link href={gameUrl} passHref legacyBehavior>
           <a className="hover:text-primary transition-colors">
             <CardTitle className="text-lg font-semibold leading-tight truncate">{game.title}</CardTitle>
           </a>
         </Link>
        <CardDescription className="text-sm line-clamp-3 mt-1 text-muted-foreground">
          {game.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
         {type === 'current' && (
           <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
             Free Now
           </Badge>
         )}
         {type === 'upcoming' && (
           <Badge variant="secondary">Coming Soon</Badge>
         )}
         {dateInfo && (
           <div className="flex items-center gap-1">
             <Clock className="h-3 w-3" />
             <span>{dateInfo}</span>
           </div>
         )}
      </CardFooter>
    </Card>
  );
}
