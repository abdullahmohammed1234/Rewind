'use client';

import { EmbedWrapper } from './embed-wrapper';

interface WikipediaEmbedProps {
  articleSlug: string;
  title?: string;
  compact?: boolean;
}

export function WikipediaEmbed({ articleSlug, title = 'Wikipedia', compact = false }: WikipediaEmbedProps) {
  return (
    <EmbedWrapper title={title} compact={compact}>
      <div className="p-4 bg-retro-black/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">📚</div>
          <div>
            <p className="text-sm text-retro-gray mb-2">
              {articleSlug.replace(/_/g, ' ')}
            </p>
            <a
              href={`https://en.wikipedia.org/wiki/${articleSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-retro-purple hover:underline inline-flex items-center gap-1"
            >
              Read on Wikipedia →
            </a>
          </div>
        </div>
      </div>
    </EmbedWrapper>
  );
}

// Helper function to extract Wikipedia article slug from URL
export function extractWikipediaSlug(url: string): string | null {
  const patterns = [
    /wikipedia\.org\/wiki\/([^?&/]+)/,
    /^([^?&/]+)$/ // Direct slug match
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      // Decode URI components and replace spaces with underscores
      return decodeURIComponent(match[1]).replace(/ /g, '_');
    }
  }
  return null;
}

// Card preview variant showing article summary
interface WikipediaCardProps {
  articleSlug: string;
  description?: string;
}

export function WikipediaCard({ articleSlug, description }: WikipediaCardProps) {
  const articleTitle = articleSlug.replace(/_/g, ' ');
  
  return (
    <a
      href={`https://en.wikipedia.org/wiki/${articleSlug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-retro-black/30 rounded-lg border border-retro-purple/20 hover:border-retro-purple/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">📚</div>
        <div>
          <h4 className="font-semibold text-sm text-retro-purple mb-1">
            {articleTitle}
          </h4>
          {description && (
            <p className="text-xs text-retro-gray line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-xs text-retro-teal mt-2">
            From Wikipedia, the free encyclopedia
          </p>
        </div>
      </div>
    </a>
  );
}
