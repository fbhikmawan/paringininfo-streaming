'use client';

import { YouTubeEmbed } from '@next/third-parties/google';

interface PlayerYoutubeEmbedProps {
  videoId: string;
  shouldPlay?: boolean;
  params?: string;
  containerStyle?: React.CSSProperties;
}

export default function PlayerYoutubeEmbed({
  videoId,
  shouldPlay = true,
  params = "autoplay=0&controls=1&modestbranding=1&rel=0",
  containerStyle = { width: '100%', height: 'auto' }
}: PlayerYoutubeEmbedProps) {
  if (!shouldPlay) return null;

  return (
    <div style={containerStyle}>
      <YouTubeEmbed
        videoid={videoId}
        params={params}
        style="width: 100%; height: auto; max-width: unset;"
      />
    </div>
  );
}