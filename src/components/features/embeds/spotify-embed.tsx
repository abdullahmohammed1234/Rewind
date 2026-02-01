'use client';

import { EmbedWrapper } from './embed-wrapper';

interface SpotifyEmbedProps {
  trackId: string;
  title?: string;
  compact?: boolean;
}

export function SpotifyEmbed({ trackId, title = 'Listen', compact = false }: SpotifyEmbedProps) {
  const height = compact ? 'h-32' : 'h-80';
  
  return (
    <EmbedWrapper title={title} compact={compact}>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height={compact ? '80' : '352'}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={height}
      />
    </EmbedWrapper>
  );
}

// Helper function to extract Spotify track ID from URL
export function extractSpotifyTrackId(url: string): string | null {
  const patterns = [
    /spotify\.com\/track\/([a-zA-Z0-9]{22})/,
    /^([a-zA-Z0-9]{22})$/ // Direct track ID match
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Album embed variant
interface SpotifyAlbumEmbedProps {
  albumId: string;
  title?: string;
  compact?: boolean;
}

export function SpotifyAlbumEmbed({ albumId, title = 'Album', compact = false }: SpotifyAlbumEmbedProps) {
  const height = compact ? 'h-40' : 'h-80';
  
  return (
    <EmbedWrapper title={title} compact={compact}>
      <iframe
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
        width="100%"
        height={compact ? '80' : '352'}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={height}
      />
    </EmbedWrapper>
  );
}
