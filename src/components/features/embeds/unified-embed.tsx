'use client';

import { EmbedType } from '@/types';
import { YouTubeEmbed } from './youtube-embed';
import { SpotifyEmbed, SpotifyAlbumEmbed } from './spotify-embed';
import { TwitterEmbed, TwitterProfileEmbed } from './twitter-embed';
import { WikipediaCard } from './wikipedia-embed';

interface UnifiedEmbedProps {
  type: EmbedType;
  id: string;
  title?: string;
  compact?: boolean;
}

export function UnifiedEmbed({ type, id, title, compact = false }: UnifiedEmbedProps) {
  switch (type) {
    case 'youtube':
      return <YouTubeEmbed videoId={id} title={title} compact={compact} />;
    case 'spotify':
      // Check if it looks like an album ID (often shorter) or track ID
      return id.length > 22 ? (
        <SpotifyAlbumEmbed albumId={id} title={title} compact={compact} />
      ) : (
        <SpotifyEmbed trackId={id} title={title} compact={compact} />
      );
    case 'twitter':
      // Check if it looks like a username (starts with @) or tweet ID
      return id.startsWith('@') ? (
        <TwitterProfileEmbed username={id.slice(1)} title={title} compact={compact} />
      ) : (
        <TwitterEmbed tweetId={id} title={title} compact={compact} />
      );
    case 'wikipedia':
      return <WikipediaCard articleSlug={id} description={title} />;
    default:
      return null;
  }
}
