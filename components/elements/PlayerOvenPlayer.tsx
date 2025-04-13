'use client';

import { useRef, useEffect } from 'react';
import Script from 'next/script';

interface PlayerOvenPlayerProps {
  streamUrl: string;
  shouldPlay?: boolean;
  containerStyle?: React.CSSProperties;
}

export default function PlayerOvenPlayer({
  streamUrl,
  shouldPlay = false,
  containerStyle = { width: '100%', height: 'auto' }
}: PlayerOvenPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerInstanceRef = useRef<any>(null); // To store the OvenPlayer instance

  useEffect(() => {
    if (playerRef.current && window.OvenPlayer && !playerInstanceRef.current) {
      playerInstanceRef.current = window.OvenPlayer.create(playerRef.current, {
        sources: [
          {
            type: 'webrtc',
            file: streamUrl,
            label: 'WebRTC Stream',
          },
        ],
        webrtcConfig: {
          connectionTimeout: 2000,
        }
      });
    }

    if (playerInstanceRef.current) {
      if (shouldPlay) {
        playerInstanceRef.current.play();
      } else {
        playerInstanceRef.current.pause();
      }
    }

    // Cleanup on unmount
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.remove();
        playerInstanceRef.current = null;
      }
    };
  }, [shouldPlay, streamUrl]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/ovenplayer@latest/dist/ovenplayer.js"
        strategy="lazyOnload"
      />
      <div
        ref={playerRef}
        style={containerStyle}
      ></div>
    </>
  );
}