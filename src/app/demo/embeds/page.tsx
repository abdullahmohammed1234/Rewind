'use client';

import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  YouTubeEmbed, 
  SpotifyEmbed, 
  TwitterEmbed, 
  WikipediaCard,
  EmbedWrapper 
} from '@/components/features/embeds';

export default function EmbedsDemoPage() {
  return (
    <NostalgiaBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <h1 className="text-4xl font-bold text-retro-dark text-center mb-4">
              Embed Components Demo
            </h1>
            <p className="text-center text-retro-gray mb-8">
              Test all the embed components for YouTube, Spotify, Twitter/X, and Wikipedia
            </p>
          </AnimatedSection>

          {/* YouTube Embeds */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>▶️ YouTube Embeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Full Size</h3>
                    <YouTubeEmbed 
                      videoId="Pzz1TUDxL3I" 
                      title="Panda - Desiigner (Viral Video)"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compact</h3>
                    <YouTubeEmbed 
                      videoId="sCJAX6zvrDk" 
                      title="Damn Daniel Viral Video"
                      compact
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Spotify Embeds */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>🎵 Spotify Embeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Track Embed</h3>
                    <SpotifyEmbed 
                      trackId="2QjOVO8SDrRIIWj4T0K2aE" 
                      title="Closer - The Chainsmokers"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compact Track</h3>
                    <SpotifyEmbed 
                      trackId="1ziAxLzzLrI9L0NMGdLq6D" 
                      title="One Dance - Drake"
                      compact
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Twitter Embeds */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>𝕏 Twitter/X Embeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Tweet Embed</h3>
                    <TwitterEmbed 
                      tweetId="780150968851548160" 
                      title="Cash Me Outside Tweet"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compact Tweet</h3>
                    <TwitterEmbed 
                      tweetId="1234567890123456789" 
                      title="Example Tweet"
                      compact
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Wikipedia Embeds */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>📚 Wikipedia Embeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Wikipedia Card</h3>
                    <WikipediaCard 
                      articleSlug="Harambe"
                      description="Harambe was a western lowland gorilla at the Cincinnati Zoo who was shot and killed by a zoo handler."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WikipediaCard 
                      articleSlug="Kermit_the_Frog"
                      description="Kermit the Frog is a Muppet character created by Jim Henson."
                    />
                    <WikipediaCard 
                      articleSlug="Arthur_(TV_series)"
                      description="Arthur is an American-Canadian children's animated series."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* All Embed Types Side by Side */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle>🎬 Compact Embeds Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <YouTubeEmbed videoId="Pzz1TUDxL3I" title="▶️ YouTube" compact />
                  <SpotifyEmbed trackId="2QjOVO8SDrRIIWj4T0K2aE" title="🎵 Spotify" compact />
                  <TwitterEmbed tweetId="780150968851548160" title="𝕏 Twitter" compact />
                  <WikipediaCard articleSlug="Harambe" />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </NostalgiaBackground>
  );
}
