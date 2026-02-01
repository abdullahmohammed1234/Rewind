'use client';

import { EmbedWrapper } from './embed-wrapper';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  compact?: boolean;
}

export function YouTubeEmbed({ videoId, title = 'Video', compact = false }: YouTubeEmbedProps) {
  const aspectRatio = compact ? 'aspect-video' : 'aspect-video';
  const height = compact ? 'h-32' : 'h-64';
  
  return (
    <EmbedWrapper title={title} compact={compact}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full ${height} ${aspectRatio} border-0`}
      />
    </EmbedWrapper>
  );
}

// Helper function to extract YouTube video ID from URL
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID match
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
