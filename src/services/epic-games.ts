/**
 * Represents an image associated with a game offer.
 */
export interface KeyImage {
  /**
   * The type of the image (e.g., OfferImageWide, OfferImageTall, Thumbnail).
   */
  type: string;
  /**
   * The URL of the image.
   */
  url: string;
}

/**
 * Represents a seller of a game.
 */
export interface Seller {
  /**
   * The ID of the seller.
   */
  id: string;
  /**
   * The name of the seller.
   */
  name: string;
}

/**
 * Represents currency information.
 */
export interface CurrencyInfo {
  decimals: number;
}

/**
 * Represents formatted price information.
 */
export interface FormattedPrice {
  originalPrice: string;
  discountPrice: string;
  intermediatePrice: string;
}

/**
 * Represents the total price details.
 */
export interface TotalPrice {
  discountPrice: number;
  originalPrice: number;
  voucherDiscount: number;
  discount: number;
  currencyCode: string;
  currencyInfo: CurrencyInfo;
  fmtPrice: FormattedPrice;
}

/**
 * Represents discount settings for a promotion rule.
 */
export interface DiscountSetting {
  discountType: string;
  discountPercentage?: number; // Optional as it might not always be present
}

/**
 * Represents an applied rule for a line offer.
 */
export interface AppliedRule {
  id: string;
  endDate: string;
  discountSetting: DiscountSetting;
}

/**
 * Represents a line offer within the price object.
 */
export interface LineOffer {
  appliedRules: AppliedRule[];
}


/**
 * Represents a price object.
 */
export interface Price {
  totalPrice: TotalPrice;
  lineOffers: LineOffer[];
}

/**
 * Represents an individual item within the game offer.
 */
export interface Item {
  id: string;
  namespace: string;
}

/**
 * Represents a custom attribute associated with the game offer.
 */
export interface CustomAttribute {
  key: string;
  value: string;
}

/**
 * Represents a category path for the game.
 */
export interface Category {
  path: string;
}

/**
 * Represents a tag associated with the game.
 */
export interface Tag {
  id: string;
}

/**
 * Represents a mapping in the catalog namespace.
 */
export interface CatalogNsMapping {
  pageSlug: string;
  pageType: string;
}

/**
 * Represents the catalog namespace information.
 */
export interface CatalogNs {
  mappings: CatalogNsMapping[];
}

/**
 * Represents an offer mapping.
 */
export interface OfferMapping {
  pageSlug: string;
  pageType: string;
}

/**
 * Represents a promotional offer detail.
 */
export interface PromotionalOfferDetail {
    startDate: string;
    endDate: string;
    discountSetting: DiscountSetting;
}

/**
 * Represents a promotional offer container.
 */
export interface PromotionalOffer {
    promotionalOffers: PromotionalOfferDetail[];
}

/**
 * Represents the promotions object.
 */
export interface Promotions {
    promotionalOffers: PromotionalOffer[];
    upcomingPromotionalOffers: PromotionalOffer[];
}


/**
 * Represents a game offer from the Epic Games Store.
 */
export interface GameOffer {
  /**
   * The title of the game.
   */
  title: string;
  /**
   * The ID of the game.
   */
  id: string;
  /**
   * The namespace of the game.
   */
  namespace: string;
  /**
   * A short description of the game.
   */
  description: string;
  /**
   * The effective date of the offer.
   */
  effectiveDate: string;
  /**
   * The type of the offer.
   */
  offerType: string;
  /**
   * The expiry date of the offer (may be null).
   */
  expiryDate: string | null;
  /**
   * The viewable date of the offer.
   */
  viewableDate: string;
  /**
   * The status of the offer.
   */
  status: string;
  /**
   * Indicates if the offer is code redemption only.
   */
  isCodeRedemptionOnly: boolean;
  /**
   * An array of key images associated with the game.
   */
  keyImages: KeyImage[];
  /**
   * The seller of the game.
   */
  seller: Seller;
  /**
   * The product slug of the game (may be null).
   */
  productSlug: string | null;
  /**
   * The URL slug of the game.
   */
  urlSlug: string;
  /**
   * The URL of the game (may be null).
   */
  url: string | null;
   /**
   * Array of items included in the offer.
   */
  items: Item[];
  /**
   * Array of custom attributes.
   */
  customAttributes: CustomAttribute[];
  /**
   * Array of categories the game belongs to.
   */
  categories: Category[];
  /**
   * Array of tags associated with the game.
   */
  tags: Tag[];
  /**
   * Catalog namespace information.
   */
  catalogNs: CatalogNs;
  /**
   * Array of offer mappings.
   */
  offerMappings: OfferMapping[];
  /**
   * Price information for the game.
   */
  price: Price;
  /**
   * Promotions information for the game.
   */
  promotions: Promotions;
}

/**
 * Represents the response from the Epic Games Store API.
 */
export interface EpicGamesResponse {
  /**
   * An array of current free game offers.
   */
  currentGames: GameOffer[];
  /**
   * An array of upcoming game offers.
   */
  nextGames: GameOffer[];
}

/**
 * Asynchronously retrieves free games data from the Epic Games Store API.
 *
 * @returns A promise that resolves to an EpicGamesResponse object containing current and upcoming free games.
 */
export async function getFreeGames(): Promise<EpicGamesResponse> {
  // TODO: Replace stub data with actual API call using fetch
  // const response = await fetch('YOUR_RAPIDAPI_ENDPOINT_HERE', {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Add your RapidAPI key here
  //     'X-RapidAPI-Host': 'YOUR_RAPIDAPI_HOST' // Add your RapidAPI host here
  //   }
  // });
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // const data: EpicGamesResponse = await response.json();
  // return data;


  // Using stub data for now as requested
  const stub: EpicGamesResponse = {
    currentGames: [
      {
        title: 'CHUCHEL',
        id: '70ec5e706b404d378762042f029b46ef',
        namespace: '092bbf0d7e2449c08271cae2fb791cf2',
        description: 'CHUCHEL is a comedy adventure game from the creators of Machinarium, Botanicula and Samorost. Join the hairy hero Chuchel and his rival Kekel as they will be facing numerous puzzles and challenges in their quest to retrieve the precious cherry!',
        effectiveDate: '2023-10-31T12:00:00.000Z',
        offerType: 'BASE_GAME',
        expiryDate: null, // Actual data has expiryDate inside promotions
        viewableDate: '2023-09-27T10:00:00.000Z',
        status: 'ACTIVE',
        isCodeRedemptionOnly: false,
        keyImages: [
          {
            type: 'OfferImageWide',
            url: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-17x3l.jpg',
          },
          {
            type: 'OfferImageTall',
            url: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-1731b.png',
          },
          {
            type: 'Thumbnail',
            url: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-1731b.png',
          },
        ],
        seller: {
          id: 'o-9yx3b8bxbr9g2r3z7ahpmgphp2d5kh',
          name: 'Amanita Design s.r.o.',
        },
        productSlug: null,
        urlSlug: 'chuchel-203808', // Use mapping slug
        url: null,
        items: [
          {
            id: 'ec1df3ef0b634ea3a9c8f9cdac39dd70',
            namespace: '092bbf0d7e2449c08271cae2fb791cf2',
          },
        ],
        customAttributes: [
          { key: 'autoGeneratedPrice', value: 'false' },
          { key: 'isManuallySetViewableDate', value: 'true' },
          { key: 'isPromotionalContentUsed', value: 'false' },
          { key: 'isManuallySetPCReleaseDate', value: 'true' },
          { key: 'isBlockchainUsed', value: 'false' },
        ],
        categories: [
          { path: 'freegames' },
          { path: 'games' },
          { path: 'games/edition' },
          { path: 'games/edition/base' },
        ],
        tags: [
          { id: '1298' },
          { id: '21894' },
          { id: '1370' },
          { id: '9547' },
          { id: '1117' },
          { id: '1263' },
        ],
        catalogNs: {
          mappings: [{ pageSlug: 'chuchel-203808', pageType: 'productHome' }],
        },
        offerMappings: [{ pageSlug: 'chuchel-203808', pageType: 'productHome' }],
        price: {
          totalPrice: {
            discountPrice: 0,
            originalPrice: 999,
            voucherDiscount: 0,
            discount: 999,
            currencyCode: 'USD',
            currencyInfo: { decimals: 2 },
            fmtPrice: { originalPrice: '$9.99', discountPrice: '0', intermediatePrice: '0' },
          },
          lineOffers: [
            {
              appliedRules: [
                {
                  id: '954c243db81f46ce995943823a2fcaf5',
                  endDate: '2025-05-01T15:00:00.000Z', // Use promotion end date
                  discountSetting: { discountType: 'PERCENTAGE' },
                },
              ],
            },
          ],
        },
        promotions: {
          promotionalOffers: [
            {
              promotionalOffers: [
                {
                  startDate: '2025-04-24T15:00:00.000Z',
                  endDate: '2025-05-01T15:00:00.000Z',
                  discountSetting: { discountType: 'PERCENTAGE', discountPercentage: 0 },
                },
              ],
            },
          ],
          upcomingPromotionalOffers: [],
        },
      },
      {
        title: 'Albion Online Free Welcome Gift',
        id: '3a91372e417f46eca3f5dffe4c33d961',
        namespace: '72520902fc594621b6daa5a6217b4ee7',
        description: 'Everything you need to get off to the best start, including the Knight Adventurer vanity bundle, the Mistbison mount skin, 3 days Premium, 250 Learning Points, and much more.',
        effectiveDate: '2025-04-24T15:00:00.000Z',
        offerType: 'ADD_ON',
        expiryDate: '2025-05-01T15:00:00.000Z', // Use promotion end date
        viewableDate: '2025-04-16T11:00:00.000Z',
        status: 'ACTIVE',
        isCodeRedemptionOnly: false,
        keyImages: [
          {
            type: 'OfferImageWide',
            url: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-4pxzl.png',
          },
          {
            type: 'OfferImageTall',
            url: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-1rgrs.png',
          },
          {
            type: 'Thumbnail',
            url: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-1rgrs.png',
          },
          {
            type: 'featuredMedia',
            url: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-do8tm.png',
          },
        ],
        seller: {
          id: 'o-bqgxsskl6psb955j4pwt52muzt69yz',
          name: 'Sandbox Interactive GmbH',
        },
        productSlug: null,
        urlSlug: 'albion-online-epic-launch-promo-bundle-fd0e2a', // Use offer mapping slug
        url: null,
        items: [
          {
            id: '80714d52512a4f659abbc71e780a7bea',
            namespace: '72520902fc594621b6daa5a6217b4ee7',
          },
        ],
        customAttributes: [
          { key: 'isManuallySetRefundableType', value: 'true' },
          { key: 'autoGeneratedPrice', value: 'false' },
          { key: 'isManuallySetViewableDate', value: 'true' },
          { key: 'isPromotionalContentUsed', value: 'false' },
          { key: 'isManuallySetPCReleaseDate', value: 'false' },
          { key: 'isBlockchainUsed', value: 'false' },
        ],
        categories: [
          { path: 'addons' },
          { path: 'freegames' },
          { path: 'addons/durable' },
        ],
        tags: [
          { id: '29088' }, { id: '1287' }, { id: '1367' }, { id: '19847' }, { id: '22775' },
          { id: '22776' }, { id: '9547' }, { id: '1117' }, { id: '9549' }, { id: '10719' },
        ],
        catalogNs: {
          mappings: [{ pageSlug: 'albion-online-7eb24d', pageType: 'productHome' }],
        },
        offerMappings: [
          { pageSlug: 'albion-online-epic-launch-promo-bundle-fd0e2a', pageType: 'offer' },
        ],
        price: {
          totalPrice: {
            discountPrice: 0, originalPrice: 0, voucherDiscount: 0, discount: 0, currencyCode: 'USD',
            currencyInfo: { decimals: 2 }, fmtPrice: { originalPrice: '0', discountPrice: '0', intermediatePrice: '0' },
          },
          lineOffers: [{ appliedRules: [] }],
        },
        promotions: {
          promotionalOffers: [
            {
              promotionalOffers: [
                {
                  startDate: '2025-04-24T15:00:00.000Z',
                  endDate: '2025-05-01T15:00:00.000Z',
                  discountSetting: { discountType: 'PERCENTAGE', discountPercentage: 0 },
                },
              ],
            },
          ],
          upcomingPromotionalOffers: [],
        },
      },
    ],
    nextGames: [
      {
        title: 'Super Space Club',
        id: 'f2946e78792f48a69c7c030f03e7fb42',
        namespace: '5d6924bd68114aab9e48f1ed17ce1883',
        description: 'Super Space Club is a lo-fi arcade space shooter to chill to. Defend a vibrant galaxy as a club of misfit heroes and battle endless waves of spacecrafts to the tune of atmospheric beats. Outlast your enemies and vibe to the rhythm of the stars.',
        effectiveDate: '2025-01-23T18:00:00.000Z', // Use upcoming promotion start date
        offerType: 'BASE_GAME',
        expiryDate: null, // Use upcoming promotion end date
        viewableDate: '2025-01-23T18:00:00.000Z',
        status: 'ACTIVE',
        isCodeRedemptionOnly: false,
        keyImages: [
          {
            type: 'OfferImageWide',
            url: 'https://cdn1.epicgames.com/spt-assets/d23691af8c7d42729f66d929c8609676/super-space-club-t55ij.png',
          },
          {
            type: 'OfferImageTall',
            url: 'https://cdn1.epicgames.com/spt-assets/d23691af8c7d42729f66d929c8609676/super-space-club-1tl94.png',
          },
          {
            type: 'Thumbnail',
            url: 'https://cdn1.epicgames.com/spt-assets/d23691af8c7d42729f66d929c8609676/super-space-club-1tl94.png',
          }
          // ... other images omitted for brevity
        ],
        seller: {
          id: 'o-w5juz4p54jnbqrtqfw5x65yd6p6lpx',
          name: 'GrahamOfLegend',
        },
        productSlug: null,
        urlSlug: 'super-space-club-20adbe', // Use mapping slug
        url: null,
        items: [
          {
            id: '36e7c8bc302246ea872ff8f7bcdae17c',
            namespace: '5d6924bd68114aab9e48f1ed17ce1883',
          },
        ],
        customAttributes: [
          { key: 'autoGeneratedPrice', value: 'false' },
          { key: 'isManuallySetViewableDate', value: 'true' },
          { key: 'isPromotionalContentUsed', value: 'false' },
          { key: 'isManuallySetPCReleaseDate', value: 'true' },
          { key: 'isBlockchainUsed', value: 'false' },
        ],
        categories: [
          { path: 'freegames' },
          { path: 'games' },
          { path: 'games/edition' },
          { path: 'games/edition/base' },
        ],
        tags: [
          { id: '1216' }, { id: '21894' }, { id: '1210' }, { id: '1370' },
          { id: '9547' }, { id: '9549' }, { id: '1263' },
        ],
        catalogNs: {
          mappings: [{ pageSlug: 'super-space-club-20adbe', pageType: 'productHome' }],
        },
        offerMappings: [{ pageSlug: 'super-space-club-20adbe', pageType: 'productHome' }],
        price: {
          totalPrice: {
            discountPrice: 1499, originalPrice: 1499, voucherDiscount: 0, discount: 0, currencyCode: 'USD',
            currencyInfo: { decimals: 2 }, fmtPrice: { originalPrice: '$14.99', discountPrice: '$14.99', intermediatePrice: '$14.99' },
          },
          lineOffers: [{ appliedRules: [] }],
        },
        promotions: {
          promotionalOffers: [], // This game is not currently free
          upcomingPromotionalOffers: [
            {
              promotionalOffers: [
                {
                  startDate: '2025-05-01T15:00:00.000Z',
                  endDate: '2025-05-08T15:00:00.000Z',
                  discountSetting: { discountType: 'PERCENTAGE', discountPercentage: 100 }, // Assuming 100% discount for free game
                },
              ],
            },
          ],
        },
      },
    ],
  };

  // Filter out games that might not actually be free (discount != originalPrice) in currentGames
  // Add-ons are often listed as free but require the base game. Keep them for now.
   stub.currentGames = stub.currentGames.filter(game =>
     game.price.totalPrice.discountPrice === 0 || game.offerType === 'ADD_ON'
   );

   // Filter out games that are not upcoming free games in nextGames
   stub.nextGames = stub.nextGames.filter(game =>
      game.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0]?.discountSetting?.discountPercentage === 100 ||
      // Heuristic: If price is 0 and it's in upcoming, assume it will be free
      (game.price.totalPrice.originalPrice === 0 && game.promotions?.upcomingPromotionalOffers?.length > 0)
   );


  return stub;
}