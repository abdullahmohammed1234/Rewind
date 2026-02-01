import { EmbedType } from '@/types';

// Re-export all embed components
export { EmbedWrapper } from './embed-wrapper';
export { YouTubeEmbed, extractYouTubeVideoId } from './youtube-embed';
export { SpotifyEmbed, SpotifyAlbumEmbed, extractSpotifyTrackId } from './spotify-embed';
export { TwitterEmbed, TwitterProfileEmbed, extractTweetId } from './twitter-embed';
export { WikipediaEmbed, WikipediaCard, extractWikipediaSlug } from './wikipedia-embed';

// Unified embed component that handles all types
export { UnifiedEmbed } from './unified-embed';

export interface UnifiedEmbedProps {
  type: EmbedType;
  id: string;
  title?: string;
  compact?: boolean;
}
