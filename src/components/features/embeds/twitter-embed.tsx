'use client';

import { EmbedWrapper } from './embed-wrapper';

interface TwitterEmbedProps {
  tweetId: string;
  title?: string;
  compact?: boolean;
}

export function TwitterEmbed({ tweetId, title = 'Tweet', compact = false }: TwitterEmbedProps) {
  return (
    <EmbedWrapper title={title} compact={compact}>
      <div className="min-h-[200px] flex items-center justify-center bg-retro-black/20">
        {/* Twitter/X embed placeholder - in production, use Twitter's widget JS */}
        <div className="text-center p-4">
          <div className="text-4xl mb-2">𝕏</div>
          <p className="text-sm text-retro-gray">
            Tweet ID: {tweetId}
          </p>
          <a
            href={`https://twitter.com/user/status/${tweetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-retro-purple hover:underline mt-2 inline-block"
          >
            View on X →
          </a>
        </div>
      </div>
    </EmbedWrapper>
  );
}

// Helper function to extract tweet ID from URL
export function extractTweetId(url: string): string | null {
  const patterns = [
    /twitter\.com\/[^/]+\/status\/(\d+)/,
    /x\.com\/[^/]+\/status\/(\d+)/,
    /^(\d{10,19})$/ // Direct tweet ID match (10-19 digits)
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Profile embed variant
interface TwitterProfileEmbedProps {
  username: string;
  title?: string;
  compact?: boolean;
}

export function TwitterProfileEmbed({ username, title = 'Profile', compact = false }: TwitterProfileEmbedProps) {
  return (
    <EmbedWrapper title={title} compact={compact}>
      <div className="min-h-[150px] flex items-center justify-center bg-retro-black/20">
        <div className="text-center p-4">
          <div className="text-4xl mb-2">𝕏</div>
          <p className="text-sm text-retro-gray">@{username}</p>
          <a
            href={`https://twitter.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-retro-purple hover:underline mt-2 inline-block"
          >
            View Profile →
          </a>
        </div>
      </div>
    </EmbedWrapper>
  );
}
