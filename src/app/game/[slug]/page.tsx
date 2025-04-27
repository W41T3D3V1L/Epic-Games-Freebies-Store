
import type { GameOffer } from '@/services/epic-games';
import { getFreeGames } from '@/services/epic-games';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { summarizeGame } from '@/ai/flows/summarize-game-flow'; // Import the AI flow
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert component
import { Terminal } from "lucide-react"; // Import Terminal icon for Alert

// Function to find a game by slug or ID across both current and next games
async function findGameBySlug(slug: string): Promise<GameOffer | null> {
  try {
    const { currentGames, nextGames } = await getFreeGames();
    const allGames = [...currentGames, ...nextGames];

    // Function to check slug candidates
    const checkSlug = (game: GameOffer, slugToCheck: string): boolean => {
      const offerSlug = game.offerMappings?.[0]?.pageSlug;
      const catalogSlug = game.catalogNs?.mappings?.[0]?.pageSlug;
      return (offerSlug === slugToCheck || catalogSlug === slugToCheck || game.id === slugToCheck);
    };

    const game = allGames.find(g => checkSlug(g, slug));
    return game || null; // Return game or null if not found
  } catch (error) {
    console.error('Error fetching or finding game:', error);
    return null; // Return null on error
  }
}

// Helper to get a specific image URL by type, with fallback
function getImageUrlByType(game: GameOffer, type: string, fallbackType: string = 'OfferImageWide'): string | null {
    const image = game.keyImages.find(img => img.type === type);
    if (image) return image.url;

    const fallbackImage = game.keyImages.find(img => img.type === fallbackType);
    return fallbackImage?.url ?? game.keyImages[0]?.url ?? null; // Fallback further if needed
}

// Function to generate the external Epic Games Store URL
function getEpicStoreUrl(game: GameOffer): string {
   const slug = game.offerMappings?.[0]?.pageSlug || game.catalogNs?.mappings?.[0]?.pageSlug || game.id;
   // Determine if it's an add-on or base game based on offerType or categories
   const isAddon = game.offerType === 'ADD_ON' || game.categories?.some(cat => cat.path.startsWith('add'));
   const productType = isAddon ? 'p' : 'p'; // Epic uses /p/ for both now it seems, adjust if needed
   return `https://store.epicgames.com/en-US/${productType}/${slug}`;
}

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = await findGameBySlug(params.slug);

  if (!game) {
    notFound(); // Show 404 if game not found
  }

  const wideImageUrl = getImageUrlByType(game, 'OfferImageWide', 'Thumbnail');
  const epicStoreUrl = getEpicStoreUrl(game);

  // --- AI Summary ---
  let aiSummary: string | null = null;
  let summaryError: string | null = null;
  try {
    aiSummary = await summarizeGame({ gameDescription: game.description });
  } catch (error) {
     console.error("AI Summary Error:", error);
     summaryError = "Could not generate AI summary at this time.";
     // Log more details for debugging if needed
     // summaryError = `Could not generate AI summary: ${error instanceof Error ? error.message : String(error)}`;
  }
  // --- End AI Summary ---


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        {wideImageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={wideImageUrl}
              alt={`${game.title} banner`}
              fill // Use fill to cover the container
              sizes="100vw" // Takes full viewport width initially
              className="object-cover" // Use Tailwind for object-fit
              priority // Prioritize loading the main image (LCP)
            />
          </div>
        )}
        <CardHeader className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
             <div>
                <CardTitle className="text-3xl font-bold mb-2">{game.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mb-4">{game.seller.name}</CardDescription>
             </div>
            <Button asChild>
                <a href={epicStoreUrl} target="_blank" rel="noopener noreferrer">
                    View on Epic Store <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </Button>
          </div>
           <div className="flex flex-wrap gap-2 mt-2">
               {game.offerType === 'BASE_GAME' && <Badge variant="secondary">Base Game</Badge>}
               {game.offerType === 'ADD_ON' && <Badge variant="secondary">Add-On</Badge>}
               {game.categories?.map(cat => (
                 <Badge key={cat.path} variant="outline">{cat.path.split('/').pop()}</Badge> // Show last part of category path
               ))}
           </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
             <h3 className="text-xl font-semibold mb-2 text-foreground">Description</h3>
             <p className="text-base text-muted-foreground whitespace-pre-line">{game.description}</p>
          </div>

           {/* AI Summary Section */}
           {aiSummary && (
             <div className="p-4 rounded-md border bg-card">
               <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-primary">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                 </svg>
                 AI Summary
               </h3>
               <p className="text-base text-muted-foreground">{aiSummary}</p>
             </div>
           )}
            {/* Display AI Summary Error */}
           {summaryError && (
              <Alert variant="destructive">
                 <Terminal className="h-4 w-4" />
                 <AlertTitle>AI Summary Error</AlertTitle>
                 <AlertDescription>
                   {summaryError}
                 </AlertDescription>
              </Alert>
           )}
           {/* End AI Summary Section */}


           {game.keyImages.length > 1 && (
             <div>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Screenshots</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {game.keyImages
                   .filter(img => img.type !== 'OfferImageWide' && img.type !== 'OfferImageTall' && img.type !== 'Thumbnail' && img.type !== 'heroCarouselVideo' && !img.type.toLowerCase().includes('avatar')) // Filter out common banner/thumb types and video
                   .slice(0, 8) // Limit screenshots
                   .map((img) => (
                     <a key={img.url} href={img.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md aspect-video relative group">
                       <Image
                         src={img.url}
                         alt={`${game.title} screenshot`}
                         fill // Use fill to cover the container
                         sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Sizes based on grid layout
                         className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Keep transform, add object-cover
                       />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-colors flex items-center justify-center">
                            <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                     </a>
                   ))}
               </div>
             </div>
           )}

        </CardContent>
      </Card>
    </div>
  );
}

// Optional: Generate static paths if you know the slugs beforehand (might not be feasible with dynamic API data)
// export async function generateStaticParams() {
//   const { currentGames, nextGames } = await getFreeGames();
//   const allGames = [...currentGames, ...nextGames];
//   return allGames.map((game) => ({
//      slug: game.offerMappings?.[0]?.pageSlug || game.catalogNs?.mappings?.[0]?.pageSlug || game.id,
//   }));
// }
